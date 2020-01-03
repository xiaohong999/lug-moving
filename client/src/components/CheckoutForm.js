import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
import api from "../api";

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			selectedCountry: {
				code: "NZ",
				name: "New Zealand"
			},
			payment: {
				currency: "usd",
				clientSecret: null,
				error: null,
				metadata: null,
				disabled: false,
				succeeded: false,
				processing: false
			},
			dialogOpen: false
		};

		this.email = React.createRef();
		this.nameOnCard = React.createRef();
		this.country = React.createRef();
		this.zipcode = React.createRef();

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangeCountry = this.onChangeCountry.bind(this);
		this.onCloseDialog = this.onCloseDialog.bind(this);
	}

	componentDidMount() {
		this.getCountryList();
	}

	getCountryList() {
		let th = this;
		axios.get(process.env.REACT_APP_COUNTRY_LIST_API).then(function(result) {
			th.setState({
				countries: result.data.countries
			});
		});
	}

	onChangeCountry(event) {
		this.setState({
			selectedCountry: {
				code: event.target.value,
				name: event.target[event.target.selectedIndex].text
			}
		});
	}

	sendToServer() {
		const { bookData, price } = this.props;
		let pickupTime = new Date(
			bookData.selectedDate.date.year,
			bookData.selectedDate.date.month,
			bookData.selectedDate.date.day,
			bookData.selectedDate.time.from
		);
		axios
			.post(process.env.REACT_APP_GETSWIFT_API_URL, {
				apiKey: process.env.REACT_APP_GETSWIFT_API_KEY,
				booking: {
					deliveryInstructions: bookData.contactInfo.instructions,
					pickupDetail: {
						name: bookData.contactInfo.pickup.name,
						phone: bookData.contactInfo.pickup.phone,
						email: bookData.contactInfo.pickup.email,
						address: bookData.selectedLocation.pickup.address
					},
					dropoffDetail: {
						name: bookData.contactInfo.destination.name,
						phone: bookData.contactInfo.destination.phone,
						email: bookData.contactInfo.destination.email,
						address: bookData.selectedLocation.destination.address
					},
					pickupTime: pickupTime,
					customerFee: price
				}
			})
			.then(result => {
				console.log(result);
			});
	}

	onCloseDialog() {
		this.setState({
			dialogOpen: false
		});
	}

	async handleSubmit(ev) {
		ev.preventDefault();

		// Step 1: Create PaymentIntent over Stripe API
		let intent = {
			payment_method_types: ["card"],
			// amount:
			// 	this.props.price && this.props.price > 0
			// 		? this.props.price * 100
			// 		: 10000,
			amount: this.props.price * 100,
			currency: "usd"
		};

		if (this.email.current.value.length > 0) {
			intent.receipt_email = this.email.current.value;
		}
		if (this.nameOnCard.current.value.length > 0) {
			intent.shipping = {
				name: this.nameOnCard.current.value,
				address: {
					line1: this.state.selectedCountry.name
				}
			};
			if (this.zipcode.current.value.length > 0) {
				intent.shipping.address = {
					...intent.shipping.address,
					postal_code: this.zipcode.current.value
				};
			}
		}

		api
			.createPaymentIntent(intent)
			.then(clientSecret => {
				console.log("[clientSecret]=", clientSecret);
				this.setState({
					payment: {
						...this.state.payment,
						clientSecret: clientSecret,
						disabled: true,
						processing: true
					}
				});

				// Step 2: Use clientSecret from PaymentIntent to handle payment in stripe.handleCardPayment() call
				this.props.stripe
					.handleCardPayment(this.state.payment.clientSecret)
					.then(payload => {
						if (payload.error) {
							this.setState({
								payment: {
									...this.state.payment,
									error: `Payment failed: ${payload.error.message}`,
									disabled: false,
									processing: false
								}
							});
							// console.log("[error]", payload.error);
						} else {
							this.setState({
								payment: {
									...this.state.payment,
									processing: false,
									succeeded: true,
									error: "",
									metadata: payload.paymentIntent
								},
								dialogOpen: true
							});

							this.sendToServer();
							// console.log("[PaymentIntent]", payload.paymentIntent);
						}
					});
			})
			.catch(err => {
				this.setState({
					payment: {
						...this.state.payment,
						error: err.message
					}
				});
			});
	}

	render() {
		const { price } = this.props;
		const { countries, selectedCountry, payment, dialogOpen } = this.state;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="checkout">
						<div className="price">
							<div className="label">Price:</div>
							<div className="value">${price}</div>
						</div>

						<div className="group">
							<div className="row">
								<input
									type="email"
									placeholder="Email (optional)"
									ref={this.email}
								/>
							</div>
						</div>
						<div className="group">
							<div className="row">
								<input
									placeholder="Name on card (optional)"
									ref={this.nameOnCard}
								/>
							</div>
							<div className="row card">
								<CardElement />
							</div>
						</div>
						<div className="group">
							<div className="row select">
								<select
									value={selectedCountry.code}
									onChange={this.onChangeCountry}
								>
									{countries.map(country => (
										<option key={country.code} value={country.code}>
											{country.name}
										</option>
									))}
								</select>
							</div>
							<div className="row">
								<input placeholder="ZIP (optional)" ref={this.zipcode} />
							</div>
						</div>
						<Button
							type="submit"
							fullWidth
							className="lug-btn"
							style={{
								marginTop: 10
							}}
							disabled={payment.disabled}
						>
							{payment.processing ? "Processing…" : "Pay"}
						</Button>
						{payment.succeeded ? (
							<div className="payment-success">Payment succeeded</div>
						) : (
							<div className="payment-failed">{payment.error}</div>
						)}
					</div>
				</form>

				<Dialog
					open={dialogOpen}
					onClose={this.onCloseDialog}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>{"Booking confirmed"}</DialogTitle>
					<DialogContent>
						{payment.metadata ? (
							<div style={{ marginBottom: 20 }}>
								<div
									style={{
										marginBottom: 10,
										color: "var(--colorMain)",
										fontSize: 22,
										fontWeight: 600
									}}
								>
									Price : ${payment.metadata.amount / 100}
								</div>
								<div>
									Created at:{" "}
									{new Date(payment.metadata.created * 1000).toDateString()}
								</div>
							</div>
						) : (
							<div />
						)}
						<Button onClick={this.onCloseDialog} color="primary">
							OK
						</Button>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);

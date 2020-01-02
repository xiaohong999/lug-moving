import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "@material-ui/core";
import axios from "axios";
import api from "../api";

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			selectedCountry: "NZ"
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangeCountry = this.onChangeCountry.bind(this);
	}

	componentDidMount() {
		let th = this;
		this.serverRequest = axios
			.get(
				"https://raw.githubusercontent.com/zauribrahimkhalilov/json-files/master/countries.json"
			)
			.then(function(result) {
				th.setState({
					countries: result.data.countries
				});
			});
	}

	onChangeCountry(event) {
		this.setState({
			selectedCountry: event.target.value
		});
	}

	async handleSubmit(ev) {
		ev.preventDefault();

		// Step 1: Create PaymentIntent over Stripe API
		api
			.createPaymentIntent({
				payment_method_types: ["card"],
				amount: this.props.price * 100,
				currency: "usd",
				receipt_email: "test@email.com",
				shipping: {
					address: {
						line1: "Aukland, New zealand",
						postal_code: "118000"
					},
					name: "Hong"
				}
			})
			.then(clientSecret => {
				console.log("[clientSecret]=", clientSecret);
				this.setState({
					clientSecret: clientSecret,
					disabled: true,
					processing: true
				});

				// Step 2: Use clientSecret from PaymentIntent to handle payment in stripe.handleCardPayment() call
				this.props.stripe
					.handleCardPayment(this.state.clientSecret)
					.then(payload => {
						if (payload.error) {
							this.setState({
								error: `Payment failed: ${payload.error.message}`,
								disabled: false,
								processing: false
							});
							console.log("[error]", payload.error);
						} else {
							this.setState({
								processing: false,
								succeeded: true,
								error: "",
								metadata: payload.paymentIntent
							});
							console.log("[PaymentIntent]", payload.paymentIntent);
						}
					});
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
	}

	render() {
		const { price } = this.props;
		const { countries, selectedCountry } = this.state;
		return (
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
								// pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
								placeholder="Email"
								// required
							/>
						</div>
					</div>
					<div className="group">
						<div className="row">
							<input placeholder="Name on card" />
						</div>
						<div className="row card">
							<CardElement />
						</div>
					</div>
					<div className="group">
						<div className="row select">
							<select value={selectedCountry} onChange={this.onChangeCountry}>
								{countries.map(country => (
									<option key={country.code} value={country.code}>
										{country.name}
									</option>
								))}
							</select>
						</div>
						<div className="row">
							<input placeholder="ZIP" />
						</div>
					</div>
					<Button
						type="submit"
						fullWidth
						style={{
							padding: 10,
							marginTop: 10,
							background: "var(--colorYellow)"
						}}
					>
						Pay
					</Button>
				</div>
			</form>
		);
	}
}

export default injectStripe(CheckoutForm);

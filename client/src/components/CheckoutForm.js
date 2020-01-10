import React, { Component } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
import { PayPalButton } from "react-paypal-button";

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false,
			payment: null
		};

		this.onCloseDialog = this.onCloseDialog.bind(this);
	}

	componentDidMount() {}

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

	onSuccess = response => {
		console.log("Successful payment!", response);
		this.setState({
			payment: response,
			dialogOpen: true
		});
		this.sendToServer();
	};
	onError = error => {
		console.log("Erroneous payment OR failed to load script!", error);
	};
	onCancel = data => {
		console.log("Cancelled payment!", data);
	};

	render() {
		const { price } = this.props;
		const { dialogOpen, payment } = this.state;
		const paypalOptions = {
			clientId:
				process.env.NODE_ENV === "development"
					? process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX
					: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION
		};

		const buttonStyles = {
			layout: "vertical",
			shape: "rect"
		};

		return (
			<div>
				<div className="checkout">
					<div className="price">
						<div className="label">Price:</div>
						<div className="value">${price}</div>
					</div>

					<div style={{ marginTop: 20 }}>
						<PayPalButton
							paypalOptions={paypalOptions}
							buttonStyles={buttonStyles}
							amount={price}
							onPaymentSuccess={this.onSuccess}
							onPaymentCancel={this.onCancel}
							onPaymentError={this.onError}
						/>
					</div>
				</div>

				<Dialog
					open={dialogOpen}
					onClose={this.onCloseDialog}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>{"Booking confirmed"}</DialogTitle>
					<DialogContent>
						{payment ? (
							<div style={{ marginBottom: 20 }}>
								<div
									style={{
										marginBottom: 10,
										color: "var(--colorMain)",
										fontSize: 22,
										fontWeight: 600
									}}
								>
									Price : ${price}
								</div>
								<div>
									Created at: {new Date(payment.create_time).toDateString()}
								</div>
								<div>
									Name:{" "}
									{`${payment.payer.name.given_name} ${payment.payer.name.surname}`}
								</div>
								<div>Email: {payment.payer.email_address}</div>
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

export default CheckoutForm;

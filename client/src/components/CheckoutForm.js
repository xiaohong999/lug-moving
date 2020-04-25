/*global emailjs*/
import React, { Component } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { getTimeString } from "../utils";
class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false,
			payment: null,
			failedCount: 0,
		};

		this.onCloseDialog = this.onCloseDialog.bind(this);
	}

	componentDidMount() {}

	sendDataToServer = async () => {
		const { bookData } = this.props;

		let timeFrom = new Date(
			bookData.selectedDate.date.year,
			bookData.selectedDate.date.month,
			bookData.selectedDate.date.day,
			bookData.selectedDate.time.from
		).getTime();

		let timeTo = new Date(bookData.selectedDate.date.year, bookData.selectedDate.date.month, bookData.selectedDate.date.day, bookData.selectedDate.time.to).getTime();

		let notes = "";
		bookData.items.forEach((item) => {
			notes += `${item.quantity} x ${item.name}, `;
		});
		if (notes.length > 0) {
			notes = notes.substr(0, notes.length - 2);
		}

		let pickupData = {
			pickupTask: true,
			destination: {
				address: { unparsed: bookData.selectedLocation.pickup.address },
			},
			recipients: [
				{
					name: bookData.contactInfo.pickup.name,
					phone: bookData.contactInfo.pickup.phone,
					notes: `- ${bookData.contactInfo.pickup.email}\n- ${bookData.contactInfo.instructions}`,
					skipPhoneNumberValidation: true,
				},
			],
			// completeAfter: completeAfter,
			completeBefore: timeFrom,
			notes: `- ${bookData.selectedVehicle.title}\n- ${notes}`,
			// autoAssign: { mode: "distance" },
		};

		let response = await axios.post("/.netlify/functions/server/api/create-task", pickupData);
		// console.log(response.data);
		if (response.data.status !== 200) {
			this.sendEmail(response.data.data);
			return;
		}

		let dropOffData = {
			pickupTask: false,
			destination: {
				address: { unparsed: bookData.selectedLocation.destination.address },
			},
			recipients: [
				{
					name: bookData.contactInfo.destination.name,
					phone: bookData.contactInfo.destination.phone,
					// phone: "0211234566",
					notes: `- ${bookData.contactInfo.destination.email}\n- ${bookData.contactInfo.instructions}`,
					skipPhoneNumberValidation: true,
				},
			],
			dependencies: [response.data.data.id],
			completeBefore: timeTo,
			notes: `- ${bookData.selectedVehicle.title}\n- ${notes}`,
			// autoAssign: { mode: "distance" },
		};

		response = await axios.post("/.netlify/functions/server/api/create-task", dropOffData);
		// console.log(response.data);
		if (response.data.status !== 200) {
			this.sendEmail(response.data);
			return;
		}
		this.sendEmail();
	};

	sendEmail = (err) => {
		const { bookData, price } = this.props;

		let timeFrom = new Date(bookData.selectedDate.date.year, bookData.selectedDate.date.month, bookData.selectedDate.date.day, bookData.selectedDate.time.from);
		let timeTo = new Date(bookData.selectedDate.date.year, bookData.selectedDate.date.month, bookData.selectedDate.date.day, bookData.selectedDate.time.to);

		let service_id = "default_service";
		let template_id = process.env.REACT_APP_EMAILJS_TEMPLATE_SUCCESS_ID;
		let itemString = "";
		for (let i in bookData.items) {
			itemString += `- <b>Description</b> : ${bookData.items[i].name} , <b>Quantity</b> : ${bookData.items[i].quantity}<br/>`;
		}
		let errField = "";
		if (err) {
			errField = `<p><b>Error</b> : {<b>code</b> : ${err.code}, <b>message</b> : ${err.message.message}}</p>`;
			template_id = process.env.REACT_APP_EMAILJS_TEMPLATE_FAIL_ID;
		}

		let html = `${errField}
				<p><b>Items</b></p>
				${itemString}
				<p><b>Instruction</b> : ${bookData.contactInfo.instructions}</p>
				<p><b>Pickup Information</b></p>
					- <b>Name</b> : ${bookData.contactInfo.pickup.name}<br/>
					- <b>Phone</b> : ${bookData.contactInfo.pickup.phone}<br/>
					- <b>Email</b> : ${bookData.contactInfo.pickup.email}<br/>
					- <b>Address</b> : ${bookData.selectedLocation.pickup.address}<br/>
				<p><b>Destination Information</b></p>
					- <b>Name</b> : ${bookData.contactInfo.destination.name}<br/>
					- <b>Phone</b> : ${bookData.contactInfo.destination.phone}<br/>
					- <b>Email</b> : ${bookData.contactInfo.destination.email}<br/>
					- <b>Address</b> : ${bookData.selectedLocation.destination.address}<br/>
				<p><b>Pickup time</b> : ${timeFrom} ~ ${timeTo}</p>
				<p><b>Price</b> : ${price}</p>
				`;
		let params = {
			reply_to: "",
			from_name: "",
			to_name: "",
			message_html: html,
		};
		// console.log(params);
		emailjs.send(service_id, template_id, params).then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	sendToServer() {
		/* Test Data*/
		// let sendData = {
		// 	apiKey: process.env.REACT_APP_GETSWIFT_API_KEY,
		// 	booking: {
		// 		deliveryInstructions: "Test/1-&",
		// 		reference: "9am - 10am",
		// 		items: [{ quantity: 2, description: "TV/1, Table(V3) & Chair" }],
		// 		pickupDetail: {
		// 			name: "Hong.Yang",
		// 			phone: "(+86)13312341234",
		// 			email: "hong@mail.com",
		// 			address: "Dandong, Liaoning, China"
		// 		},
		// 		dropoffDetail: {
		// 			name: "Mei,Yang",
		// 			phone: "(+86)13312341234",
		// 			email: "mei@mail.com",
		// 			address: "Dandong, Liaoning, China"
		// 		},
		// 		pickupTime: new Date(2020, 2, 20),
		// 		customerFee: 5
		// 	}
		// };

		const { bookData, price } = this.props;
		let pickupTime = new Date(bookData.selectedDate.date.year, bookData.selectedDate.date.month, bookData.selectedDate.date.day, bookData.selectedDate.time.from);
		let reference = bookData ? `${getTimeString(bookData.selectedDate.time.from)} - ${getTimeString(bookData.selectedDate.time.to)}` : "";
		let items = [];
		for (let i in bookData.items) {
			let item = bookData.items[i];
			items.push({
				quantity: item.quantity,
				description: item.name,
			});
		}
		let sendData = {
			apiKey: process.env.REACT_APP_GETSWIFT_API_KEY,
			booking: {
				deliveryInstructions: bookData.contactInfo.instructions,
				items: items,
				reference: reference,
				pickupDetail: {
					name: bookData.contactInfo.pickup.name,
					phone: bookData.contactInfo.pickup.phone,
					email: bookData.contactInfo.pickup.email,
					address: bookData.selectedLocation.pickup.address,
				},
				dropoffDetail: {
					name: bookData.contactInfo.destination.name,
					phone: bookData.contactInfo.destination.phone,
					email: bookData.contactInfo.destination.email,
					address: bookData.selectedLocation.destination.address,
				},
				pickupTime: pickupTime,
				customerFee: price,
			},
		};

		this.retryToServer(sendData);
	}

	trackOrder(sendData, err) {
		let service_id = "default_service";
		let template_id = process.env.REACT_APP_EMAILJS_TEMPLATE_SUCCESS_ID;
		let itemString = "";
		for (let i in sendData.booking.items) {
			itemString += `- <b>Description</b> : ${sendData.booking.items[i].description} , <b>Quantity</b> : ${sendData.booking.items[i].quantity}<br/>`;
		}
		let errField = "";
		if (err) {
			errField = `<p><b>Error</b> : {<b>code</b> : ${err.status}, <b>message</b> : ${err.data.message}}</p>`;
			template_id = process.env.REACT_APP_EMAILJS_TEMPLATE_FAIL_ID;
		}
		let html = `${errField}
				<p><b>Items</b></p>
				${itemString}
				<p><b>Instruction</b> : ${sendData.booking.deliveryInstructions}</p>
				<p><b>Pickup Information</b></p>
					- <b>Name</b> : ${sendData.booking.pickupDetail.name}<br/>
					- <b>Phone</b> : ${sendData.booking.pickupDetail.phone}<br/>
					- <b>Email</b> : ${sendData.booking.pickupDetail.email}<br/>
					- <b>Address</b> : ${sendData.booking.pickupDetail.address}<br/>
				<p><b>Destination Information</b></p>
					- <b>Name</b> : ${sendData.booking.dropoffDetail.name}<br/>
					- <b>Phone</b> : ${sendData.booking.dropoffDetail.phone}<br/>
					- <b>Email</b> : ${sendData.booking.dropoffDetail.email}<br/>
					- <b>Address</b> : ${sendData.booking.dropoffDetail.address}<br/>
				<p><b>Pickup time</b> : ${sendData.booking.pickupTime}</p>
				<p><b>Price</b> : ${sendData.booking.customerFee}</p>
				`;
		let params = {
			reply_to: "",
			from_name: "",
			to_name: "",
			message_html: html,
		};
		// console.log(params);
		emailjs.send(service_id, template_id, params).then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	}

	retryToServer(sendData) {
		axios
			.post(process.env.REACT_APP_GETSWIFT_API_URL, sendData)
			.then((result) => {
				this.trackOrder(sendData, null);
			})
			.catch((err) => {
				console.log(err.response);
				this.trackOrder(sendData, err.response);
			});
	}
	// retryToServer(sendData) {
	// 	this.setState({
	// 		failedCount: this.state.failedCount + 1
	// 	});
	// 	axios
	// 		.post(process.env.REACT_APP_GETSWIFT_API_URL, sendData)
	// 		.then(result => {
	// 			console.log(result);
	// 		})
	// 		.catch(err => {
	// 			console.log(err.response);

	// 			if (this.state.failedCount > 4) {
	// 				this.trackOrder(sendData, err.response);
	// 				return;
	// 			}
	// 			this.retryToServer(sendData);
	// 		});
	// }

	onCloseDialog() {
		this.setState({
			dialogOpen: false,
		});
	}

	test = (e) => {
		this.sendDataToServer();
	};

	onSuccess = (response) => {
		// console.log("Successful payment!", response);
		this.setState({
			payment: response,
			dialogOpen: true,
		});
		// this.sendToServer();
		this.sendDataToServer();
	};

	onError = (error) => {
		// console.log("Erroneous payment OR failed to load script!", error);
		alert("Erroneous payment OR failed to load script!");
	};

	onCancel = (data) => {
		// console.log("Cancelled payment!", data);
		alert("Cancelled payment!");
	};

	render() {
		const { price } = this.props;
		const { dialogOpen, payment } = this.state;
		const paypalOptions = {
			clientId: process.env.NODE_ENV === "development" ? process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX : process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
			currency: "NZD",
			locale: "en_NZ",
		};

		return (
			<div>
				<div className="checkout">
					<div className="price">
						<div className="label">Price:</div>
						<div className="value">${price}</div>
					</div>
					{/* <button onClick={this.test}>Ok</button> */}
					<div style={{ marginTop: 20 }}>
						<PayPalButton options={paypalOptions} amount={price} onSuccess={this.onSuccess} onCancel={this.onCancel} onError={this.onError} />
					</div>
				</div>

				<Dialog open={dialogOpen} onClose={this.onCloseDialog} fullWidth maxWidth="sm">
					<DialogTitle>{"Booking confirmed"}</DialogTitle>
					<DialogContent>
						{payment ? (
							<div style={{ marginBottom: 20 }}>
								<div
									style={{
										marginBottom: 10,
										color: "var(--colorMain)",
										fontSize: 22,
										fontWeight: 600,
									}}
								>
									Price : ${price}
								</div>
								<div>Created at: {new Date(payment.create_time).toDateString()}</div>
								<div>Name: {`${payment.payer.name.given_name} ${payment.payer.name.surname}`}</div>
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

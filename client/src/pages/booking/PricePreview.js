/*global google*/
/*global gtag*/
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Elements, StripeProvider } from "react-stripe-elements";

import { setStep } from "../../redux/actions";
import { Container, Grid } from "@material-ui/core";
import Map from "../../components/Map";
import { FiCalendar } from "react-icons/fi";
import { getDateString, getTimeString, calcPrice } from "../../utils";
import CheckoutForm from "../../components/CheckoutForm";

const style = {
	container: {
		paddingBottom: 10,
		marginTop: -30,
		padding: 0,
	},
};

class PricePreview extends Component {
	constructor(props) {
		super(props);

		let price =
			props.bookData.selectedVehicle && props.bookData.selectedLocation
				? calcPrice(
						props.bookData.selectedVehicle.pricePerKm,
						props.bookData.selectedLocation.distance,
						props.bookData.selectedVehicle.fee,
						props.bookData.discount
				  )
				: 0;

		this.state = {
			pickup: props.bookData.selectedLocation ? props.bookData.selectedLocation.pickup : null,
			destination: props.bookData.selectedLocation ? props.bookData.selectedLocation.destination : null,
			directions: null,
			distance: 0,
			price: price,
		};

		props.setStep(6);

		if (props.bookData.selectedLocation) {
			this.showDirection(props.bookData.selectedLocation.pickup.coordinate, props.bookData.selectedLocation.destination.coordinate);
		}
	}

	componentDidMount = () => {
		gtag("js", new Date());
		gtag("config", "UA-156726482-1");
		if (window.fbq != null) {
			window.fbq("track", "PageView");
		}
	};

	showDirection = (pickup, destination) => {
		if (pickup && destination) {
			// this.getDistance(pickup, destination);
			const directionsService = new google.maps.DirectionsService();
			directionsService.route(
				{
					origin: pickup,
					destination: destination,
					travelMode: google.maps.TravelMode.DRIVING,
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						this.setState({
							directions: result,
						});
						let distance =
							result && result.routes && result.routes.length && result.routes[0].legs && result.routes[0].legs.length && result.routes[0].legs[0].distance
								? result.routes[0].legs[0].distance.value
								: 0;
						this.setState({ distance: distance });
					} else {
						console.error(`error fetching directions ${result}`);
					}
				}
			);
		}
	};

	getDistance = (pickup, destination) => {
		// const latLong1 = new google.maps.LatLng(pickup.lat, pickup.lng);
		// const latLong2 = new google.maps.LatLng(destination.lat, destination.lng);
		// const distance = google.maps.geometry.spherical.computeDistanceBetween(latLong1, latLong2);
		// this.setState({
		// 	distance: distance,
		// });
	};

	render() {
		const { bookData } = this.props;
		const { pickup, destination, directions, price } = this.state;
		return (
			<Container maxWidth="md" style={style.container}>
				<Grid container justify="center">
					<Grid item sm={6} xs={12} className="preview-left-panel">
						<Map
							pickup={pickup ? pickup.coordinate : null}
							destination={destination ? destination.coordinate : null}
							directions={directions}
							width="100%"
							height="300px"
						/>
						<div className="preview">
							<div className="preview-location">
								<img className="icon" src="../images/pin-up.png" alt="icon" />
								<div className="info">
									<div className="label">Pickup address:</div>
									<div className="address">{pickup ? pickup.address : "Not selected"}</div>
								</div>
							</div>
							<div className="preview-location">
								<img className="icon" src="../images/pin-down.png" alt="icon" />
								<div className="info">
									<div className="label">Destination:</div>
									<div className="address">{destination ? destination.address : "Not selected"}</div>
								</div>
							</div>
							<div className="preview-time-price">
								<div className="label">
									<FiCalendar className="icon" />
									<div className="text">Start time:</div>
								</div>
								<div className="info">
									<div className="date">{bookData.selectedDate ? getDateString(bookData.selectedDate.date) : "Not selected"}</div>
									<div className="time">
										{bookData.selectedDate
											? `Arrive between ${getTimeString(bookData.selectedDate.time.from)} - ${getTimeString(bookData.selectedDate.time.to)}`
											: "Not selected"}
									</div>
								</div>
							</div>
						</div>
					</Grid>
					<Grid item sm={6} xs={12}>
						{/* <StripeProvider
							apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
						>
							<Elements>
								<CheckoutForm bookData={bookData} price={price} />
							</Elements>
						</StripeProvider> */}
						<CheckoutForm bookData={bookData} price={price} />
					</Grid>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	bookData: state,
});

const mapDispatchToProps = (dispatch) => ({
	setStep: (value) => dispatch(setStep(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PricePreview);

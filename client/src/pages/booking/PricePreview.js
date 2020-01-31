/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Elements, StripeProvider } from "react-stripe-elements";

import { setStep } from "../../redux/actions";
import { Container, Grid } from "@material-ui/core";
import Map from "../../components/Map";
import { FiCalendar } from "react-icons/fi";
import { getDateString, getTimeString, calcPrice } from "../../utils/Utils";
import CheckoutForm from "../../components/CheckoutForm";

class PricePreview extends Component {
	state = {
		pickup: null,
		destination: null,
		directions: null,
		distance: 0,
		price: 0
	};

	componentWillMount() {
		this.props.setStep(6);
	}

	componentDidMount() {
		const { bookData } = this.props;

		if (bookData.selectedLocation) {
			this.setState({
				pickup: bookData.selectedLocation.pickup,
				destination: bookData.selectedLocation.destination
			});
			this.showDirection(
				bookData.selectedLocation.pickup.coordinate,
				bookData.selectedLocation.destination.coordinate
			);
		}

		let price =
			bookData.selectedVehicle && bookData.selectedLocation
				? calcPrice(
						bookData.selectedVehicle.pricePerKm,
						bookData.selectedLocation.distance,
						bookData.selectedVehicle.fee
				  )
				: 0;
		this.setState({
			price: price
		});
	}

	showDirection = (pickup, destination) => {
		if (pickup && destination) {
			this.getDistance(pickup, destination);
			const directionsService = new google.maps.DirectionsService();
			directionsService.route(
				{
					origin: pickup,
					destination: destination,
					travelMode: google.maps.TravelMode.DRIVING
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						this.setState({
							directions: result
						});
					} else {
						console.error(`error fetching directions ${result}`);
					}
				}
			);
		}
	};

	getDistance = (pickup, destination) => {
		const latLong1 = new google.maps.LatLng(pickup.lat, pickup.lng);
		const latLong2 = new google.maps.LatLng(destination.lat, destination.lng);
		const distance = google.maps.geometry.spherical.computeDistanceBetween(
			latLong1,
			latLong2
		);
		this.setState({
			distance: distance
		});
	};

	render() {
		const { bookData } = this.props;
		const { pickup, destination, directions, price } = this.state;
		return (
			<Container maxWidth="md" style={{ marginBottom: 10 }}>
				<Grid
					container
					justify="center"
					spacing={4}
					style={{ background: "var(--colorWhite)" }}
				>
					<Grid
						item
						sm={6}
						xs={12}
						style={{ boxShadow: "5px 0 5px -5px gray" }}
					>
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
									<div className="address">
										{pickup ? pickup.address : "Not selected"}
									</div>
								</div>
							</div>
							<div className="preview-location">
								<img className="icon" src="../images/pin-down.png" alt="icon" />
								<div className="info">
									<div className="label">Destination:</div>
									<div className="address">
										{destination ? destination.address : "Not selected"}
									</div>
								</div>
							</div>
							<div className="preview-time-price">
								<div className="label">
									<FiCalendar className="icon" />
									<div className="text">Start time:</div>
								</div>
								<div className="info">
									<div className="date">
										{bookData.selectedDate
											? getDateString(bookData.selectedDate.date)
											: "Not selected"}
									</div>
									<div className="time">
										{bookData.selectedDate
											? `Arrive between ${getTimeString(
													bookData.selectedDate.time.from
											  )} - ${getTimeString(bookData.selectedDate.time.to)}`
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

const mapStateToProps = state => ({
	bookData: state
});

const mapDispatchToProps = dispatch => ({
	setStep: value => dispatch(setStep(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(PricePreview);

/*global gtag*/
import React, { Component } from "react";
import { Grid, Button, Container, TextField, Box } from "@material-ui/core";
import Vehicle from "../../components/Vehicle";
import { connect } from "react-redux";
import { vehicleSelected, setStep } from "../../redux/actions";
import { PROMO_CODES, VEHICLES } from "../../utils";

class VehicleSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedVehicle: props.selectedVehicle,
			discount: 0,
			promoCode: null,
		};

		this.refPromoCode = React.createRef();
		props.setStep(3);
	}

	componentDidMount = () => {
		gtag("js", new Date());
		gtag("config", "UA-156726482-1");
		if (window.fbq != null) {
			window.fbq("track", "PageView");
		}
	};

	onClickContinue = () => {
		this.props.history.push("/book/time");
		if (!this.state.selectedVehicle) {
			alert("Please select a vehicle");
			return;
		}

		this.props.vehicleSelected(this.state.selectedVehicle, this.state.discount);
	};

	applyPromoCode = () => {
		let promoCode = this.refPromoCode.value.toLowerCase();
		let found = false;
		PROMO_CODES.forEach((code) => {
			if (code.key === promoCode) {
				found = true;
				this.setState({ discount: code.value, promoCode: { valid: 1, message: `The code is valid. It will be discounted as ${code.value}%.` } });
			}
		});
		if (!found) {
			this.setState({ discount: 0, promoCode: { valid: 0, message: "Invalid code!" } });
		}
	};

	render() {
		const { location } = this.props;
		const { selectedVehicle, discount, promoCode } = this.state;

		return (
			<div className="container">
				<Container style={{ marginBottom: 10 }}>
					<Grid container justify="center" spacing={2}>
						{VEHICLES.map((vehicle) => (
							<Grid key={vehicle.id} sm={3} xs={12} item>
								<div onClick={() => this.setState({ selectedVehicle: vehicle })}>
									{selectedVehicle && selectedVehicle.id === vehicle.id ? (
										<Vehicle vehicle={vehicle} distance={location ? location.distance : null} discount={discount} selected />
									) : (
										<Vehicle vehicle={vehicle} distance={location ? location.distance : null} discount={discount} />
									)}
								</div>
							</Grid>
						))}
					</Grid>
					<div className="discount-panel">
						{promoCode && (
							<Box paddingY={1} color={promoCode.valid ? "green" : "red"}>
								{promoCode.message}
							</Box>
						)}
					</div>
					<Box justifyContent="space-between" display="flex">
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Promo code"
							onChange={this.onChangePickupName}
							inputRef={(ref) => {
								this.refPromoCode = ref;
							}}
							style={{ marginRight: 10 }}
						/>
						<Button className="lug-btn" style={{ minWidth: 90 }} onClick={this.applyPromoCode}>
							Apply
						</Button>
					</Box>
					<Button fullWidth className="lug-btn" style={{ marginTop: 20 }} onClick={this.onClickContinue}>
						Continue
					</Button>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	location: state.selectedLocation,
	selectedVehicle: state.selectedVehicle,
});

const mapDispatchToProps = (dispatch) => ({
	vehicleSelected: (vehicle, discount) => dispatch(vehicleSelected(vehicle, discount)),
	setStep: (value) => dispatch(setStep(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleSelect);

import React, { Component } from "react";
import { Grid, withStyles, Button, Container } from "@material-ui/core";
import Vehicle from "../../components/Vehicle";
import { connect } from "react-redux";
import { vehicleSelected, setStep } from "../../redux/actions";

const styles = {
	button: {
		background: "var(--colorYellow)",
		marginTop: 20,
		padding: 14
	}
};

class VehicleSelect extends Component {
	onClickVehicle = vehicle => {
		this.props.history.push("/book/time");
		this.props.vehicleSelected(vehicle);
	};

	componentWillMount() {
		this.props.setStep(3);
	}

	render() {
		const { classes, vehicles, location } = this.props;
		return (
			<Container maxWidth="md" style={{ marginBottom: 10 }}>
				<Grid container justify="center" spacing={2}>
					{vehicles.map(vehicle => (
						<Grid key={vehicle.id} sm={4} xs={12} item>
							<div onClick={this.onClickVehicle.bind(this, vehicle)}>
								<Vehicle
									vehicle={vehicle}
									distance={location ? location.distance : null}
								/>
							</div>
						</Grid>
					))}
				</Grid>
				<Button fullWidth className={classes.button}>
					Continue
				</Button>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	vehicles: state.vehicles,
	location: state.selectedLocation,
	selectedVehicle: state.selectedVehicle
});

const mapDispatchToProps = dispatch => ({
	vehicleSelected: vehicle => dispatch(vehicleSelected(vehicle)),
	setStep: value => dispatch(setStep(value))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(VehicleSelect));

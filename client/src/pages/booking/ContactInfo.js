/*global gtag*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid, Button, TextField } from "@material-ui/core";
import { contactInfoSaved, setStep } from "../../redux/actions";
import { validEmail, validPhone, validName, validDescription } from "../../utils";

const styles = {
	input: {
		margin: "7px 0",
	},
	label: {
		margin: "10px 0",
		fontSize: 24,
		color: "var(--colorMain)",
	},
};

class ContactInfo extends Component {
	constructor(props) {
		super(props);

		this.pickupName = React.createRef();
		this.pickupPhone = React.createRef();
		this.pickupEmail = React.createRef();
		this.destinationName = React.createRef();
		this.destinationPhone = React.createRef();
		this.destinationEmail = React.createRef();
		this.instructions = React.createRef();

		this.state = {
			validPickupName: true,
			validPickupPhone: true,
			validPickupEmail: true,
			validDestinationName: true,
			validDestinationPhone: true,
			validDestinationEmail: true,
			validInstructions: true,
		};

		this.onClickContinue = this.onClickContinue.bind(this);
		this.onChangePickupName = this.onChangePickupName.bind(this);
		this.onChangePickupPhone = this.onChangePickupPhone.bind(this);
		this.onChangePickupEmail = this.onChangePickupEmail.bind(this);
		this.onChangeDestinationName = this.onChangeDestinationName.bind(this);
		this.onChangeDestinationPhone = this.onChangeDestinationPhone.bind(this);
		this.onChangeDestinationEmail = this.onChangeDestinationEmail.bind(this);
		this.onChangeInstructions = this.onChangeInstructions.bind(this);

		props.setStep(5);
	}

	componentDidMount() {
		const { contactInfo } = this.props;
		if (contactInfo) {
			this.pickupName.value = contactInfo.pickup.name;
			this.pickupPhone.value = contactInfo.pickup.phone;
			this.pickupEmail.value = contactInfo.pickup.email;
			this.destinationName.value = contactInfo.destination.name;
			this.destinationPhone.value = contactInfo.destination.phone;
			this.destinationEmail.value = contactInfo.destination.email;
			this.instructions.value = contactInfo.instructions;
		}

		gtag("js", new Date());
		gtag("config", "UA-156726482-1");
		if (window.fbq != null) {
			window.fbq("track", "PageView");
		}
	}

	onChangePickupName = (event) => {
		this.setState({
			validPickupName: validName(event.target.value),
		});
	};

	onChangePickupPhone = (event) => {
		this.setState({
			validPickupPhone: validPhone(event.target.value),
		});
	};

	onChangePickupEmail = (event) => {
		this.setState({
			validPickupEmail: validEmail(event.target.value),
		});
	};

	onChangeDestinationName = (event) => {
		this.setState({
			validDestinationName: validName(event.target.value),
		});
	};

	onChangeDestinationPhone = (event) => {
		this.setState({
			validDestinationPhone: validPhone(event.target.value),
		});
	};

	onChangeDestinationEmail = (event) => {
		this.setState({
			validDestinationEmail: validEmail(event.target.value),
		});
	};

	onChangeInstructions = (event) => {
		this.setState({
			validInstructions: validDescription(event.target.value),
		});
	};

	validInputs() {
		let validPickupName = validName(this.pickupName.value);
		let validPickupPhone = validPhone(this.pickupPhone.value);
		let validPickupEmail = validEmail(this.pickupEmail.value);
		let validDestinationName = validName(this.destinationName.value);
		let validDestinationPhone = validPhone(this.destinationPhone.value);
		let validDestinationEmail = validEmail(this.destinationEmail.value);
		let validInstructions = validDescription(this.instructions.value);
		this.setState({
			validPickupName: validPickupName,
			validPickupPhone: validPickupPhone,
			validPickupEmail: validPickupEmail,
			validDestinationName: validDestinationName,
			validDestinationPhone: validDestinationPhone,
			validDestinationEmail: validDestinationEmail,
			validInstructions: validInstructions,
		});

		if (
			!validPickupName ||
			!validPickupPhone ||
			!validPickupEmail ||
			!validDestinationName ||
			!validDestinationPhone ||
			!validDestinationEmail ||
			!validInstructions
		) {
			return false;
		}
		return true;
	}

	onClickContinue() {
		if (!this.validInputs()) {
			return;
		}
		this.props.history.push("/book/preview");
		this.props.contactInfoSaved({
			pickup: {
				name: this.pickupName.value,
				phone: this.pickupPhone.value,
				email: this.pickupEmail.value,
			},
			destination: {
				name: this.destinationName.value,
				phone: this.destinationPhone.value,
				email: this.destinationEmail.value,
			},
			instructions: this.instructions.value,
		});
	}

	render() {
		return (
			<Container maxWidth="md" style={{ marginBottom: 10 }}>
				<Grid container justify="center" spacing={3}>
					<Grid sm={6} xs={12} item>
						<div style={styles.label}>Pickup Info</div>
						<TextField
							error={!this.state.validPickupName}
							fullWidth
							label="Name"
							variant="outlined"
							onChange={this.onChangePickupName}
							style={styles.input}
							inputRef={(ref) => {
								this.pickupName = ref;
							}}
							required
						/>
						<TextField
							error={!this.state.validPickupPhone}
							fullWidth
							label="Phone"
							variant="outlined"
							onChange={this.onChangePickupPhone}
							style={styles.input}
							inputRef={(ref) => {
								this.pickupPhone = ref;
							}}
							required
						/>
						<TextField
							error={!this.state.validPickupEmail}
							fullWidth
							label="Email"
							variant="outlined"
							onChange={this.onChangePickupEmail}
							style={styles.input}
							inputRef={(ref) => {
								this.pickupEmail = ref;
							}}
							required
						/>
					</Grid>
					<Grid sm={6} xs={12} item>
						<div style={styles.label}>Destination Info</div>
						<TextField
							error={!this.state.validDestinationName}
							fullWidth
							label="Name"
							variant="outlined"
							onChange={this.onChangeDestinationName}
							style={styles.input}
							inputRef={(ref) => {
								this.destinationName = ref;
							}}
							required
						/>
						<TextField
							error={!this.state.validDestinationPhone}
							fullWidth
							label="Phone"
							variant="outlined"
							onChange={this.onChangeDestinationPhone}
							style={styles.input}
							inputRef={(ref) => {
								this.destinationPhone = ref;
							}}
							required
						/>
						<TextField
							error={!this.state.validDestinationEmail}
							fullWidth
							label="Email"
							variant="outlined"
							onChange={this.onChangeDestinationEmail}
							style={styles.input}
							inputRef={(ref) => {
								this.destinationEmail = ref;
							}}
							required
						/>
					</Grid>
					<div style={styles.label}>Instructions</div>
					<TextField
						error={!this.state.validInstructions}
						fullWidth
						placeholder="Instructions here..."
						multiline
						variant="outlined"
						onChange={this.onChangeInstructions}
						style={{ margin: "0 12px 20px 12px" }}
						inputRef={(ref) => {
							this.instructions = ref;
						}}
					/>
				</Grid>
				<Button fullWidth className="lug-btn" style={{ margin: "10px 0" }} onClick={this.onClickContinue}>
					Continue
				</Button>
			</Container>
		);
	}
}
const mapStateToProps = (state) => ({
	contactInfo: state.contactInfo,
});

const mapDispatchToProps = (dispatch) => ({
	contactInfoSaved: (info) => dispatch(contactInfoSaved(info)),
	setStep: (value) => dispatch(setStep(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid, Button, TextField } from "@material-ui/core";
import { contactInfoSaved, setStep } from "../../redux/actions";
import { validEmail } from "../../utils/Utils";

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
			validDestinationEmail: true
		};

		this.onClickContinue = this.onClickContinue.bind(this);
		this.onChangePickupName = this.onChangePickupName.bind(this);
		this.onChangePickupPhone = this.onChangePickupPhone.bind(this);
		this.onChangePickupEmail = this.onChangePickupEmail.bind(this);
		this.onChangeDestinationName = this.onChangeDestinationName.bind(this);
		this.onChangeDestinationPhone = this.onChangeDestinationPhone.bind(this);
		this.onChangeDestinationEmail = this.onChangeDestinationEmail.bind(this);
	}

	componentWillMount() {
		this.props.setStep(5);
	}

	onChangePickupName = event => {
		this.setState({
			validPickupName: event.target.value.trim().length > 0
		});
	};

	onChangePickupPhone = event => {
		this.setState({
			validPickupPhone: event.target.value.trim().length > 0
		});
	};

	onChangePickupEmail = event => {
		this.setState({
			validPickupEmail: validEmail(event.target.value)
		});
	};

	onChangeDestinationName = event => {
		this.setState({
			validDestinationName: event.target.value.trim().length > 0
		});
	};

	onChangeDestinationPhone = event => {
		this.setState({
			validDestinationPhone: event.target.value.trim().length > 0
		});
	};

	onChangeDestinationEmail = event => {
		this.setState({
			validDestinationEmail: validEmail(event.target.value)
		});
	};

	validInputs() {
		let validPickupName = this.pickupName.value.trim().length > 0;
		let validPickupPhone = this.pickupPhone.value.trim().length > 0;
		let validPickupEmail = validEmail(this.pickupEmail.value);
		let validDestinationName = this.destinationName.value.trim().length > 0;
		let validDestinationPhone = this.destinationPhone.value.trim().length > 0;
		let validDestinationEmail = validEmail(this.destinationEmail.value);

		this.setState({
			validPickupName: validPickupName,
			validPickupPhone: validPickupPhone,
			validPickupEmail: validPickupEmail,
			validDestinationName: validDestinationName,
			validDestinationPhone: validDestinationPhone,
			validDestinationEmail: validDestinationEmail
		});

		if (
			!validPickupName ||
			!validPickupPhone ||
			!validPickupEmail ||
			!validDestinationName ||
			!validDestinationPhone ||
			!validDestinationEmail
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
				email: this.pickupEmail.value
			},
			destination: {
				name: this.destinationName.value,
				phone: this.destinationPhone.value,
				email: this.destinationEmail.value
			},
			instructions: this.instructions.value
		});
	}

	render() {
		const styles = {
			input: {
				margin: "7px 0"
			},
			label: {
				margin: "10px 0",
				fontSize: 24,
				color: "var(--colorMain)"
			}
		};
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
							inputRef={ref => {
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
							inputRef={ref => {
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
							inputRef={ref => {
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
							inputRef={ref => {
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
							inputRef={ref => {
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
							inputRef={ref => {
								this.destinationEmail = ref;
							}}
							required
						/>
					</Grid>
					<div style={styles.label}>Instructions</div>
					<TextField
						fullWidth
						placeholder="Instruction here ..."
						multiline
						variant="outlined"
						style={{ margin: "0 12px 20px 12px" }}
						inputRef={ref => {
							this.instructions = ref;
						}}
					/>
				</Grid>
				<Button
					fullWidth
					className="lug-btn"
					style={{ margin: "10px 0" }}
					onClick={this.onClickContinue}
				>
					Continue
				</Button>
			</Container>
		);
	}
}
const mapStateToProps = state => ({
	contactInfo: state.contactInfo
});

const mapDispatchToProps = dispatch => ({
	contactInfoSaved: info => dispatch(contactInfoSaved(info)),
	setStep: value => dispatch(setStep(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);

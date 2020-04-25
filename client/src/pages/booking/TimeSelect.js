/*global gtag*/
import React, { Component } from "react";
import { Grid, Box, Container, Button } from "@material-ui/core";
import { get30DaysFromNow, TIMES, VEHICLES } from "../../utils";
import { connect } from "react-redux";
import { dateSelected, setStep } from "../../redux/actions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getTimeString } from "../../utils";

class TimeSelect extends Component {
	constructor(props) {
		super(props);

		let days = get30DaysFromNow();
		let showDays = [days[0], days[1], days[2], days[3], days[4]];

		this.state = {
			selectedVehicle: props.selectedVehicle,
			days: days,
			showDays: showDays,
			moreOrLess: true,
		};

		props.setStep(4);
	}

	componentDidMount = () => {
		gtag("js", new Date());
		gtag("config", "UA-156726482-1");
		if (window.fbq != null) {
			window.fbq("track", "PageView");
		}
	};

	componentWillMount() {
		const { days } = this.state;
		const { selectedDate } = this.props;
		if (selectedDate) {
			this.setState({
				selectedDayIndex: days.indexOf(
					days.find((date) => date.year === selectedDate.date.year && date.month === selectedDate.date.month && date.day === selectedDate.date.day)
				),
			});

			this.setState({
				selectedTimeIndex: TIMES.indexOf(TIMES.find((time) => time.from === selectedDate.time.from && time.to === selectedDate.time.to)),
			});
		}
	}

	onClickMore = () => {
		this.setState({
			showDays: this.state.days,
			moreOrLess: false,
		});
	};

	onClickLess = () => {
		const { days } = this.state;
		let showDays = [days[0], days[1], days[2], days[3], days[4]];
		this.setState({
			showDays: showDays,
			moreOrLess: true,
		});
	};

	onClickVehicle = (vehicle) => {
		this.setState({
			selectedVehicle: vehicle,
		});
	};

	onClickDay = (index) => {
		this.setState({
			selectedDayIndex: index,
		});
	};

	onClickTime = (index) => {
		this.setState({
			selectedTimeIndex: index,
		});
	};

	onClickContinue = () => {
		const { selectedVehicle, selectedDayIndex, selectedTimeIndex, days } = this.state;

		if (selectedVehicle === undefined || selectedDayIndex === undefined || selectedTimeIndex === undefined) {
			alert("You have to select a vehicle, a day and a time");
			return;
		}

		this.props.history.push("/book/item");
		this.props.dateSelected(selectedVehicle, days[selectedDayIndex], TIMES[selectedTimeIndex]);
	};

	render() {
		const { showDays, moreOrLess, selectedVehicle, selectedDayIndex, selectedTimeIndex } = this.state;
		return (
			<Container maxWidth="md" style={{ marginBottom: 10 }}>
				<Box mb={2}>
					<Grid container className="vehicle-thumb-panel">
						{VEHICLES.map((vehicle) => (
							<Grid key={vehicle.id} item xs={6} md={3}>
								<div className={`item ${selectedVehicle.id === vehicle.id ? "selected" : ""}`} onClick={() => this.onClickVehicle(vehicle)}>
									<div>
										<img src={vehicle.icon} alt="icon" />
									</div>
									<div className="title">
										<div className="name">{vehicle.name}</div>
										<div className="luggers">{vehicle.luggers > 1 ? `${vehicle.luggers} Luggers` : `${vehicle.luggers} Lugger`}</div>
									</div>
								</div>
							</Grid>
						))}
					</Grid>
				</Box>
				<Box p={1} textAlign="left" fontSize={24}>
					What day do you need us?
				</Box>
				<Box>
					<Grid container>
						{showDays.map((date, i) => (
							<Grid key={i} item sm={2} xs={3}>
								<div className={`button date ${selectedDayIndex === i ? "selected" : ""}`} onClick={() => this.onClickDay(i)}>
									<div className={date.firstDay === true ? "first-day" : "weekday"}>{date.weekDay}</div>
									<div className="day">{date.day}</div>
								</div>
							</Grid>
						))}
						<Grid item sm={2} xs={3}>
							{moreOrLess ? (
								<div className="button date more-less" onClick={this.onClickMore}>
									<div>More</div>
									<div>
										<IoIosArrowDown />
									</div>
								</div>
							) : (
								<div className="button date more-less" onClick={this.onClickLess}>
									<div>
										<IoIosArrowUp />
									</div>
									<div>Less</div>
								</div>
							)}
						</Grid>
					</Grid>
				</Box>
				<Box p={1} mt={3} textAlign="left">
					<Box fontSize={18}>When do you want us to arrive to your pickup location?</Box>
					<Box fontSize={14} color="var(--colorGray)">
						This is the arrival window. Not the time your Lugg takes.
					</Box>
				</Box>
				<Box py={1}>
					<Grid container>
						{TIMES.map((time, i) => (
							<Grid key={i} item sm={4} xs={6}>
								<div className={`button time ${selectedTimeIndex === i ? "selected" : ""}`} onClick={() => this.onClickTime(i)} style={{ margin: 4 }}>
									{getTimeString(time.from)} - {getTimeString(time.to)}
								</div>
							</Grid>
						))}
					</Grid>
				</Box>
				<div style={{ margin: 4 }}>
					<Button fullWidth className="lug-btn" onClick={this.onClickContinue}>
						Continue
					</Button>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	selectedVehicle: state.selectedVehicle,
	selectedDate: state.selectedDate,
});

const mapDispatchToProps = (dispatch) => ({
	dateSelected: (vehicle, date, time) => dispatch(dateSelected(vehicle, date, time)),
	setStep: (value) => dispatch(setStep(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelect);

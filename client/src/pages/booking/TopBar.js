import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";

const styles = {
	root: {
		padding: 10,
		fontSize: 20,
		color: "var(--colorWhite)",
		background: "var(--colorMain)",
		boxShadow: "0 1px 1px grey",
		marginBottom: 30,
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	index: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		width: 30,
		height: 30,
		marginRight: 10,
		borderRadius: "50%",
		background: "var(--colorWhite)",
		color: "var(--colorMain)"
	}
};

class TopBar extends Component {
	render() {
		const { classes, title, step } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.index}>{step}</div>
				<div>{title}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		title: state.title,
		step: state.step
	};
}
export default connect(mapStateToProps)(withStyles(styles)(TopBar));

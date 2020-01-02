import React, { Component } from "react";
import { Rating } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

const styles = {
	root: {
		paddingTop: "2em"
	},
	rating: {
		display: "flex",
		justifyContent: "center"
	},
	title: {
		padding: "0.5em",
		textAlign: "center",
		color: "var(--colorMain)",
		fontSize: "x-large"
	}
};

class RatingBar extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.rating}>
					<Rating value={5} size="large" readOnly />
				</div>
				<div className={classes.title}>Over 200,000 5-star moves</div>
			</div>
		);
	}
}

export default withStyles(styles)(RatingBar);

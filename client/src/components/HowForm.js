import React, { Component } from "react";
import { Container } from "@material-ui/core";

const workSteps = [
	{
		step: "Book Online",
		text:
			"Set your pickup location and destination, choose the size of vehicle that is right for you and let us know what time you want us to arrive.",
		image: "images/how01.png"
	},
	{
		step: "Relax",
		text:
			"We’ll get your item(s) picked you and delivered, keeping you updated via txt message.",
		image: "images/how02.png"
	},
	{
		step: "Rate Us",
		text:
			"Loved your experience using Lug? We’ll email you a link where you can tell us about your experience.",
		image: "images/how03.png"
	}
];

export default class HowForm extends Component {
	render() {
		return (
			<div className="how-it-works">
				<div className="title">How it works</div>
				<div className="subtitle">Anything moved in 3 easy steps</div>
				<Container maxWidth="md">
					{workSteps.map((item, index) => (
						<div className="step" key={index}>
							<div className="content">
								<div className="no">
									<span>{index + 1}</span>
								</div>
								<div className="title">{item.step}</div>
								<div className="description">{item.text}</div>
							</div>
							<div className="image">
								<img src={item.image} alt="how-it-works" />
							</div>
						</div>
					))}
				</Container>
			</div>
		);
	}
}

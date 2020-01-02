import React, { Component } from "react";
// import { MdInfoOutline } from "react-icons/md";

export default class Vehicle extends Component {
	render() {
		const { vehicle, distance, selected } = this.props;
		return (
			<div className={`vehicle ${selected ? "selected" : ""}`}>
				<div className="icon">
					<img src={vehicle.icon} alt="icon" />
				</div>
				<div className="title">
					<div className="name">{vehicle.name}</div>
					<div className="luggers">
						{vehicle.luggers > 1
							? `${vehicle.luggers} Luggers`
							: `${vehicle.luggers} Lugger`}
					</div>
				</div>
				<div className="description">{vehicle.description}</div>
				<div className="price">
					$
					{Number(
						vehicle.pricePerKm * Number.parseFloat(distance / 1000)
					).toFixed(2)}
				</div>
			</div>
		);
	}
}

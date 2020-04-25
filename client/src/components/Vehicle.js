import React, { Component } from "react";
import { calcPrice } from "../utils";
// import { MdInfoOutline } from "react-icons/md";

export default class Vehicle extends Component {
	render() {
		const { vehicle, distance, selected, discount } = this.props;
		return (
			<div className={`vehicle ${selected ? "selected" : ""}`}>
				<div>
					<img src={vehicle.icon} alt="icon" />
				</div>
				<div className="title">
					<div className="name">{vehicle.name}</div>
					<div className="luggers">{vehicle.luggers > 1 ? `${vehicle.luggers} Luggers` : `${vehicle.luggers} Lugger`}</div>
				</div>
				<div className="description">{vehicle.description}</div>
				{discount ? <div className="price">${calcPrice(vehicle.pricePerKm, distance, vehicle.fee, 0)}</div> : <div />}
				<div className="price-modified">${calcPrice(vehicle.pricePerKm, distance, vehicle.fee, discount)}</div>
			</div>
		);
	}
}

import React, { Component } from "react";
import { MdArrowForward } from "react-icons/md";

export default class Category extends Component {
	render() {
		const { category, solid, selected } = this.props;
		return (
			<div
				className={`category ${solid ? "solid" : ""} ${
					selected ? "selected" : ""
				}`}
			>
				<img className="icon" src={category.icon} alt="icon" />
				<div className="name">{category.name}</div>
				<MdArrowForward className="arrow" />
			</div>
		);
	}
}

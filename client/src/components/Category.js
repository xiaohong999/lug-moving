import React, { Component } from "react";
import { MdArrowForward } from "react-icons/md";

export default class Category extends Component {
	render() {
		const { category, selected } = this.props;
		return (
			<div className={`category ${selected ? "selected" : ""}`}>
				<img className="icon" src={category.icon} alt="icon" />
				<div className="name">{category.name}</div>
				<MdArrowForward className="arrow" />
			</div>
		);
	}
}

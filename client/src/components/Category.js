import React, { Component } from "react";
import { MdArrowForward } from "react-icons/md";

export default class Category extends Component {
	state = {
		hover: false
	};
	render() {
		const { category, solid, selected } = this.props;
		return (
			<div
				className={`category ${solid ? "solid" : ""} ${
					selected ? "selected" : ""
				}`}
				onMouseEnter={() => {
					this.setState({ hover: true });
				}}
				onMouseLeave={() => {
					this.setState({ hover: false });
				}}
				onTouchStart={() => {
					this.setState({ hover: true });
				}}
				onTouchEnd={() => {
					this.setState({ hover: false });
				}}
			>
				<img
					className="icon"
					src={category.iconNormal}
					alt="icon"
					style={{ display: this.state.hover ? "none" : "block" }}
				/>
				<img
					className="icon-focus"
					src={category.iconActive}
					alt="icon"
					style={{ display: this.state.hover ? "block" : "none" }}
				/>
				<div className="name">{category.name}</div>
				<MdArrowForward className="arrow" />
			</div>
		);
	}
}

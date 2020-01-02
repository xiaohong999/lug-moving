import React, { Component } from "react";
// import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapseClass: ""
		};
	}

	setToggleTopMenuClass = () => {
		if (this.state.collapseClass === "") {
			this.setState({
				collapseClass: "collapsed"
			});
		} else {
			this.setState({
				collapseClass: ""
			});
		}
	};

	render = () => {
		return (
			<div>
				<div className={`top-menu ${this.state.collapseClass}`}>
					<div className="top-menu-lead">
						<Link to="/">Lug</Link>
					</div>
					<div className="menu">
						<Link to="/">Services</Link>
						<Link to="/">Get an estimate</Link>
						<Link to="/">About us</Link>
						<Link to="/book" className="book">
							Book now
						</Link>
					</div>
					<MdMenu
						className="top-menu-icon"
						onClick={this.setToggleTopMenuClass}
					/>
				</div>
			</div>
		);
	};
}

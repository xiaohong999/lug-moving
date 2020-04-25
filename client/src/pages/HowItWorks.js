/*global gtag*/
import React, { Component } from "react";
import Header from "../layouts/Header";
import HowForm from "../components/HowForm";
import Footer from "../layouts/Footer";

export default class HowItWorks extends Component {
	componentDidMount = () => {
		gtag("js", new Date());
		gtag("config", "UA-156726482-1");
		if (window.fbq != null) {
			window.fbq("track", "PageView");
		}
	};

	render() {
		return (
			<div>
				<div style={{ background: "var(--colorMain)" }}>
					<Header />
				</div>
				<HowForm />
				<Footer />
			</div>
		);
	}
}

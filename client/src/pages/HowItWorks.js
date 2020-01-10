import React, { Component } from "react";
import Header from "../layouts/Header";
import HowForm from "../components/HowForm";
import Footer from "../layouts/Footer";

export default class HowItWorks extends Component {
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

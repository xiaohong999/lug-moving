import React, { Component } from "react";
import { Container, Grid, Link } from "@material-ui/core";
import {
	FaFacebookSquare,
	FaTwitterSquare,
	FaInstagram,
	FaPinterest
} from "react-icons/fa";
// import { Link } from "react-router-dom";

export default class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<Container maxWidth="lg">
					<Grid container>
						<Grid item sm={8} xs={12}>
							<Grid container justify="center" spacing={2}>
								<Grid item sm={6} xs={12}>
									<div className="link">
										<a>Contact us</a>
									</div>
									<div className="link">
										<a>About</a>
									</div>
								</Grid>
								<Grid item sm={6} xs={12}>
									<div className="link">
										<a>Services</a>
									</div>
									<div className="link">
										<a>Get an estimate</a>
									</div>
									<div className="link">
										<a>How it works</a>
									</div>
									<div className="link book">
										<a>Book now</a>
									</div>
								</Grid>
							</Grid>
						</Grid>
						<Grid item sm={4} xs={12} className="connect">
							<div>
								<img src="images/logo.png" alt="lug.com" />
							</div>
							<div style={{ marginTop: 20 }}>
								<a href="https://facebook.com/">
									<FaFacebookSquare
										size={30}
										color="white"
										style={{ marginRight: 20 }}
									/>
								</a>
								<a href="https://twitter.com/">
									<FaTwitterSquare
										size={30}
										color="white"
										style={{ marginRight: 20 }}
									/>
								</a>
								<a href="https://instagram.com/">
									<FaInstagram
										size={30}
										color="white"
										style={{ marginRight: 20 }}
									/>
								</a>
								<a href="https://pinterest.com/">
									<FaPinterest size={30} color="white" />
								</a>
							</div>
						</Grid>
					</Grid>
				</Container>
			</div>
			// <div className="footer">
			// 	<div className="left">
			// 		<h3>Navigate</h3>
			// 		<div>
			// 			<a href="/">Home</a>
			// 		</div>
			// 		<div>
			// 			<a href="/">Services</a>
			// 		</div>
			// 		<div>
			// 			<a href="/">Get an estimate</a>
			// 		</div>
			// 		<div>
			// 			<a href="/">About us</a>
			// 		</div>
			// 		<div>
			// 			<a href="/">How it works</a>
			// 		</div>
			// 	</div>
			// 	<div className="center">
			// 		<h3>Connect</h3>
			// 		<div>
			// <a href="https://twitter.com/">
			// 	<img
			// 		src="https://brolik.com/images/icon-twitter.svg"
			// 		alt="twitter"
			// 	/>
			// </a>
			// 		</div>
			// 		<div>
			// 			<a href="https://www.facebook.com/">
			// 				<img
			// 					src="https://brolik.com/images/icon-facebook.svg"
			// 					alt="facebook"
			// 				/>
			// 			</a>
			// 		</div>
			// 		<div>
			// 			<a href="https://www.linkedin.com/">
			// 				<img
			// 					src="https://brolik.com/images/icon-linkedin.svg"
			// 					alt="linkedin"
			// 				/>
			// 			</a>
			// 		</div>
			// 	</div>
			// 	<div className="right">
			// 		<h3>Contact</h3>
			// 		<div>
			// 			<span style={{ fontWeight: 600 }}>Email : </span>
			// 			<a href="mailto:info@moving.com">info@moving.com</a>
			// 		</div>
			// 		<div>
			// 			<span style={{ fontWeight: 600 }}>Phone : </span>{" "}
			// 			<a href="tel:000-000-0000">000-000-0000</a>
			// 		</div>
			// 		<div>
			// 			<span style={{ fontWeight: 600 }}>Address : </span>240 zhenxing,
			// 			<br /> Liaoning,
			// 			<br /> China
			// 		</div>
			// 	</div>
			// </div>
		);
	}
}

import React, { Component } from "react";
import { Container, Grid } from "@material-ui/core";
import {
	FaFacebookSquare,
	// FaTwitterSquare,
	FaInstagram
	// FaPinterest
} from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

export default class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<Container maxWidth="lg">
					<Grid container>
						<Grid item sm={8} xs={12}>
							<Grid container justify="center" spacing={2}>
								<Grid item sm={6} xs={12}>
									<div className="contact">
										Contact us
										<div className="email">
											Email: <a href="mailto:hello@lug.nz">hello@lug.nz</a>
										</div>
										<div className="chat">
											<FiMessageCircle
												size={26}
												color="var(--colorSecondary)"
												style={{ paddingRight: 5 }}
											/>{" "}
											LiveChat
										</div>
									</div>
								</Grid>
								<Grid item sm={6} xs={12}>
									<div className="link">
										<a href="/">Home</a>
									</div>
									{/* <div className="link">
										<a href="/">Get an estimate</a>
									</div> */}
									<div className="link">
										<a href="/how">How it works</a>
									</div>
									<div className="link book">
										<a href="/book">Book now</a>
									</div>
								</Grid>
							</Grid>
						</Grid>
						<Grid item sm={4} xs={12} className="connect">
							<div>
								<img src="images/logo.png" alt="lug.nz" />
							</div>
							<div style={{ marginTop: 10 }}>
								<a href="https://facebook.com/">
									<FaFacebookSquare
										size={30}
										color="white"
										style={{ marginRight: 20 }}
									/>
								</a>
								{/* <a href="https://twitter.com/">
									<FaTwitterSquare
										size={30}
										color="white"
										style={{ marginRight: 20 }}
									/>
								</a> */}
								<a href="https://instagram.com/">
									<FaInstagram size={30} color="white" />
								</a>
								{/* <a href="https://pinterest.com/">
									<FaPinterest size={30} color="white" />
								</a> */}
							</div>
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	}
}

import React, { Component } from "react";
import { Container } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Rating } from "@material-ui/lab";

export default class ReviewPanel extends Component {
	render() {
		return (
			<div style={{ background: "#eee" }}>
				<Container maxWidth="md" style={{ marginTop: 20 }}>
					<Carousel
						autoPlay
						infiniteLoop={true}
						showThumbs={false}
						showArrows={false}
						showStatus={false}
						emulateTouch={true}
						swipeable={true}
					>
						<div className="review">
							<div className="title">
								<img className="icon" src="images/boy.png" alt="icon" />
								<div className="name">
									<div>Hong</div>
									<Rating value={5} readOnly />
								</div>
							</div>
							<div className="description">
								"This website is such a fast, easy, and convenient service! I've
								used them twice now and both moves have been amazing. I highly
								recommend this service to anyone who has no other way to
								transport big items!"
							</div>
						</div>
						<div className="review">
							<div className="title">
								<img className="icon" src="images/girl.png" alt="icon" />
								<div className="name">
									<div>Mei</div>
									<Rating value={5} readOnly />
								</div>
							</div>
							<div className="description">
								"I bought a very large and heavy dresser and was worried about
								how to get it home. Lugg really saved my day! Brett and Tamas
								were super helpful and easy to communicate with. Definitely a
								five star experience!"
							</div>
						</div>
					</Carousel>
					<div
						style={{
							color: "var(--colorMain)",
							padding: 20,
							fontSize: 24,
							fontWeight: 600
						}}
					>
						Read more
					</div>
				</Container>
			</div>
		);
	}
}

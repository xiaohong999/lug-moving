import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import Header from "../layouts/Header";
import Category from "../components/Category";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../layouts/Footer";
import { categorySelected } from "../redux/actions";

class Home extends Component {
	onClickCategory = category => {
		this.props.history.push("/book/location");
		this.props.categorySelected(category);
	};
	render() {
		const { categories } = this.props;
		return (
			<div className="home">
				<div
					className="bg"
					style={{
						backgroundImage:
							"linear-gradient(-180deg, rgba(58, 57, 120, 0.3) 2%, rgba(58, 57, 120, 0.8) 40%, rgb(58, 57, 120) 80%, rgb(58, 57, 120)), url('images/bg.jpg')"
					}}
				></div>
				<div style={{ position: "relative" }} className="container">
					<Header />
					<div className="title">Move anything</div>
					<div className="subtitle">with the push of a button</div>
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
							<div className="banner">
								<div className="title">
									<img className="icon" src="images/boy.png" alt="icon" />
									Hong
								</div>
								<div className="description">
									"This website is such a fast, easy, and convenient service!
									I've used them twice now and both moves have been amazing. I
									highly recommend this service to anyone who has no other way
									to transport big items!"
								</div>
							</div>
							<div className="banner">
								<div className="title">
									<img className="icon" src="images/girl.png" alt="icon" />
									Mei
								</div>
								<div className="description">
									"I bought a very large and heavy dresser and was worried about
									how to get it home. Lugg really saved my day! Brett and Tamas
									were super helpful and easy to communicate with. Definitely a
									five star experience!"
								</div>
							</div>
						</Carousel>
					</Container>
					<Grid
						container
						justify="center"
						style={{ marginTop: 20, padding: "0 10px" }}
					>
						<Grid item md={8} sm={10} xs={12}>
							<Grid container justify="center" spacing={3}>
								{categories.map(category => (
									<Grid key={category.id} sm={4} xs={12} item>
										<div onClick={this.onClickCategory.bind(this, category)}>
											<Category category={category} />
										</div>
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
					<div className="how-works">
						<div className="title">How it works</div>
						<div className="subtitle">Anything moved in 3 easy steps</div>
						<div className="image">
							<img
								src="images/howitworks.png"
								style={{ maxWidth: "100%" }}
								alt="how it works"
							/>
						</div>
						<div className="step">
							<div className="title">1. Book Online</div>
							<div className="subtitle">
								Set your pickup location and destination, choose the size of
								vehicle that is right for you and let us know what time you want
								us to arrive.
							</div>
						</div>
						<div className="step">
							<div className="title">2. Relax</div>
							<div className="subtitle">
								We’ll get your item(s) picked you and delivered, keeping you
								updated via txt message.
							</div>
						</div>
						<div className="step">
							<div className="title">3. Rate Us</div>
							<div className="subtitle">
								Loved your experience using Lug? We’ll email you a link where
								you can tell us about your experience.
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories
});
const mapDispatchToProps = dispatch => ({
	categorySelected: category => dispatch(categorySelected(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

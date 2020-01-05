import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import Header from "../layouts/Header";
import Category from "../components/Category";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../layouts/Footer";
import { categorySelected } from "../redux/actions";
import { Rating } from "@material-ui/lab";

class Home extends Component {
	onClickCategory = category => {
		this.props.history.push("/book/location");
		this.props.categorySelected(category);
	};
	render() {
		const { categories, howItWorks } = this.props;
		return (
			<div className="home">
				<div
					className="top-panel"
					style={{
						backgroundImage:
							"linear-gradient(rgba(58, 57, 115, 0.8), rgba(58, 57, 115, 0.6)), url('images/bg.jpg')"
					}}
				>
					<Header />
					<div className="title">Move anything</div>
					<div className="subtitle">with the push of a button</div>
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
				</div>
				<div className="how-it-works">
					<div className="title">How it works</div>
					<div className="subtitle">Anything moved in 3 easy steps</div>
					<Container maxWidth="md">
						{howItWorks.map((item, index) => (
							<div className="step" key={index}>
								<div className="content">
									<div className="no">
										<span>{index + 1}</span>
									</div>
									<div className="title">{item.step}</div>
									<div className="description">{item.text}</div>
								</div>
								<div className="image">
									<img src={item.image} alt="how-it-works" />
								</div>
							</div>
						))}
					</Container>
				</div>
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
									"This website is such a fast, easy, and convenient service!
									I've used them twice now and both moves have been amazing. I
									highly recommend this service to anyone who has no other way
									to transport big items!"
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
					<Footer />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	howItWorks: state.howItWorks,
	categories: state.categories
});
const mapDispatchToProps = dispatch => ({
	categorySelected: category => dispatch(categorySelected(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

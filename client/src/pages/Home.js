import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Header from "../layouts/Header";
import Category from "../components/Category";
import Footer from "../layouts/Footer";
import { categorySelected } from "../redux/actions";
import HowForm from "../components/HowForm";

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
					className="top-panel"
					style={{
						backgroundImage:
							"linear-gradient(rgba(58, 57, 115, 0.8), rgba(58, 57, 115, 0.6)), url('images/bg.jpg')"
					}}
				>
					<Header />
					<div className="title">Move Anything Across Auckland</div>
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
				<HowForm />
				<Footer />
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

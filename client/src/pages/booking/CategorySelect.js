import React, { Component } from "react";
import { Grid, Container } from "@material-ui/core";
import Category from "../../components/Category";
import RatingBar from "../../components/RatingBar";
import { connect } from "react-redux";
import { categorySelected, setStep } from "../../redux/actions";

class CategorySelect extends Component {
	onClickCategory = category => {
		this.props.history.push("/book/location");
		this.props.categorySelected(category);
	};

	componentWillMount() {
		this.props.setStep(1);
	}

	render() {
		const { categories } = this.props;
		return (
			<Container maxWidth="md" style={{ marginBottom: 10 }}>
				<Grid container justify="center" spacing={2}>
					{categories.map(category => (
						<Grid key={category.id} sm={4} xs={12} item>
							<div onClick={this.onClickCategory.bind(this, category)}>
								<Category category={category} />
							</div>
						</Grid>
					))}
				</Grid>
				<RatingBar />
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories,
	selectedCategory: state.selectedCategory
});

const mapDispatchToProps = dispatch => ({
	categorySelected: category => dispatch(categorySelected(category)),
	setStep: value => dispatch(setStep(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);

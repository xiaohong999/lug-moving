/*global gtag*/
import React, { Component } from "react";
import { Grid, Container } from "@material-ui/core";
import Category from "../../components/Category";
import { connect } from "react-redux";
import { categorySelected, setStep } from "../../redux/actions";
import { CATEGORIES } from "../../utils";

class CategorySelect extends Component {
	constructor(props) {
		super(props);

		props.setStep(1);
	}

	componentDidMount = () => {
		gtag("js", new Date());
		gtag("config", "UA-156726482-1");
		if (window.fbq != null) {
			window.fbq("track", "PageView");
		}
	};

	onClickCategory = (category) => {
		this.props.history.push("/book/location");
		this.props.categorySelected(category);
	};

	render() {
		const { selectedCategory } = this.props;
		return (
			<div>
				<Container maxWidth="md" style={{ marginBottom: 10 }}>
					<Grid container justify="center" spacing={2}>
						{CATEGORIES.map((category) => (
							<Grid key={category.id} sm={4} xs={12} item>
								<div onClick={this.onClickCategory.bind(this, category)}>
									{selectedCategory && selectedCategory.id === category.id ? (
										<Category category={category} solid selected />
									) : (
										<Category category={category} solid />
									)}
								</div>
							</Grid>
						))}
					</Grid>
				</Container>
				<div style={{ padding: "0 20px" }}>
					<div className="embedsocial-reviews" data-ref="72ed31d504ff1743a0925a64badd591d0b9f922f"></div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	selectedCategory: state.selectedCategory,
});

const mapDispatchToProps = (dispatch) => ({
	categorySelected: (category) => dispatch(categorySelected(category)),
	setStep: (value) => dispatch(setStep(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);

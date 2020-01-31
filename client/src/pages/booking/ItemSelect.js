import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, TextField, Button } from "@material-ui/core";
import { setStep, itemsSaved } from "../../redux/actions";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

class ItemSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: null,
			quantity: 1,
			items: []
		};
		this.itemName = React.createRef();
	}

	increaseQuantity = () => {
		this.setState({
			quantity: this.state.quantity + 1
		});
	};

	decreaseQuantity = () => {
		this.setState({
			quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 0
		});
	};

	componentWillMount = () => {
		this.props.setStep(5);
	};

	componentDidMount = () => {
		this.itemName.focus();
	};

	handleContinue = () => {
		if (!this.state.items.length) {
			alert("You must add a item at least!");
			return;
		}

		this.props.history.push("/book/contact");
		this.props.itemsSaved(this.state.items);
	};

	handleNew = () => {
		this.setState({
			selectedItem: null,
			quantity: 1
		});
		this.itemName.value = "";
		this.itemName.focus();
	};

	handleSave = () => {
		if (!this.itemName.value.length) {
			alert("Please type the item name");
			return;
		}

		let newItem = {
			id: new Date().getTime(),
			name: this.itemName.value,
			quantity: this.state.quantity
		};
		const { selectedItem } = this.state;
		let items = this.state.items;
		if (selectedItem) {
			for (let i in items) {
				let item = items[i];
				if (item.id === selectedItem.id) {
					item.name = newItem.name;
					item.quantity = newItem.quantity;
					break;
				}
			}
		} else {
			items.push(newItem);
		}
		this.setState({
			items: items,
			quantity: 1,
			selectedItem: null
		});
		this.itemName.value = "";
		this.itemName.focus();
	};

	handleEdit = item => {
		this.itemName.value = item.name;
		this.itemName.focus();
		this.setState({
			selectedItem: item,
			quantity: item.quantity
		});
	};

	handleDelete = item => {
		let items = this.state.items;
		items.splice(items.indexOf(item), 1);
		this.setState({
			items: items,
			quantity: 1,
			selectedItem: null
		});
		this.itemName.value = "";
	};

	render() {
		const { quantity, items } = this.state;
		const itemList = items.length ? (
			items.map(item => (
				<div key={item.id} className="row">
					<div className="cell">{item.name}</div>
					<div className="cell count">{item.quantity}</div>
					<div className="cell action">
						<div style={{ display: "flex", alignItems: "end" }}>
							<FaRegEdit
								className="btn-edit"
								size={24}
								onClick={this.handleEdit.bind(this, item)}
							/>
							<FaRegTrashAlt
								className="btn-delete"
								size={24}
								onClick={this.handleDelete.bind(this, item)}
							/>
						</div>
					</div>
				</div>
			))
		) : (
			<div>Please add items to move</div>
		);
		return (
			<Container maxWidth="md" style={{ marginBottom: 10 }}>
				<div className="add-item">
					<div className="name">
						<TextField
							fullWidth
							label="Item name"
							placeholder="Type item name to add"
							InputLabelProps={{
								shrink: true
							}}
							inputRef={ref => {
								this.itemName = ref;
							}}
							variant="outlined"
						/>
					</div>
					{/* <div>
						<div style={{ marginTop: -10, marginBottom: 3 }}>Quantity</div> */}
					<div className="quantity" style={{ marginRight: 10 }}>
						<button onClick={this.decreaseQuantity}>-</button>
						<span>{quantity}</span>
						<button onClick={this.increaseQuantity}>+</button>
					</div>
					<Button className="lug-btn" onClick={this.handleSave}>
						Save
					</Button>
					{/* </div> */}
				</div>
				<div className="list-panel">
					<div className="title-area">
						<span className="label">
							{items.length} item{items.length > 1 ? "s" : ""} added
						</span>
						{/* <FaRegPlusSquare
							size={30}
							className="btn-add"
							onClick={this.handleNew}
						/> */}
					</div>
					<div className="item-list">{itemList}</div>
				</div>
				<Button className="lug-btn" fullWidth onClick={this.handleContinue}>
					Continue
				</Button>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	items: state.items
});

const mapDispatchToProps = dispatch => ({
	itemsSaved: items => dispatch(itemsSaved(items)),
	setStep: value => dispatch(setStep(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelect);

import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default class LocationField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: props.address ? props.address : "",
		};

		this.locationInput = React.createRef();
		this.refDropdown = React.createRef();
	}

	// componentWillMount() {
	// 	if (this.props.address) {
	// 		this.setState({
	// 			address: this.props.address,
	// 		});
	// 	}
	// }

	componentDidMount = () => {
		this.handleWindowResize();
		window.addEventListener("resize", this.handleWindowResize);
	};

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleWindowResize);
	}

	handleWindowResize = () => {
		if (window.innerWidth <= 576) {
			this.refDropdown.current.style.width = this.locationInput.current.offsetWidth + 90 + "px";
		} else {
			this.refDropdown.current.style.width = this.locationInput.current.offsetWidth + 60 + "px";
		}
	};

	handleChange = (address) => {
		this.setState({ address });
	};

	handleSelect = (address) => {
		this.setState({
			address: address,
		});
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				this.props.placeSelected({
					coordinate: latLng,
					address: address,
				});
			})
			.catch((error) => console.error("Error", error));
	};

	render() {
		const { direction } = this.props;
		const arrow = direction === 0 ? <MdArrowUpward className="arrow" /> : <MdArrowDownward className="arrow" />;
		const label = direction === 0 ? "Pickup address" : "Destination";
		const placeholder = direction === 0 ? "Enter pickup" : "Enter destination";
		return (
			<div className="location">
				{arrow}

				<PlacesAutocomplete value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect}>
					{({ getInputProps, suggestions, getSuggestionItemProps }) => (
						<div className="location-input">
							<TextField
								ref={this.locationInput}
								{...getInputProps({
									label: label,
									placeholder: placeholder,
									className: "location-input",
									InputLabelProps: {
										shrink: true,
									},
								})}
							/>
							<div className="location-drop-down" ref={this.refDropdown}>
								{/* {loading && <div>Loading...</div>} */}
								{suggestions.map((suggestion) => {
									const className = suggestion.active ? "active" : "normal";
									// inline style for demonstration purpose
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
											})}
										>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
			</div>
		);
	}
}

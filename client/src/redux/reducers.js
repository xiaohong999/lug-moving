import * as Types from "./types";

const titles = [
	"Select a category",
	"Enter your pickup and destination",
	"Select a vehicle",
	"Select a time",
	"Preview the price",
	"Checkout"
];

const initialCategories = [
	{
		id: 1,
		name: "Move Anything",
		icon: "images/c-01.png"
	},
	{
		id: 2,
		name: "Trademe Pickup",
		icon: "images/c-02.png"
	},
	{
		id: 3,
		name: "Storage Move",
		icon: "images/c-03.png"
	},
	{
		id: 4,
		name: "Small Move",
		icon: "images/c-04.png"
	},
	{
		id: 5,
		name: "Store Delivery",
		icon: "images/c-05.png"
	},
	{
		id: 6,
		name: "Urgent Across Town",
		icon: "images/c-06.png"
	}
];

const initialVehicles = [
	{
		id: 1,
		name: "Car",
		luggers: 1,
		description: "Single item deliveries, small moves and smaller loads.",
		price: 47,
		additionalPrice: 0.8,
		pricePerKm: 1.5,
		icon: "../images/v-01.png"
	},
	{
		id: 2,
		name: "Van",
		luggers: 1,
		description: "Single item deliveries, small moves and smaller loads.",
		price: 63,
		additionalPrice: 1.4,
		pricePerKm: 3.0,
		icon: "../images/v-02.png"
	},
	{
		id: 3,
		name: "Truck",
		luggers: 2,
		description: "Single item deliveries, small moves and smaller loads.",
		price: 100,
		additionalPrice: 1.75,
		pricePerKm: 4.0,
		icon: "../images/v-03.png"
	}
];

const initialState = {
	categories: initialCategories,
	vehicles: initialVehicles,
	selectedCategory: null,
	selectedLocation: null,
	selectedVehicle: null,
	selectedDate: null,
	price: 0,
	title: titles[0],
	step: 1
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.CATEGORY_SELECTED: {
			return {
				...state,
				selectedCategory: action.category
			};
		}
		case Types.LOCATION_SELECTED: {
			return {
				...state,
				selectedLocation: action.location
			};
		}
		case Types.VEHICLE_SELECTED: {
			return {
				...state,
				selectedVehicle: action.vehicle
			};
		}
		case Types.DATE_SELECTED: {
			return {
				...state,
				selectedVehicle: action.vehicle,
				selectedDate: action.date
			};
		}
		case Types.SET_STEP: {
			return {
				...state,
				title: titles[action.value - 1],
				step: action.value
			};
		}
		default:
			return state;
	}
}

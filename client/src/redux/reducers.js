import * as Types from "./types";

const titles = [
	"Select a category",
	"Pickup and destination",
	"Select a vehicle",
	"Select a time",
	"Add items to move",
	"Contact Infomation",
	"Preview the price"
];

const initialCategories = [
	{
		id: 1,
		name: "Urgent Across Town",
		iconNormal: "images/c-01-normal.png",
		iconActive: "images/c-01-active.png"
	},
	{
		id: 2,
		name: "Evening Delivery",
		iconNormal: "images/c-02-normal.png",
		iconActive: "images/c-02-active.png"
	},
	{
		id: 3,
		name: "One Man Van",
		iconNormal: "images/c-03-normal.png",
		iconActive: "images/c-03-active.png"
	},
	{
		id: 4,
		name: "Two Men, One Truck",
		iconNormal: "images/c-04-normal.png",
		iconActive: "images/c-04-active.png"
	},
	{
		id: 5,
		name: "Trademe Pickup & Delivery",
		iconNormal: "images/c-05-normal.png",
		iconActive: "images/c-05-active.png"
	},
	{
		id: 6,
		name: "Small Move",
		iconNormal: "images/c-06-normal.png",
		iconActive: "images/c-06-active.png"
	}
];

const initialVehicles = [
	{
		id: 1,
		name: "Car",
		luggers: 1,
		description: "Single item deliveries, small moves and smaller loads.",
		price: 47,
		fee: 6,
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
		fee: 10,
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
		fee: 35,
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
	contactInfo: null,
	items: [],
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
		case Types.ITEMS_SAVED: {
			return {
				...state,
				items: action.items
			};
		}
		case Types.CONTACT_INFO_SAVED: {
			return {
				...state,
				contactInfo: action.info
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

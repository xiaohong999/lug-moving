import * as Types from "./types";

const titles = ["Select a category", "Pickup and destination", "Select a vehicle", "Select a time", "Add items to move", "Contact Infomation", "Preview the price"];

export const initialState = {
	selectedCategory: null,
	selectedService: null,
	selectedLocation: null,
	selectedVehicle: null,
	selectedDate: null,
	contactInfo: null,
	items: [],
	price: 0,
	title: titles[0],
	step: 1,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.CATEGORY_SELECTED: {
			return {
				...state,
				selectedCategory: action.category,
			};
		}
		case Types.SERVICE_SELECTED: {
			return {
				...state,
				selectedService: action.service,
			};
		}
		case Types.LOCATION_SELECTED: {
			return {
				...state,
				selectedLocation: action.location,
			};
		}
		case Types.VEHICLE_SELECTED: {
			return {
				...state,
				selectedVehicle: action.vehicle,
				discount: action.discount,
			};
		}
		case Types.DATE_SELECTED: {
			return {
				...state,
				selectedVehicle: action.vehicle,
				selectedDate: action.date,
			};
		}
		case Types.ITEMS_SAVED: {
			return {
				...state,
				items: action.items,
			};
		}
		case Types.CONTACT_INFO_SAVED: {
			return {
				...state,
				contactInfo: action.info,
			};
		}
		case Types.SET_STEP: {
			return {
				...state,
				title: titles[action.value - 1],
				step: action.value,
			};
		}
		default:
			return state;
	}
}

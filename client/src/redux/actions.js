import * as Type from "./types";

export const categorySelected = category => ({
	type: Type.CATEGORY_SELECTED,
	category: category
});
export const locationSelected = location => ({
	type: Type.LOCATION_SELECTED,
	location: location
});
export const vehicleSelected = vehicle => ({
	type: Type.VEHICLE_SELECTED,
	vehicle: vehicle
});
export const dateSelected = (vehicle, date, time) => ({
	type: Type.DATE_SELECTED,
	vehicle: vehicle,
	date: { date: date, time: time }
});

export const setStep = value => ({
	type: Type.SET_STEP,
	value: value
});

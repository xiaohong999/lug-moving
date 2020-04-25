import * as Type from "./types";

export const categorySelected = (category) => ({
	type: Type.CATEGORY_SELECTED,
	category: category,
});
export const serviceSelected = (service) => ({
	type: Type.SERVICE_SELECTED,
	service: service,
});
export const locationSelected = (location) => ({
	type: Type.LOCATION_SELECTED,
	location: location,
});
export const vehicleSelected = (vehicle, discount) => ({
	type: Type.VEHICLE_SELECTED,
	vehicle: vehicle,
	discount: discount,
});
export const dateSelected = (vehicle, date, time) => ({
	type: Type.DATE_SELECTED,
	vehicle: vehicle,
	date: { date: date, time: time },
});

export const itemsSaved = (items) => ({
	type: Type.ITEMS_SAVED,
	items: items,
});

export const contactInfoSaved = (info) => ({
	type: Type.CONTACT_INFO_SAVED,
	info: info,
});

export const setStep = (value) => ({
	type: Type.SET_STEP,
	value: value,
});

export function get30DaysFromNow() {
	let now = new Date();
	let monthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

	let days = [
		{
			day: now.getDate(),
			month: now.getMonth(),
			year: now.getFullYear(),
			weekDay: "Today",
			firstDay: false
		}
	];

	let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let months = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC"
	];
	for (let i = 1; i < monthDays; i++) {
		let newDate = new Date(now);
		newDate.setDate(now.getDate() + i);
		days = [
			...days,
			{
				day: newDate.getDate(),
				month: newDate.getMonth(),
				year: newDate.getFullYear(),
				weekDay:
					newDate.getDate() === 1
						? months[newDate.getMonth()]
						: weekDays[newDate.getDay()],
				firstDay: newDate.getDate() === 1 ? true : false
			}
		];
	}

	return days;
}
export function getDateString(date) {
	let now = new Date();
	let dateString = "";
	if (
		now.getDate() === Number(date.day) &&
		now.getMonth() === Number(date.month) &&
		now.getFullYear() === Number(date.year)
	) {
		dateString = "Today";
	} else {
		dateString = new Date(date.year, date.month, date.day).toDateString();
	}
	console.log(date);
	return dateString;
}

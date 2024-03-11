export function isSameMonth(date1: Date, date2: Date): boolean {
	if (date1.getFullYear() === date2.getFullYear()) {
		if (date1.getMonth() === date2.getMonth()) return true;
	}
	return false;
}

export function isSameDay(date1: Date, date2: Date): boolean {
	if (isSameMonth(date1, date2)) {
		if (date1.getDate() === date2.getDate()) return true;
	}
	return false;
}

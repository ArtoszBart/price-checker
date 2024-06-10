export function getDateTimeString(date: Date): string {
	return `${getTimeString(date)} ${getDateString(date)}`;
}

export function getTimeString(date: Date): string {
	return `${date.getHours().toString().padStart(2, '0')}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
}

export function getDateString(date: Date): string {
	const month = date.getMonth() + 1;
	return `${date.getDate().toString().padStart(2, '0')}.${month
		.toString()
		.padStart(2, '0')}.${date.getFullYear()}`;
}

export function getBoolValue(string: string | null | boolean): boolean | null {
	if (string === 'true') return true;
	if (string === 'false') return false;
	return null;
}

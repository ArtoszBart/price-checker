export function getDateTimeString(date: Date): string {
	return `${date.getHours().toString().padStart(2, '0')}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}.${date
		.getMonth()
		.toString()
		.padStart(2, '0')}.${date.getFullYear()}`;
}

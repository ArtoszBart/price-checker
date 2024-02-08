import { db } from '@vercel/postgres';
import Data from '@/models/Data';

export const getPrices = async () => {
	const result = await db`SELECT * FROM Data`;
	return result.rows;
};

export const insertData = async (data: Data[]) => {
	let query = `INSERT INTO Data (itemId, date, price, quantity, availability) VALUES `;
	const values: any = [];

	data.forEach((d, n) => {
		const newValues = [
			d.item.id,
			d.date,
			d.price,
			d.quantity,
			d.availability,
		];
		values.push(...newValues);

		const no: number = n * 5;
		query += `(${no + 1}, ${no + 2}, ${no + 3}, ${no + 4}, ${no + 5}),`;
	});
	query = query.replace(/.$/, ';');

	const result = await db.query(query, values);
	return result;
};

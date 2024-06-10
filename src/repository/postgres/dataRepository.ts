import { db } from '@vercel/postgres';
import Data from '@/models/Data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const getItemData = async (itemId: number): Promise<Data[]> => {
	const result =
		await db`SELECT * FROM Data WHERE itemId = ${itemId} ORDER BY date ASC`;

	return result.rows as Data[];
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
		query += `($${no + 1}, $${no + 2}, $${no + 3}, $${no + 4}, $${
			no + 5
		}),`;
	});
	query = query.replace(/.$/, ';');
	console.log(query);

	const result = await db.query(query, values);
	return result;
};

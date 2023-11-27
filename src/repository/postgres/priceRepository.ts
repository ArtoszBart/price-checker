import { db } from '@vercel/postgres';
import Price from '@/models/price';

export const getPrices = async () => {
	const result = await db`SELECT * FROM PriceHistory`;
	return result.rows;
};

export const createPrice = async (price: Price) => {
	const query = `INSERT INTO PriceHistory (date, price, vendor, link) VALUES ($1, $2, $3, $4)`;
	const values = [price.date, price.price, price.vendor, price.link];

	const result = await db.query(query, values);
	return result;
};

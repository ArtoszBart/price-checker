import Vendor from '@/models/Vendor';
import { db } from '@vercel/postgres';

export const getVendors = async (): Promise<Vendor[]> => {
	const result = await db`SELECT * FROM Vendor;`;

	const vendors: Vendor[] = [];
	result.rows.forEach((row) => {
		vendors.push(new Vendor(row.id, row.name));
	});

	return vendors;
};

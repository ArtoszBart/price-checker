import Data from '@/models/Data';
import Item from '@/models/Item';
import Vendor from '@/models/Vendor';
import { db } from '@vercel/postgres';

export const getItems = async () => {
	const result =
		await db`SELECT Item.Id, link, Item.Name, active, Vendor.Id as vendor_id, Vendor.Name as vendor_name FROM Item JOIN Vendor ON Item.vendorId = Vendor.Id;`;

	const vendors: Vendor[] = [];
	const items: Item[] = [];
	result.rows.forEach((row) => {
		let vendor: Vendor | undefined = vendors.find(
			(v) => v.id === row.vendor_id
		);
		if (!vendor) {
			vendor = new Vendor(row.vendor_id, row.vendor_name);
			vendors.push(vendor);
		}
		items.push(new Item(row.id, vendor, row.link, row.name));
	});

	return items;
};

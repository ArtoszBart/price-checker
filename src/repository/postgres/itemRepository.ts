import { unstable_noStore as noStore } from 'next/cache';

import Item, { ItemMin } from '@/models/Item';
import Vendor from '@/models/Vendor';
import { db } from '@vercel/postgres';

export const getItems = async (): Promise<Item[]> => {
	noStore();
	const result =
		await db`SELECT Item.Id, link, Item.Name, active, image_link, Vendor.Id as vendor_id, Vendor.Name as vendor_name FROM Item JOIN Vendor ON Item.vendorId = Vendor.Id;`;

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
		items.push(
			new Item(row.id, vendor, row.link, row.name, row.image_link)
		);
	});

	console.log('============================================================');
	console.log('Repo got items:');
	items.forEach((i) => console.log(i.id));
	console.log('============================================================');

	return items;
};

export const getItemsMin = async (): Promise<ItemMin[]> => {
	const result = await db`SELECT id, name FROM item WHERE active = true;`;

	const items: ItemMin[] = [];
	result.rows.forEach((row) => {
		items.push({ id: row.id, name: row.name });
	});

	return items;
};

export const createItem = async (item: Item): Promise<boolean> => {
	const result = await db`
			INSERT INTO Item (vendorId, link, name, image_link)
			VALUES (${item.vendor as number}, ${item.link}, ${item.name}, ${
		item.imageLink
	})`;

	return result.rowCount === 1 ? true : false;
};

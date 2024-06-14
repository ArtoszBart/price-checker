import { unstable_noStore as noStore } from 'next/cache';

import Item, { ItemMin, ItemNotification } from '@/models/Item';
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

export const getItemsNotifications = async (): Promise<ItemNotification[]> => {
	noStore();
	const result = await db`
			SELECT target_price, last_price, target_quantity, last_quantity, target_availability, last_availability, item.id as item_id, item.name as name, price, quantity, availability, email, link, vendorid, notification.id as notification_id
			FROM notification 
			JOIN item ON notification.item_id = item.id
			JOIN data ON item.id = data.itemid
			JOIN (SELECT MAX(Id) as Id FROM Data GROUP BY itemId) maxIds ON Data.id = maxIds.id
			JOIN account ON Notification.account_id = Account.id
			WHERE active = true;
		`;

	const items: ItemNotification[] = [];
	result.rows.forEach((row) => {
		const currentItem = items.find(
			(item: ItemNotification) => item.itemId === row.item_id
		);

		if (!currentItem) {
			items.push({
				itemId: row.item_id,
				name: row.name,
				link: row.link,
				vendor: row.vendorid,
				lastData: {
					price: row.price,
					quantity: row.quantity,
					availability: row.availability,
				},
				notifications: [
					{
						targetPrice: row.target_price,
						lastSendedPrice: row.last_price,
						targetQuantity: row.target_quantity,
						lastSendedQuantity: row.last_quantity,
						targetAvailability: row.target_availability,
						lastSendedAvailability: row.last_availability,
						email: row.email,
						id: row.notification_id,
					},
				],
			});
		} else {
			currentItem.notifications.push({
				targetPrice: row.target_price,
				lastSendedPrice: row.last_price,
				targetQuantity: row.target_quantity,
				lastSendedQuantity: row.last_quantity,
				targetAvailability: row.target_availability,
				lastSendedAvailability: row.last_availability,
				email: row.email,
				id: row.notification_id,
			});
		}
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

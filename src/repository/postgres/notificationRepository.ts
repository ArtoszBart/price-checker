import { db } from '@vercel/postgres';
import { Notification } from '@/models/Notification';

export const getUserNotifications = async (
	id: number
): Promise<Notification[]> => {
	const result =
		await db`SELECT notification.id, target_price, last_price, target_quantity, last_quantity, target_availability, last_availability, item.id as item_id, name, image_link, price, quantity, availability
		FROM notification 
		JOIN item ON notification.item_id = item.id
		JOIN data ON item.id = data.itemid
		WHERE account_id = ${id} AND date = (SELECT MAX(date) as date FROM data WHERE data.itemid = item.id);`;

	const notifications: Notification[] = [];
	result.rows.forEach((row) => {
		notifications.push(
			new Notification(
				row.id,
				row.target_price,
				row.last_price,
				row.target_quantity,
				row.last_quantity,
				row.target_availability,
				row.last_availability,
				{
					id: row.item_id,
					imageLink: row.image_link,
					name: row.name,
					lastData: {
						price: row.price,
						quantity: row.quantity,
						availability: row.availability,
					},
					test: 'xD',
				}
			)
		);
	});

	return notifications;
};

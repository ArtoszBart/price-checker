import { db } from '@vercel/postgres';
import { Notification, NotificationToSend } from '@/models/Notification';

export const getUserNotifications = async (
	id: number
): Promise<Notification[]> => {
	const result = await db`
		SELECT notification.id, target_price, last_price, target_quantity, last_quantity, target_availability, last_availability, item.id as item_id, name, image_link, price, quantity, availability
		FROM notification 
		JOIN item ON notification.item_id = item.id
		JOIN data ON item.id = data.itemid
		JOIN (SELECT MAX(Id) as Id FROM Data GROUP BY itemId) maxIds
		ON Data.id = maxIds.id
		WHERE account_id = ${id};`;

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
				}
			)
		);
	});

	return notifications;
};

export const createNotification = async (
	notification: Notification
): Promise<boolean> => {
	const result = await db`
			INSERT INTO Notification (target_price, target_quantity, target_availability, item_id, account_id)
			VALUES (${notification.targetPrice}, ${notification.targetQuantity}, ${
		notification.targetAvailability
	}, ${notification.item as number}, ${notification.user as number})`;
	console.log(result);

	return result.rowCount === 1 ? true : false;
};

export const updateNotificationsLastData = async (
	notifications: NotificationToSend[]
): Promise<void> => {
	notifications.forEach(async (notification) => {
		const result = await db`
		UPDATE Notification 
		SET last_price = ${notification.price}, last_quantity = ${notification.quantity}, last_availability = ${notification.availability}
		WHERE Id = ${notification.id}
		`;
		if (result.rowCount !== 1) console.log(result);
	});
};

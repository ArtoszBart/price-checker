import { NextResponse } from 'next/server';

import Data from '@/models/Data';
import Item, { ItemNotification } from '@/models/Item';
import {
	getItems,
	getItemsNotifications,
} from '@/repository/postgres/itemRepository';
import { insertData } from '@/repository/postgres/dataRepository';
import { scrape } from '@/utils/scraping';
import { NotificationToSend, ScrapeNotification } from '@/models/Notification';
import { createEmailNotification, createMessage } from '@/utils/notifications';
import { sendEmail } from '@/repository/emailRepository';
import { updateNotificationsLastData } from '@/repository/postgres/notificationRepository';

export async function GET() {
	console.log('Started scraping');

	const items: Item[] = (await getItems()) as Item[];
	const newData: Data[] = [];
	const itemNotifications: ItemNotification[] = await getItemsNotifications();
	const emailNotifications: NotificationToSend[] = [];

	await Promise.all(
		items.map(async (item) => {
			// Scrape data
			const newItemData: Data = await scrape(item);
			if (newItemData.item.id === 7) newItemData.availability = true;

			// Create email notifications
			const itemNotification = itemNotifications.find(
				(itemNotifi: ItemNotification) =>
					itemNotifi.itemId === newItemData.item.id
			);

			if (itemNotification) {
				// notification exists
				itemNotification.notifications.forEach(
					(notification: ScrapeNotification) => {
						const notificationData = createEmailNotification(
							item,
							notification,
							newItemData
						);
						if (notificationData)
							emailNotifications.push(notificationData);
					}
				);
			}
			newData.push(newItemData);
		})
	);

	console.log(`Successfully scraped ${newData.length} items`);
	console.log(`${emailNotifications.length} notifications to send`);

	// Send emails
	emailNotifications.forEach((emailNotification) => {
		const message = createMessage(emailNotification);

		const emailData: Email = {
			to: emailNotification.email,
			subject: `${emailNotification.name}`,
			text: message,
			html: message,
		};
		sendEmail(emailData);
	});

	// Add last sended price to db
	updateNotificationsLastData(emailNotifications);

	// Add scraped data to db

	const { rowCount } = await insertData(newData);
	console.log(`Inserted ${rowCount} data rows`);

	if (rowCount !== newData.length) {
		console.log('+++++ An error has occured while inserting into db +++++');
	}

	return NextResponse.json({}, { status: 200 });
}

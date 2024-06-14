import Data from '@/models/Data';
import Item from '@/models/Item';
import { NotificationToSend, ScrapeNotification } from '@/models/Notification';

export const createEmailNotification = (
	item: Item,
	notification: ScrapeNotification,
	newItemData: Data
): NotificationToSend | null => {
	let isToSend = false;
	const notificationData: NotificationToSend = {
		id: notification.id as number,
		email: notification.email,
		name: item.name,
		price: null,
		quantity: null,
		availability: null,
	};

	const notifyPrice = notification.targetPrice !== null;
	if (notifyPrice && newItemData.price !== null) {
		const targetPrice = Number(notification.targetPrice);
		const currentPrice = Number(newItemData.price);
		const lastSendedPrice = notification.lastSendedPrice
			? Number(notification.lastSendedPrice)
			: null;

		if (currentPrice <= targetPrice && lastSendedPrice !== currentPrice) {
			console.log(lastSendedPrice !== currentPrice);

			notificationData.price = currentPrice;
			isToSend = true;
		}
	}

	const notifyQuantity = notification.targetQuantity !== null;
	if (notifyQuantity && newItemData.quantity !== null) {
		const targetQuantity = notification.targetQuantity;
		const currentQuantity = newItemData.quantity;
		const lastSendedQuantity = notification.lastSendedQuantity;

		if (
			targetQuantity <= currentQuantity &&
			lastSendedQuantity !== currentQuantity
		) {
			notificationData.quantity = currentQuantity;
			isToSend = true;
		}
	}

	const notifyAvailability = notification.targetAvailability !== null;
	const hasAvailability = newItemData.availability !== null;
	if (notifyAvailability && hasAvailability) {
		const targetAvailability = notification.targetAvailability;
		const currentAvailability = newItemData.availability;
		const lastSendedAvailability = notification.lastSendedAvailability;

		if (
			targetAvailability === currentAvailability &&
			currentAvailability !== lastSendedAvailability
		) {
			notificationData.availability = currentAvailability;
			isToSend = true;
		}
	}

	if (isToSend) return notificationData;
	return null;
};

export const createMessage = (emailNotification: NotificationToSend) => {
	let message = `Your item '${emailNotification.name}' `;
	let messageArray = [];

	if (emailNotification.price) {
		messageArray.push(
			`price has dropped down to: ${emailNotification.price}`
		);
	}
	if (emailNotification.quantity) {
		messageArray.push(`has ${emailNotification.quantity} units of product`);
	}
	if (emailNotification.availability) {
		messageArray.push(
			`is now ${
				emailNotification.availability
					? 'back in stock'
					: 'out of stock'
			}`
		);
	}

	message += messageArray.join(', ');
	return message.replace(/,(?=[^,]+$)/, ' and') + '.';
};

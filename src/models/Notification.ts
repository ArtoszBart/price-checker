import * as Yup from 'yup';

import Item, { ItemLastData } from './Item';
import User from './User';

export class Notification {
	id: number | null;
	targetPrice: number | null;
	lastPrice: number | null;
	targetQuantity: number | null;
	lastQuantity: number | null;
	targetAvailability: boolean | null;
	lastAvailability: boolean | null;
	item: Item | ItemLastData | number;
	user?: User | number;

	constructor(
		id: number | null,
		targetPrice: number | null,
		lastPrice: number | null,
		targetQuantity: number | null,
		lastQuantity: number | null,
		targetAvailability: boolean | null,
		lastAvailability: boolean | null,
		item: Item | ItemLastData,
		user?: User
	) {
		this.id = id;
		this.targetPrice = targetPrice;
		this.lastPrice = lastPrice;
		this.targetQuantity = targetQuantity;
		this.lastQuantity = lastQuantity;
		this.targetAvailability = targetAvailability;
		this.lastAvailability = lastAvailability;
		this.item = item;
		this.user = user;
	}
}
export interface ScrapeNotification {
	targetPrice: number;
	lastSendedPrice: number;
	targetQuantity: number;
	lastSendedQuantity: number;
	targetAvailability: boolean;
	lastSendedAvailability: boolean;
	email: string;
	id: number;
}

export interface NotificationToSend {
	id: number;
	email: string;
	name: string;
	price: number | null;
	quantity: number | null;
	availability: boolean | null;
}

export const NotificationSchema = Yup.object().shape({
	item: Yup.number().required('Item must be selected'),
	targetPrice: Yup.number()
		.typeError('Price can only be digits with dot (.) separator')
		.min(0, 'Price must be greater than 0')
		.optional(),
	targetQuantity: Yup.number()
		.integer('Quantity can only be digits')
		.typeError('Quantity can only be digits')
		.min(0, 'Quantity must be greater than 0')
		.optional(),
	targetAvailability: Yup.bool().typeError('Wrong value').optional(),
});

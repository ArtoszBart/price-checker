import Item, { ItemMin } from './Item';
import User from './User';

export class Notification {
	id: number | null;
	targetPrice: number | null;
	lastPrice: number | null;
	targetQuantity: number | null;
	lastQuantity: number | null;
	targetAvailability: boolean | null;
	lastAvailability: boolean | null;
	item: Item | ItemMin;
	user?: User;

	constructor(
		id: number | null,
		targetPrice: number | null,
		lastPrice: number | null,
		targetQuantity: number | null,
		lastQuantity: number | null,
		targetAvailability: boolean | null,
		lastAvailability: boolean | null,
		item: Item | ItemMin,
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

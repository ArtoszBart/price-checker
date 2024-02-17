import Item from './Item';

export default class Data {
	id: number | null;
	item: Item;
	date: Date;
	price: number | null;
	quantity: number | null;
	availability: boolean | null;

	constructor(
		id: number | null,
		item: Item,
		date: Date,
		price: number | null,
		quantity: number | null,
		availability: boolean | null
	) {
		this.id = id;
		this.item = item;
		this.date = date;
		this.price = price;
		this.quantity = quantity;
		this.availability = availability;
	}
}

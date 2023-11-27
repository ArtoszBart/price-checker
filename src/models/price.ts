import MinOptNumber from '@/utils/propertyDecorators';

export default class Price {
	@MinOptNumber(1)
	id: number | null;
	date: Date;
	price: number;
	vendor: string;
	link: string;

	constructor(
		id: number | null,
		date: Date,
		price: number,
		vendor: string,
		link: string
	) {
		this.id = id;
		this.date = date;
		this.price = price;
		this.vendor = vendor;
		this.link = link;
	}
}

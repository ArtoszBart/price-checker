import Vendor from './Vendor';

export default class Item {
	id: number | null;
	vendor: Vendor;
	link: string;
	name: string;

	constructor(id: number | null, vendor: Vendor, link: string, name: string) {
		this.id = id;
		this.vendor = vendor;
		this.link = link;
		this.name = name;
	}
}

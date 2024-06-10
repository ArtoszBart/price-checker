import * as Yup from 'yup';

import { DataMin } from './Data';
import Vendor from './Vendor';

export default class Item {
	id: number | null;
	vendor: Vendor | number;
	link: string;
	name: string;
	imageLink: string;

	constructor(
		id: number | null,
		vendor: Vendor,
		link: string,
		name: string,
		imageLink: string
	) {
		this.id = id;
		this.vendor = vendor;
		this.link = link;
		this.name = name;
		this.imageLink = imageLink;
	}
}

export interface ItemLastData {
	id: number;
	name: string;
	imageLink: string;
	lastData: DataMin;
}

export interface ItemMin {
	id: number;
	name: string;
}

export const ItemSchema = Yup.object().shape({
	vendor: Yup.number().required('Vendor must be selected'),
	name: Yup.string().max(50).required('Name cannot be empty'),
	link: Yup.string().required('Link cannot be empty'),
	imageLink: Yup.string().required('Image link cannot be empty'),
});

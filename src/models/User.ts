export default class User {
	id: number | null;
	name: string;
	email: string;
	imageURL: string;

	constructor(
		id: number | null,
		name: string,
		email: string,
		imageURL: string
	) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.imageURL = imageURL;
	}
}

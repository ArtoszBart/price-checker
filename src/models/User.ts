export default class User {
	id: number | null;
	firstName: string;
	email: string;

	constructor(id: number | null, firstName: string, email: string) {
		this.id = id;
		this.firstName = firstName;
		this.email = email;
	}
}

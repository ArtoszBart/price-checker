import { db } from '@vercel/postgres';
import User from '@/models/User';

export const getUser = async (email: string): Promise<User> => {
	const result = await db`SELECT * FROM account WHERE email = ${email}`;
	const user: User = new User(
		result.rows[0].id,
		result.rows[0].name,
		result.rows[0].email,
		result.rows[0].imageurl
	);

	return user;
};

export const insertUser = async (user: User): Promise<boolean> => {
	const result = await db`
		INSERT INTO account (name, email, imageURL) 
		VALUES (${user.name}, ${user.email}, ${user.imageURL})`;

	return result.rowCount === 1 ? true : false;
};

export const updateUser = async (user: User): Promise<boolean> => {
	const result = await db`
		UPDATE account 
		SET name = ${user.name}, imageURL = ${user.imageURL} 
		WHERE id = ${user.id}`;
	console.log(result);

	return result.rowCount === 1 ? true : false;
};

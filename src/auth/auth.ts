import { redirect } from 'next/navigation';
import { NextAuthOptions, Session, getServerSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/User';
import {
	getUser,
	insertUser,
	updateUser,
} from '@/repository/postgres/userRepository';

export interface ISession {
	id: number;
	name: string;
	email: string;
	imageURL: string;
}

export const authConfig: NextAuthOptions = {
	callbacks: {
		jwt: async ({ token, user }): Promise<JWT> => {
			if (user) {
				const dbUser: User = await getUser(token.email as string);
				token.user = dbUser;
			}
			return token;
		},
		session: async ({ session, token }): Promise<Session> => {
			if (token) {
				session.user = token.user as any;
			}

			return session;
		},
		signIn: async ({ user }): Promise<boolean> => {
			if (!user?.email) return false;
			const dbUser: User = await getUser(user.email);

			if (!dbUser) {
				const res: boolean = await insertUser(
					new User(
						null,
						user.name as string,
						user.email,
						user.image as string
					)
				);
				if (!res) return false;
			} else if (
				dbUser.imageURL !== user.image ||
				dbUser.name !== user.name
			) {
				const res: boolean = await updateUser({
					...dbUser,
					name: user.name as string,
					imageURL: user.image as string,
				});
				if (!res) return false;
			}

			return true;
		},
		// async redirect({ url, baseUrl }) {
		// 	return baseUrl;
		// },
	},
	providers: [
		// CredentialsProvider({
		// 	credentials: {
		// 		email: {
		// 			label: 'Email',
		// 			type: 'email',
		// 			placeholder: 'example@example.com',
		// 		},
		// 		password: { label: 'Password', type: 'password' },
		// 	},
		// 	async authorize(credentials): Promise<any> {
		// 		if (!credentials || !credentials.email || !credentials.password)
		// 			return null;

		// 		const dbUser = {
		// 			email: 'aaa',
		// 			password: 'aaa',
		// 			createdAt: new Date(),
		// 			id: 1,
		// 		};

		// 		if (dbUser && dbUser.password === credentials.password) {
		// 			const {
		// 				password,
		// 				createdAt,
		// 				id,
		// 				...dbUserWithoutPassword
		// 			} = dbUser;
		// 			return dbUserWithoutPassword as User;
		// 		}

		// 		return null;
		// 	},
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
		}),
	],
};

export async function loginIsRequiredServer(): Promise<ISession> {
	const session = await getServerSession(authConfig);

	if (!session) return redirect('/');
	return session.user as ISession;
}

// export async function loginIsRequiredClient() {
// 	if (typeof window !== 'undefined') {
// 		const session = useSession();
// 		const router = useRouter();
// 		console.log(session);
// 		if (session.status === 'unauthenticated') {
// 			router.push('/');
// 		}
// 	}
// }

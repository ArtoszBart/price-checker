import { NextAuthOptions, User, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export const authConfig: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials): Promise<User | null> {
				if (!credentials || !credentials.email || !credentials.password)
					return null;

				const dbUser = {
					email: 'aaa',
					password: 'aaa',
					createdAt: new Date(),
					id: 1,
				};

				if (dbUser && dbUser.password === credentials.password) {
					const {
						password,
						createdAt,
						id,
						...dbUserWithoutPassword
					} = dbUser;
					return dbUserWithoutPassword as User;
				}

				return null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
		}),
	],
};

export async function loginIsRequiredServer() {
	const session = await getServerSession(authConfig);
	if (!session) return redirect('/');
}

export async function loginIsRequiredClient() {
	if (typeof window !== 'undefined') {
		const session = useSession();
		const router = useRouter();
		if (!session) router.push('/');
	}
}

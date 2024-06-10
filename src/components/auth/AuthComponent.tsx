import '@/styles/components/linkButton.scss';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authConfig, ISession } from '@/auth/auth';
import LoggedInComponent from '@/components/auth/LoggedInComponent';

export default async function AuthComponent() {
	const session = await getServerSession(authConfig);
	const user = session?.user as ISession;

	return (
		<div className='auth-container'>
			{session ? (
				<LoggedInComponent
					image={user.imageURL || ''}
					name={user.name || ''}
				/>
			) : (
				<a
					className='button'
					href='/api/auth/signin'
					rel='noopener noreferrer'
				>
					Log In
				</a>
			)}
		</div>
	);
}

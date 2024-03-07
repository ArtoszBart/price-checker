import '@/styles/components/linkButton.scss';
import React, { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth/auth';
import LogoutButton from '@/components/auth/LoggedInComponent';
import Image from 'next/image';
import LoggedInComponent from '@/components/auth/LoggedInComponent';

export default async function AuthComponent() {
	const session = await getServerSession(authConfig);

	return (
		<div className='auth-container'>
			{session ? (
				<LoggedInComponent
					image={session.user?.image || ''}
					name={session.user?.name || ''}
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

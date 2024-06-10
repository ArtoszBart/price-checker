'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function LoggedInComponent({
	image,
	name,
}: {
	image: string;
	name: string;
}) {
	const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

	const closeNav = () => setIsNavOpen(false);

	return (
		<>
			Hi, {name.split('(')[0].trim()}
			<Image
				src={image}
				width={50}
				height={50}
				alt='Profile picture'
				onClick={() => setIsNavOpen((prev) => !prev)}
			/>
			<nav onClick={closeNav} className={isNavOpen ? 'open' : ''}>
				<a href='/dashboard'>Dashboard</a>
				<span className='link logout' onClick={() => signOut()}>
					Log Out
				</span>
			</nav>
		</>
	);
}

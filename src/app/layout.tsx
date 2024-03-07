import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/main.scss';
import AuthComponent from '@/components/auth/AuthComponent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
	title: 'Price tracker',
	description: 'Developed by Bartosz Art',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<header>
					<a href='/'>
						<div className='logo'>PRICE CHECKER</div>
					</a>
					<AuthComponent />
				</header>
				{children}
				<footer>
					<p>Developed by Bartosz Art</p>
				</footer>
			</body>
		</html>
	);
}

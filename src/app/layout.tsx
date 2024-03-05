import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/main.scss';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
	title: 'Price tracker',
	description: 'Developed by Bartosz Art',
};

export default function RootLayout({
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
					<div>
						<a href='#' target='_blank' rel='noopener noreferrer'>
							Log In
						</a>
					</div>
				</header>
				{children}
				<footer>
					<p>Developed by Bartosz Art</p>
				</footer>
			</body>
		</html>
	);
}

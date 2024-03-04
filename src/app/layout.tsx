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
					<div className='logo'>PRICE CHECKER</div>
					<div>
						<a href='#' target='_blank' rel='noopener noreferrer'>
							By Bartosz Art
						</a>
					</div>
				</header>
				{children}
			</body>
		</html>
	);
}

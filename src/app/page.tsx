import '../styles/pages/mainPage.scss';
import Chart from '@/components/Chart';
import pricesData from '../data/prices';

export default function Home(): JSX.Element {
	return (
		<main className='main'>
			<div className='description'>
				<div></div>
				<div>
					<a href='#' target='_blank' rel='noopener noreferrer'>
						By Bartosz Art
					</a>
				</div>
			</div>
			<Chart data={pricesData} />

			<div className='grid'>
				<a
					href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='card'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2>
						Docs <span>-&gt;</span>
					</h2>
					<p>
						Find in-depth information about Next.js features and
						API.
					</p>
				</a>

				<a
					href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='card'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2>
						Learn <span>-&gt;</span>
					</h2>
					<p>
						Learn about Next.js in an interactive course
						with&nbsp;quizzes!
					</p>
				</a>

				<a
					href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='card'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2>
						Templates <span>-&gt;</span>
					</h2>
					<p>Explore starter templates for Next.js.</p>
				</a>

				<a
					href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='card'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2>
						Deploy <span>-&gt;</span>
					</h2>
					<p>
						Instantly deploy your Next.js site to a shareable URL
						with Vercel.
					</p>
				</a>
			</div>
		</main>
	);
}

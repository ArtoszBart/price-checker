import CircleLoader from 'react-spinners/PulseLoader';

export default function Loader() {
	return (
		<main>
			<article className='loading'>
				<CircleLoader color='#000' />
			</article>
		</main>
	);
}

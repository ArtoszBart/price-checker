import '../styles/pages/mainPage.scss';
import Item from '@/models/Item';
import { getItems } from '@/repository/postgres/itemRepository';

export default async function Home() {
	const items: Item[] = await getItems();

	return (
		<main className='main'>
			<div className='grid'>
				{items.map((item, idx) => (
					<a
						href={`/chart?itemId=${item.id}&itemName=${item.name}`}
						className='card'
						rel='noopener noreferrer'
						key={idx}
					>
						<h2>
							{item.name} <span>-&gt;</span>
						</h2>
						<p>Check the "{item.name}" price history on chart.</p>
					</a>
				))}
			</div>
		</main>
	);
}

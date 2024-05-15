import '../styles/pages/mainPage.scss';
import Item from '@/models/Item';
import { getItems } from '@/repository/postgres/itemRepository';
import Image from 'next/image';

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
						<h2>{item.name}</h2>
						<Image
							src={item.imageLink}
							alt={''}
							width={120}
							height={120}
							quality={25}
						></Image>
						<p>
							Check the &quot;{item.name}&quot; price history on
							chart.
						</p>
					</a>
				))}
			</div>
		</main>
	);
}

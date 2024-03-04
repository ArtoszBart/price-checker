// 'use client';

import Chart from '@/components/Chart/Chart';
import { getItemData } from '@/repository/postgres/dataRepository';

export default async function ChartPage({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const { itemId, itemName } = searchParams ?? { itemId: '', itemName: '' };
	const itemData = await getItemData(Number(itemId));

	return (
		<main className='main'>
			<h1>{itemName}</h1>
			<Chart itemData={itemData} />
		</main>
	);
}

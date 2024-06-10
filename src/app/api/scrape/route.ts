import { NextResponse } from 'next/server';

import Data from '@/models/Data';
import Item from '@/models/Item';
import { getItems } from '@/repository/postgres/itemRepository';
import { insertData } from '@/repository/postgres/dataRepository';
import { scrape } from '@/utils/scraping';

export async function GET(req: any) {
	const { searchParams } = new URL(req.url);
	console.log('Started scraping');

	const items: Item[] = (await getItems()) as Item[];
	const newData: Data[] = [];

	console.log('============================================================');
	console.log(`Scraping ${items.length} items:`);
	items.forEach((i) => console.log(i.id));
	console.log('============================================================');

	await Promise.all(
		items.map(async (item) => {
			newData.push(await scrape(item));
		})
	);

	console.log(`Successfully scraped ${newData.length} items`);

	const { rowCount } = await insertData(newData);
	console.log(`Inserted ${rowCount} data rows`);

	if (rowCount !== newData.length) {
		console.log('+++++ An error has occured while inserting into db +++++');
	}

	return NextResponse.json({ newData }, { status: 200 });
}

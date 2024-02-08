import Data from '@/models/Data';
import Item from '@/models/Item';
import { getItems } from '@/repository/postgres/itemRepository';
import { insertData } from '@/repository/postgres/dataRepository';
import { scrape } from '@/utils/scraping';
import { NextResponse } from 'next/server';
import { log } from 'console';

export async function GET() {
	const items: Item[] = (await getItems()) as Item[];
	const newData: Data[] = [];

	await Promise.all(
		items.map(async (item) => {
			newData.push(await scrape(item));
		})
	);

	const { rowCount } = await insertData(newData);

	if (rowCount !== 1) {
		console.log('+++++ An error has occured while inserting into db +++++');
	}

	return NextResponse.json({ newData }, { status: 200 });
}

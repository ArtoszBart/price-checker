import Data from '@/models/Data';
import Item from '@/models/Item';
import axios from 'axios';
import * as cheerio from 'cheerio';

export function scrape(item: Item): Promise<Data> {
	switch (item.vendor.id) {
		case 1:
			return scrapeMorele(item);
		default:
			throw new Error('An error has occured while scraping website');
	}
}

async function scrapeMorele(item: Item): Promise<Data> {
	try {
		const response = await axios.get(item.link);
		const $: cheerio.CheerioAPI = cheerio.load(response.data);
		let price: number | null = null;

		$('#product_price_brutto').each(function () {
			const asd: cheerio.Cheerio<cheerio.Element> = $(this);
			const arr: string[] = asd.text().trim().split(',');

			price = Number(arr[0].replace(' ', '').replace('zł', ''));
		});

		const data: Data = new Data(null, item, new Date(), price, null, null);

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

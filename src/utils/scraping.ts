import axios from 'axios';
import * as cheerio from 'cheerio';

import Data from '@/models/Data';
import Item from '@/models/Item';
import Vendor from '@/models/Vendor';

export function scrape(item: Item): Promise<Data> {
	switch ((item.vendor as Vendor).id) {
		case 1:
			return scrapeMorele(item);
		case 2:
			return scrapeAmazon(item);
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
			const element = $(this);
			const textArray: string[] = element.text().trim().split(',');

			price = Number(textArray[0].replace(' ', '').replace('zł', ''));
		});

		const data: Data = new Data(null, item, new Date(), price, null, null);

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function scrapeAmazon(item: Item): Promise<Data> {
	try {
		const response1 = await axios.get(item.link);
		let $ = cheerio.load(response1.data);
		let price: number | null = null;

		$('#corePrice_feature_div .a-offscreen').each(function () {
			const element = $(this);
			const textArray: string[] = element.text().trim().split(',');
			price = Number(textArray[0].replace(' ', ''));
		});

		if (price) {
			$('span[data-csa-c-delivery-price]').each(function () {
				const element = $(this);
				const textArray: string[] = element.text().trim().split(',');
				let shipping: number = Number(textArray[0].replace(' ', ''));
				if (isNaN(shipping)) shipping = 0;
				if (price) price += shipping;
			});

			let availability: number | null = 0;

			$('#availability').each(function () {
				const element = $(this);
				const textArray: string[] = element.text().trim().split(' ');
				if (isNaN(Number(textArray[2]))) {
					availability = 10;
				} else {
					availability = Number(textArray[2]);
				}
			});

			return new Data(null, item, new Date(), price, availability, true);
		}

		// no main price
		const linkArray: string[] = item.link.split('/');

		var response = await axios.get(
			`https://www.amazon.pl/gp/product/ajax/ref=dp_aod_unknown_mbc?asin=${linkArray[4]}&m=&qid=1707579377&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-4&pc=dp&experienceId=aodAjaxMain`,
			{ headers: { 'User-Agent': 'axios 0.21.1' } }
		);
		$ = cheerio.load(response.data);

		const prices: number[] = [];
		$('#aod-offer .a-offscreen').each(function () {
			const element = $(this);
			const textArray: string[] = element.text().trim().split(',');
			prices.push(Number(textArray[0].replace(' ', '')));
		});

		if (prices.length < 1)
			return new Data(null, item, new Date(), null, null, false);

		const shippings: number[] = [];
		$('#aod-offer span[data-csa-c-delivery-price]').each(function () {
			const element: cheerio.Cheerio<cheerio.Element> = $(this);
			const textArray: string[] = element.text().trim().split(',');
			shippings.push(Number(textArray[0].replace(' ', '')));
		});

		const sum: number[] = shippings.map((val, idx) => {
			if (isNaN(val)) return prices[idx];
			return val + prices[idx];
		});
		const availability: boolean = sum.length > 0;

		const data: Data = new Data(
			null,
			item,
			new Date(),
			Math.min(...sum),
			null,
			availability
		);

		return data;
	} catch (error) {
		console.log('error');
		throw error;
	}
}

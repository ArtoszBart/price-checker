import Price from '@/models/price';
import { createPrice } from '@/repository/postgres/priceRepository';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
	const now: Date = new Date();
	const url: string =
		'https://www.morele.net/karta-graficzna-msi-geforce-rtx-4080-gaming-x-trio-16gb-gddr6x-12286252/';
	let priceObj: Price | null = null;

	try {
		await axios
			.get(url)
			.then((response) => {
				const html = response.data;
				const $ = cheerio.load(html);
				$('#product_price_brutto', html).each(function () {
					const asd = $(this);
					const price: number = Number(
						asd.text().trim().replace(' ', '').replace('zł', '')
					);
					priceObj = new Price(null, now, price, 'Morele', url);
				});
			})
			.catch((err) => {
				throw new Error(err);
			});

		if (priceObj === null)
			throw new Error('An error has occured while scraping website');

		const { rowCount } = await createPrice(priceObj);

		if (rowCount !== 1) {
			throw new Error('An error has occured while inserting into db');
		}

		return NextResponse.json(priceObj, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({}, { status: 500 });
	}
}

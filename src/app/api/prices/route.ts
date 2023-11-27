import { NextResponse } from 'next/server';
import Price from '@/models/price';
import { getPrices } from '@/repository/postgres/priceRepository';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const result = await getPrices();
		const prices: Price[] = result as Price[];

		return NextResponse.json(prices, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({}, { status: 500 });
	}
}

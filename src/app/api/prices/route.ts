import { NextResponse } from 'next/server';
import Data from '@/models/Data';
import { getPrices } from '@/repository/postgres/dataRepository';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const result = await getPrices();
		const data: Data[] = result as Data[];

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({}, { status: 500 });
	}
}

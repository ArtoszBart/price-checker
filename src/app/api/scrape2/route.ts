import Data from '@/models/Data';
import { getData } from '@/repository/postgres/dataRepository';
import { NextResponse } from 'next/server';

export async function GET(req: any) {
	console.log(`Test get`);
	const { searchParams } = new URL(req.url);
	const itemId: string | null = searchParams.get('itemId');

	if (!itemId) return NextResponse.json({}, { status: 400 });

	return NextResponse.json({ asd: 'ok' }, { status: 200 });
}

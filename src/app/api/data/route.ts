import Data from '@/models/Data';
import { getItemData } from '@/repository/postgres/dataRepository';
import { NextResponse } from 'next/server';

export async function GET(req: any) {
	const { searchParams } = new URL(req.url);
	const itemId: string | null = searchParams.get('itemId');

	console.log(`Get item id: ${itemId}`);

	if (!itemId) return NextResponse.json({}, { status: 400 });

	const items: Data[] = await getItemData(Number(itemId));

	return NextResponse.json({ items }, { status: 200 });
}

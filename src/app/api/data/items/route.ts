import Item, { ItemMin } from '@/models/Item';
import { getItemsMin, createItem } from '@/repository/postgres/itemRepository';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(): Promise<NextResponse> {
	const items: ItemMin[] = await getItemsMin();

	if (items) return NextResponse.json({ items }, { status: 200 });
	return NextResponse.json({}, { status: 500 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	const item: Item = await req.json();

	const result: boolean = await createItem(item);

	if (result) return NextResponse.json({}, { status: 201 });
	return NextResponse.json({}, { status: 500 });
}

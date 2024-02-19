import { NextResponse } from 'next/server';

export async function GET(req: any) {
	console.log(`Test get`);
	const { searchParams } = new URL(req.url);
	const itemId: string | null = searchParams.get('itemId');

	return NextResponse.json({ asd: 'ok' }, { status: 200 });
}

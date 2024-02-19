import { NextResponse } from 'next/server';

export async function GET(req: any) {
	console.log(`Test get`);
	const { searchParams } = new URL(req.url);

	return NextResponse.json({ asd: 'ok' }, { status: 200 });
}

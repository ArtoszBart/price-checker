import { NextResponse } from 'next/server';

export async function GET(req: any) {
	console.log(`Test get`);

	return NextResponse.json({ asd: 'ok' }, { status: 200 });
}

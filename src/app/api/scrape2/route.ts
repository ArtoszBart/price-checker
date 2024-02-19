import { NextResponse } from 'next/server';

export async function GET(req: any) {
	console.log(`Start test`);

	return NextResponse.json({}, { status: 200 });
}

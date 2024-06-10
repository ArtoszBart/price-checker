import Vendor from '@/models/Vendor';
import { getVendors } from '@/repository/postgres/vendorRepository';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
	const vendors: Vendor[] = await getVendors();

	if (vendors) return NextResponse.json({ vendors }, { status: 200 });
	return NextResponse.json({}, { status: 500 });
}

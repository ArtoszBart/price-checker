import { NextResponse } from 'next/server';

import Vendor from '@/models/Vendor';
import { getVendors } from '@/repository/postgres/vendorRepository';

export async function GET(): Promise<NextResponse> {
	const vendors: Vendor[] = await getVendors();

	if (vendors) return NextResponse.json({ vendors }, { status: 200 });
	return NextResponse.json({}, { status: 500 });
}

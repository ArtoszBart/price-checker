import { Notification } from '@/models/Notification';
import { createNotification } from '@/repository/postgres/notificationRepository';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
	const notification: Notification = await req.json();

	const result: boolean = await createNotification(notification);

	if (result) return NextResponse.json({}, { status: 201 });
	return NextResponse.json({}, { status: 500 });
}

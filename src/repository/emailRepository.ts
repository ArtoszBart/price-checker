'use server';

import { NotificationToSend } from '@/models/Notification';
import Nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;
// emailData: Email
const emailData: Email = {
	to: EMAIL_USER as string,
	subject: 'subject',
	text: 'text',
	html: 'html',
};
export async function sendEmail(emailData: Email) {
	const transporter = Nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASSWORD,
		},
		tls: { rejectUnauthorized: false },
	});
	try {
		await transporter.sendMail({
			from: `Price Checker <${EMAIL_USER}>`,
			...emailData,
		});
	} catch (error) {
		console.log(error);
	}
}

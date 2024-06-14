'use server';

import Nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

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

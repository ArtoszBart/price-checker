class Email {
	to: string;
	subject: string;
	text: string;
	html: string;

	constructor(to: string, subject: string, text: string, html: string) {
		this.to = to;
		this.subject = subject;
		this.text = text;
		this.html = html;
	}
}

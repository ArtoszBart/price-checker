/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.google.com',
			},
			{
				protocol: 'https',
				hostname: 'www.bequiet.com',
			},
			{
				protocol: 'https',
				hostname: 'm.media-amazon.com',
			},
			{
				protocol: 'https',
				hostname: 'images.morele.net',
			},
		],
	},
};

module.exports = nextConfig;

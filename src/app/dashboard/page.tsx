import { loginIsRequiredServer } from '@/auth/auth';

export default async function DashboardPage() {
	await loginIsRequiredServer();
	return <main className='main'>Dashboard</main>;
}

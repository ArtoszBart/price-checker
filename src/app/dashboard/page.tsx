import '@/styles/pages/dashboard.scss';
import { loginIsRequiredServer } from '@/auth/auth';
import { Notification } from '@/models/Notification';
import { getUserNotifications } from '@/repository/postgres/notificationRepository';
import NotificationCard from '@/components/NotificationCard';
import User from '@/models/User';

export default async function DashboardPage() {
	const user: User = await loginIsRequiredServer();

	const notifications: Notification[] = await getUserNotifications(
		user.id as number
	);

	return (
		<main className='main'>
			<h1>Your notifications</h1>
			<section>
				{notifications.map((notification, index) => (
					<NotificationCard notification={notification} key={index} />
				))}
			</section>
			<div className='dashboard-actions'>
				<a
					className='button'
					href='/dashboard/new-item'
					rel='noopener noreferrer'
				>
					New Item
				</a>
				<a
					className='button'
					href='/dashboard/new-notification'
					rel='noopener noreferrer'
				>
					New Notification
				</a>
			</div>
		</main>
	);
}

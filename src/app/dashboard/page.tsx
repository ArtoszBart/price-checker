import '@/styles/components/notificationCard.scss';
import { loginIsRequiredServer } from '@/auth/auth';
import { Notification } from '@/models/Notification';
import { getUserNotifications } from '@/repository/postgres/notificationRepository';
import NotificationCard from '@/components/NotificationCard';

export default async function DashboardPage() {
	await loginIsRequiredServer();

	const notifications: Notification[] = await getUserNotifications(1);

	return (
		<main className='main'>
			<h1>Your notifications</h1>
			<section>
				{notifications.map((notification, index) => (
					<NotificationCard notification={notification} key={index} />
				))}
			</section>
			<a className='button' href='' rel='noopener noreferrer'>
				Add new
			</a>
		</main>
	);
}

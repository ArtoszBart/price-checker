import '@/styles/components/notificationCard.scss';
import Item, { ItemLastData } from '@/models/Item';
import { Notification } from '@/models/Notification';
import Image from 'next/image';

export default function NotificationCard({
	notification,
}: {
	notification: Notification;
}) {
	function renderAvailability(
		availability: boolean | null
	): string | React.ReactNode {
		switch (availability) {
			case true:
				return <>&#10003;</>;
			case false:
				return <>&#10005;</>;
			default:
				return '-';
		}
	}

	return (
		<div className='notification-card'>
			<div className='notification-card-identity'>
				<Image
					src={(notification.item as Item).imageLink}
					alt={''}
					width={80}
					height={80}
					quality={25}
				/>
				<h2>{(notification.item as Item).name}</h2>
			</div>
			<table>
				<thead>
					<tr>
						<th></th>
						<th scope='col'>Price</th>
						<th scope='col'>Quantity</th>
						<th scope='col'>Availability</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope='row'>Target</th>
						<td>{notification.targetPrice || '-'}</td>
						<td>{notification.targetQuantity || '-'}</td>
						<td>
							{renderAvailability(
								notification.targetAvailability
							)}
						</td>
					</tr>
					<tr>
						<th scope='row'>Current</th>
						<td>
							{(notification.item as ItemLastData).lastData
								.price || '-'}
						</td>
						<td>
							{(notification.item as ItemLastData).lastData
								.quantity || '-'}
						</td>
						<td>
							{renderAvailability(
								(notification.item as ItemLastData).lastData
									.availability
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

import { ItemMin } from '@/models/Item';
import { Notification } from '@/models/Notification';
import Image from 'next/image';

export default function NotificationCard({
	notification,
}: {
	notification: Notification;
}) {
	function renderAvailability(availability: boolean | null) {
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
					src={notification.item.imageLink}
					alt={''}
					width={80}
					height={80}
					quality={25}
				/>
				<h2>{notification.item.name}</h2>
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
							{(notification.item as ItemMin).lastData.price ||
								'-'}
						</td>
						<td>
							{(notification.item as ItemMin).lastData.quantity ||
								'-'}
						</td>
						<td>
							{renderAvailability(
								(notification.item as ItemMin).lastData
									.availability
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

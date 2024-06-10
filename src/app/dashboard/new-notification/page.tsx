'use client';

import { ISession } from '@/auth/auth';
import Loader from '@/components/Loader';
import ComboBox, { IComboBoxOptions } from '@/components/forms/ComboBox';
import Form from '@/components/forms/Form';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';
import { ItemMin } from '@/models/Item';
import { Notification, NotificationSchema } from '@/models/Notification';
import { getBoolValue } from '@/utils/formatters';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface INotification {
	item: number | undefined;
	targetPrice: number | '';
	targetQuantity: number | '';
	targetAvailability: boolean | '';
}

const initialValues: INotification = {
	item: undefined,
	targetPrice: '',
	targetQuantity: '',
	targetAvailability: '',
};

export default function NewNotificationPage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const user = session?.user as ISession;

	const [options, setOptions] = useState<IComboBoxOptions[]>();

	useEffect(() => {
		axios.get('/api/data/items').then((res) => {
			const options = res.data.items.map((item: ItemMin) => {
				return { value: item.id, displayName: item.name };
			});
			setOptions(options);
		});
	}, []);

	if (status === 'loading') {
		return (
			<main>
				<Loader />
			</main>
		);
	}

	if (status === 'unauthenticated') {
		return (
			<main>
				<p>Access Denied</p>
			</main>
		);
	}

	return (
		<main>
			<h1>Add new notification</h1>

			<Form
				initialValues={initialValues}
				onSubmit={(values: any, actions: any) => {
					const notification: Notification = {
						...values,
						item: Number(values.item),
						targetPrice:
							values.targetPrice === ''
								? null
								: Number(values.targetPrice),
						targetQuantity:
							values.targetQuantity === ''
								? null
								: Number(values.targetQuantity),
						targetAvailability: getBoolValue(
							values.targetAvailability
						),
						user: user.id,
					};

					axios
						.post('/api/data/notifications', notification)
						.then((res) => {
							actions.setSubmitting(false);
							if (res.status === 201) router.push('/dashboard');
							else console.log('error');
						})
						.catch((err) => console.log(err));
				}}
				validationSchema={NotificationSchema}
			>
				<ComboBox<INotification>
					inputName='item'
					displayName='Item:'
					options={options}
					tabIndex={1}
					required
				/>
				<FormField<INotification>
					inputName='targetPrice'
					displayName='Target price: (optional)'
					inputType='text'
					tabIndex={2}
					setServerError
				/>
				<FormField<INotification>
					inputName='targetQuantity'
					displayName='Target quantity: (optional)'
					inputType='text'
					tabIndex={3}
					setServerError
				/>
				<ComboBox<INotification>
					inputName='targetAvailability'
					displayName='Target availability: (optional)'
					options={[
						{ value: 'true', displayName: 'Available' },
						{ value: 'false', displayName: 'Not available' },
					]}
					tabIndex={4}
				/>
				<SubmitButton />
			</Form>
		</main>
	);
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { FormikProps, FormikValues } from 'formik';

import '@/styles/pages/newItem.scss';
import ComboBox, { IComboBoxOptions } from '@/components/forms/ComboBox';
import Form from '@/components/forms/Form';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';
import Item, { ItemMin } from '@/models/Item';
import { ItemSchema } from '@/models/Item';
import Vendor from '@/models/Vendor';
import placeholderImage from '@/assets/images/placeholder.png';
import Loader from '@/components/Loader';

interface IItem {
	name: string;
	link: string;
	imageLink: string;
	vendor: number | undefined;
}

const initialValues: IItem = {
	name: '',
	link: '',
	imageLink: '',
	vendor: undefined,
};

export default function NewItemPage() {
	const router = useRouter();
	const { status } = useSession();

	const [options, setOptions] = useState<IComboBoxOptions[]>();
	const [imagePreview, setImagePreview] = useState<string | StaticImageData>(
		placeholderImage
	);
	const formRef = useRef<FormikProps<FormikValues>>();

	useEffect(() => {
		axios.get('/api/data/vendors').then((res) => {
			const options = res.data.vendors.map((item: Vendor) => {
				return { value: item.id, displayName: item.name };
			});
			setOptions(options);
		});
	}, []);

	const previewImage = (e: any) => {
		e.preventDefault();
		setImagePreview(formRef.current?.values.imageLink);
	};

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
			<h1>Add new item</h1>

			<Form
				initialValues={initialValues}
				onSubmit={(values: Item, actions: any) => {
					const item: Item = {
						...values,
						vendor: Number(values.vendor),
					};

					axios
						.post('/api/data/items', item)
						.then((res) => {
							actions.setSubmitting(false);
							if (res.status === 201) router.push('/');
							else console.log('error');
						})
						.catch((err) => console.log(err));
				}}
				validationSchema={ItemSchema}
				innerRef={(f: any) => (formRef.current = f)}
			>
				<ComboBox<IItem>
					inputName='vendor'
					displayName='Vendor:'
					options={options}
					tabIndex={1}
					required
				/>
				<FormField<IItem>
					inputName='name'
					displayName='Name:'
					inputType='text'
					tabIndex={2}
					setServerError
				/>
				<FormField<IItem>
					inputName='link'
					displayName='Link:'
					inputType='text'
					tabIndex={3}
					setServerError
				/>
				<FormField<IItem>
					inputName='imageLink'
					displayName='Image link:'
					inputType='text'
					tabIndex={4}
					setServerError
				/>
				<button className='button' onClick={previewImage}>
					Preview Image
				</button>
				<div className='form-image-preview'>
					<Image
						src={imagePreview}
						alt={'item image'}
						fill
						sizes='100%'
						quality={25}
						onError={() => setImagePreview(placeholderImage)}
						priority
					></Image>
				</div>
				<SubmitButton />
			</Form>
		</main>
	);
}

'use client';

import { Ref } from 'react';
import { Form, Formik, FormikProps } from 'formik';

import '@/styles/components/forms.scss';

interface IForm {
	initialValues: Object;
	onSubmit: Function;
	validationSchema: Object;
	children: React.ReactNode;
	innerRef?: Ref<FormikProps<Object>>;
}

export default function MyForm({
	initialValues,
	onSubmit,
	validationSchema,
	children,
	innerRef,
}: IForm) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => onSubmit(values, actions)}
			validationSchema={validationSchema}
			innerRef={innerRef}
		>
			<Form noValidate>{children}</Form>
		</Formik>
	);
}

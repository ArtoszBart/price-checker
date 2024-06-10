'use client';

import { Field, useFormikContext } from 'formik';

interface IFormField {
	inputName: string;
	inputType: string;
	displayName: string;
	tabIndex: number;
	setServerError: any;
}

export default function FormField<T>({
	inputName,
	inputType,
	displayName,
	tabIndex,
	setServerError,
}: IFormField) {
	const { errors, touched } = useFormikContext<T>();

	const error: any = errors[inputName as keyof T];
	const isTouched: any = touched[inputName as keyof T];

	return (
		<div className='formField'>
			<label htmlFor={inputName}>{displayName}</label>
			<Field
				type={inputType}
				tabIndex={tabIndex}
				name={inputName}
				id={inputName}
			/>
			{isTouched && error && <span className='error-text'>{error}</span>}
		</div>
	);
}

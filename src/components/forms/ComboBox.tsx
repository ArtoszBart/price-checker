import { Field, useFormikContext } from 'formik';

interface IComboBox {
	inputName: string;
	displayName: string;
	tabIndex: number;
	options: IComboBoxOptions[] | undefined;
	required?: boolean;
}

export interface IComboBoxOptions {
	value: string | number;
	displayName: string;
}

export default function FormikComboBox<T>({
	inputName,
	displayName,
	tabIndex,
	options,
	required,
}: IComboBox) {
	const { errors, touched } = useFormikContext<T>();

	const error: any = errors[inputName as keyof T];
	const isTouched: any = touched[inputName as keyof T];

	return (
		<div className='formField'>
			<label htmlFor={inputName}>{displayName}</label>
			<Field
				as='select'
				className={error && 'error-input'}
				name={inputName}
				id={inputName}
				tabIndex={tabIndex}
				disabled={!options ? true : false}
			>
				{options ? (
					<>
						<option hidden={required} value={''}>
							-
						</option>
						{options.map((option, index) => (
							<option key={index} value={option.value}>
								{option.displayName}
							</option>
						))}
					</>
				) : (
					<>
						<option hidden={required}>Loading...</option>
					</>
				)}
			</Field>
			{isTouched && error && <span className='error-text'>{error}</span>}
		</div>
	);
}

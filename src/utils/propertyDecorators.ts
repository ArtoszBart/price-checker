export default function MinOptNumber(minValue: number) {
	return (target: any, propertyName: string) => {
		let value: number | null;
		const descriptor: PropertyDescriptor = {
			get() {
				return value;
			},
			set(newValue: number | null) {
				if (newValue && newValue < minValue)
					throw new Error(
						`${propertyName} must be more than ${minValue}`
					);
				value = newValue;
			},
		};

		Object.defineProperty(target, propertyName, descriptor);
	};
}

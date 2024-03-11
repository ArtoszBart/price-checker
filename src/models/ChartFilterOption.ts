export default class ChartFilterOption {
	value: number;
	label: string;
	filter: Function;

	constructor(value: number, label: string, filter: Function) {
		this.value = value;
		this.label = label;
		this.filter = filter;
	}
}

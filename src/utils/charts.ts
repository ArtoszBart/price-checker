import { ChartData } from 'chart.js';
import Data from '@/models/Data';
import { getDateTimeString } from '@/utils/formatters';

export function preparePriceChartData(
	itemName: string,
	data: Data[]
): ChartData<'line'> {
	return {
		labels: data.map((obj) => getDateTimeString(new Date(obj.date))),
		datasets: [
			{
				label: itemName,
				data: data.map((obj) => obj.price),
			},
		],
	};
}

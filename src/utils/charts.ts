import { ChartData } from 'chart.js';
import Data from '@/models/Data';
import { getDateTimeString } from '@/utils/formatters';

export function preparePriceChartData(itemData: Data[]): ChartData<'line'> {
	return {
		labels: itemData.map((obj) => getDateTimeString(new Date(obj.date))),
		datasets: [
			{
				label: 'Price',
				data: itemData.map((obj) => obj.price),
				yAxisID: 'y',
			},
			{
				label: 'Quantity',
				data: itemData.map((obj) => obj.quantity),
				yAxisID: 'y1',
			},
		],
	};
}

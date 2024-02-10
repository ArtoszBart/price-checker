import { ChartData } from 'chart.js';
import Data from '@/models/Data';
import { getDateTimeString } from '@/utils/formatters';

export function preparePriceChartData(
	itemData: [string, Data[]]
): ChartData<'line'> {
	return {
		labels: itemData[1].map((obj) => getDateTimeString(new Date(obj.date))),
		datasets: [
			{
				label: itemData[0],
				data: itemData[1].map((obj) => obj.price),
			},
		],
	};
}

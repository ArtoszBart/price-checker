'use client';

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import '@/styles/components/charts.scss';
import Item from '@/models/Item';
import { preparePriceChartData } from '@/utils/charts';
import useChart from './useChart';

export default function LineChart({ items }: { items: Item[] }): JSX.Element {
	const { selectedItemData, handleChange } = useChart(items);

	const chartOptions = {
		aspectRatio: 1 | 2,
		maintainAspectRatio: true,
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		scales: {
			y1: {
				position: 'right' as const,
				ticks: {
					stepSize: 10,
				},
				max: 10,
				min: 0,
			},
		},
	};

	return (
		<>
			<select onChange={(e) => handleChange(e)}>
				{items.map((item, idx) => (
					<option key={idx} value={item.id as number}>
						{item.name}
					</option>
				))}
			</select>
			{selectedItemData && (
				<div className='chart-wrapper'>
					<Line
						data={preparePriceChartData(selectedItemData[1])}
						options={chartOptions}
					/>
				</div>
			)}
		</>
	);
}

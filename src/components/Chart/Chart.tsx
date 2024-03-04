'use client';

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import '@/styles/components/charts.scss';
import { preparePriceChartData } from '@/utils/charts';
import Data from '@/models/Data';

export default function LineChart({ itemData }: { itemData: Data[] }) {
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
			},
		},
	};

	return (
		<div className='chart-wrapper'>
			<Line
				data={preparePriceChartData(itemData)}
				options={chartOptions}
			/>
		</div>
	);
}

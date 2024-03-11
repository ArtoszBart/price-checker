'use client';

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import '@/styles/components/charts.scss';
import Data from '@/models/Data';
import { options } from '@/utils/charts';
import { useState } from 'react';
import { ChartData } from 'chart.js/auto';
import ChartFilterOption from '@/models/ChartFilterOption';

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

	const handleChange = async (e: any): Promise<void> => {
		let { value } = e.target;
		const option: ChartFilterOption = options.find(
			(o) => o.value == value
		) as ChartFilterOption;

		setdisplayData(option.filter(itemData));
	};

	const [displayData, setdisplayData] = useState<ChartData<'line'>>(
		options[0].filter(itemData)
	);

	return (
		<div className='chart-wrapper'>
			<select name='range' onChange={(e) => handleChange(e)}>
				{options.map((option, idx) => (
					<option key={idx} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			<Line data={displayData} options={chartOptions} />
		</div>
	);
}

'use client';

import { useState } from 'react';
import 'chart.js/auto';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Data from '@/models/Data';
import '@/styles/components/charts.scss';
import { preparePriceChartData } from '@/utils/charts';

export default function LineChart({
	itemName,
	data,
}: {
	itemName: string;
	data: Data[];
}): JSX.Element {
	const [prices, setPrices] = useState<ChartData<'line'>>(
		preparePriceChartData(itemName, data)
	);

	return (
		<div className='chart-wrapper'>
			<Line
				data={prices}
				options={{ aspectRatio: 1 | 2, maintainAspectRatio: true }}
			/>
		</div>
	);
}

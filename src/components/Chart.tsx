'use client';

import { useState } from 'react';
import 'chart.js/auto';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import IPrice from '@/models/price';

export default function LineChart({ data }: { data: IPrice[] }): JSX.Element {
	const [userData, setUserData] = useState<ChartData<'line'>>({
		labels: data.map((obj) => obj.date),
		datasets: [
			{
				label: 'RTX 4080 Gaming X',
				data: data.map((obj) => obj.price),
			},
		],
	});

	return <Line data={userData} />;
}

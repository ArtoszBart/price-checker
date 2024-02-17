'use client';

import 'chart.js/auto';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import '@/styles/components/charts.scss';
import Data from '@/models/Data';
import Item from '@/models/Item';
import { preparePriceChartData } from '@/utils/charts';

export default function LineChart({ items }: { items: Item[] }): JSX.Element {
	const [selectedItemData, setSelectedItemData] =
		useState<[string, Data[]]>();

	useEffect(() => {
		fetchData(items[0].id as number).catch(console.error);
	}, []);

	const handleChange = async (e: any): Promise<void> => {
		let { value } = e.target;
		fetchData(value).catch(console.error);
	};

	const fetchData = async (itemId: number): Promise<void> => {
		axios.get(`/api/data?itemId=${itemId}`).then((asd) => {
			const data: Data[] = asd.data.items as Data[];
			const item: Item = items.find((i) => i.id == itemId) as Item;
			setSelectedItemData([item.name, data]);
		});
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
						options={{
							aspectRatio: 1 | 2,
							maintainAspectRatio: true,
							interaction: {
								mode: 'index' as const,
								intersect: false,
							},
							plugins: {
								title: {
									display: true,
									text: selectedItemData[0],
								},
							},
							scales: {
								y1: {
									position: 'right' as const,
								},
							},
						}}
					/>
				</div>
			)}
		</>
	);
}

import Data from '@/models/Data';
import Item from '@/models/Item';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useChart = (items: Item[]) => {
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

	return { selectedItemData, handleChange, fetchData };
};

export default useChart;

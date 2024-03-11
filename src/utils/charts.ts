import { ChartData } from 'chart.js';

import Data from '@/models/Data';
import ChartFilterOption from '@/models/ChartFilterOption';
import { getDateString, getTimeString } from '@/utils/formatters';
import { isSameDay, isSameMonth } from './dateTimes';

export const options: ChartFilterOption[] = [
	new ChartFilterOption(1, 'Today', getLast24hours),
	new ChartFilterOption(2, 'Week', getLast7days),
	new ChartFilterOption(3, 'Month', getLast30days),
	new ChartFilterOption(4, 'Quarter', getLast3months),
	new ChartFilterOption(5, 'Half year', getLast6months),
	new ChartFilterOption(6, 'Last year', getLastYear),
	new ChartFilterOption(7, 'All time', getAllTime),
];
Object.freeze(options);

function preparePriceChartData(
	itemData: Data[],
	displayFunction: Function
): ChartData<'line'> {
	return {
		labels: itemData.map((obj) => displayFunction(new Date(obj.date))),
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

function filterDataDates(itemData: Data[], minDate: Date): Data[] {
	const filtered: Data[] = itemData.filter((data) => {
		if (data.date < minDate) return false;
		return true;
	});
	return filtered;
}

function getMinPriceForDay(itemData: Data[]): Data[] {
	const result: Data[] = [];
	let dayMin: Data = itemData[0];

	itemData.forEach((data) => {
		if (isSameDay(data.date, dayMin.date)) {
			if ((data.price as number) < (dayMin.price as number)) {
				dayMin = data;
			}
		} else {
			result.push(dayMin);
			dayMin = data;
		}
	});
	result.push(dayMin);

	return result;
}

function getMinPriceForMonth(itemData: Data[]): Data[] {
	const result: Data[] = [];
	let monthMin: Data = itemData[0];
	itemData.forEach((data) => {
		if (isSameMonth(data.date, monthMin.date)) {
			if ((data.price as number) < (monthMin.price as number))
				monthMin = data;
		} else {
			result.push(monthMin);
			monthMin = data;
		}
	});
	result.push(monthMin);

	return result;
}

export function getLast24hours(itemData: Data[]): ChartData<'line'> {
	const dateStart: Date = new Date();
	dateStart.setDate(dateStart.getDate() - 1);

	const filtered: Data[] = filterDataDates(itemData, dateStart);

	return preparePriceChartData(filtered, getTimeString);
}

export function getLast7days(itemData: Data[]): ChartData<'line'> {
	const dateStart: Date = new Date();
	dateStart.setDate(dateStart.getDate() - 7);

	const filtered: Data[] = filterDataDates(itemData, dateStart);
	const result = getMinPriceForDay(filtered);

	return preparePriceChartData(result, getDateString);
}

export function getLast30days(itemData: Data[]): ChartData<'line'> {
	const dateStart: Date = new Date();
	dateStart.setMonth(dateStart.getMonth() - 1);

	const filtered: Data[] = filterDataDates(itemData, dateStart);
	const result = getMinPriceForDay(filtered);

	return preparePriceChartData(result, getDateString);
}

export function getLast3months(itemData: Data[]): ChartData<'line'> {
	const dateStart: Date = new Date();
	dateStart.setMonth(dateStart.getMonth() - 3);

	const filtered: Data[] = filterDataDates(itemData, dateStart);
	const result = getMinPriceForDay(filtered);

	return preparePriceChartData(result, getDateString);
}

export function getLast6months(itemData: Data[]): ChartData<'line'> {
	const dateStart: Date = new Date();
	dateStart.setMonth(dateStart.getMonth() - 6);

	const filtered: Data[] = filterDataDates(itemData, dateStart);
	const result = getMinPriceForMonth(filtered);

	return preparePriceChartData(result, getDateString);
}

export function getLastYear(itemData: Data[]): ChartData<'line'> {
	const dateStart: Date = new Date();
	dateStart.setFullYear(dateStart.getFullYear() - 1);

	const filtered: Data[] = filterDataDates(itemData, dateStart);
	const result = getMinPriceForMonth(filtered);

	return preparePriceChartData(result, getDateString);
}

export function getAllTime(itemData: Data[]): ChartData<'line'> {
	const result = getMinPriceForMonth(itemData);

	return preparePriceChartData(result, getDateString);
}

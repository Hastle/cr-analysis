import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function IntermediateTable1({ dataArr }) {
	function roundToThreeDecimals(number) {
		return Math.round(number * 1000) / 1000;
	}
	const columns = [
		{ field: 'id', headerName: '№', width: 150, editable: false },
		{ field: 'X', headerName: 'X', width: 150, editable: false },
		{ field: 'Y', headerName: 'Y', width: 150, editable: false },
		{ field: 'X^2', headerName: 'X^2', width: 150, editable: false },
		{ field: 'Y^2', headerName: 'Y^2', width: 150, editable: false },
		{ field: 'XY', headerName: 'XY', width: 150, editable: false },
	];

	function calculateValues(dataArr) {
		const updatedDataArr = dataArr.map((obj) => {
			const xSquared = roundToThreeDecimals(obj.X ** 2);
			const ySquared = roundToThreeDecimals(obj.Y ** 2);
			const xyProduct = roundToThreeDecimals(obj.X * obj.Y);

			return {
				...obj,
				'X^2': xSquared,
				'Y^2': ySquared,
				XY: xyProduct,
			};
		});
		// Вычисление суммы каждого столбца
		let sumX = roundToThreeDecimals(updatedDataArr.reduce((total, obj) => total + obj.X, 0));
		let sumY = roundToThreeDecimals(updatedDataArr.reduce((total, obj) => total + obj.Y, 0));
		let sumX2 = roundToThreeDecimals(updatedDataArr.reduce((total, obj) => total + obj['X^2'], 0));
		let sumY2 = roundToThreeDecimals(updatedDataArr.reduce((total, obj) => total + obj['Y^2'], 0));
		let sumXY = roundToThreeDecimals(updatedDataArr.reduce((total, obj) => total + obj['XY'], 0));

		// Создание объекта с суммами
		const sums = {
			id: 'Сумма',
			X: sumX,
			Y: sumY,
			'X^2': sumX2,
			'Y^2': sumY2,
			'XY': sumXY,
		};

		// Вычисление среднего значения каждого столбца
		let avgX = roundToThreeDecimals(sumX / updatedDataArr.length);
		let avgY = roundToThreeDecimals(sumY / updatedDataArr.length);
		let avgX2 = roundToThreeDecimals(sumX2 / updatedDataArr.length);
		let avgY2 = roundToThreeDecimals(sumY2 / updatedDataArr.length);
		let avgXY = roundToThreeDecimals(sumXY / updatedDataArr.length);

		// Создание объекта со средними значениями
		const averages = {
			id: 'Среднее',
			X: avgX,
			Y: avgY,
			'X^2': avgX2,
			'Y^2': avgY2,
			'XY': avgXY,
		};

		updatedDataArr.push(sums, averages);

		return updatedDataArr;
	}

	const rows = calculateValues(dataArr);

/*	const sums = rows.find((obj) => obj.id === 'Сумма');
	const averages = rows.find((obj) => obj.id === 'Среднее');*/

	return (
		<div style={{ height: 630, width: '100%' }}>
		<DataGrid
			disablePagination
			rows={rows}
			columns={columns}
		/>
		</div>
	);
}
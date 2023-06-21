import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dataArrExample1 from '../../data/DataExample1.js';

export default function IntermediateTable1({ dataArr }) {
	const columns = [
		{ field: 'id', headerName: '№', width: 150, editable: false },
		{ field: 'X', headerName: 'X', width: 150, editable: false },
		{ field: 'Y', headerName: 'Y', width: 150, editable: false },
		{ field: 'X^2', headerName: 'X^2', width: 150, editable: false },
		{ field: 'Y^2', headerName: 'Y^2', width: 150, editable: false },
		{ field: 'XY', headerName: 'XY', width: 150, editable: false },
	];

	if (dataArr === null || dataArr.length === 0) {
		dataArr = dataArrExample1;
	}

	function calculateValues(dataArr) {
		const updatedDataArr = dataArr.map((obj) => {
			const xSquared = obj.X ** 2;
			const ySquared = obj.Y ** 2;
			const xyProduct = obj.X * obj.Y;

			return {
				...obj,
				'X^2': xSquared,
				'Y^2': ySquared,
				XY: xyProduct,
			};
		});
		// Вычисление суммы каждого столбца
		let sumX = updatedDataArr.reduce((total, obj) => total + obj.X, 0);
		let sumY = updatedDataArr.reduce((total, obj) => total + obj.Y, 0);
		let sumX2 = updatedDataArr.reduce((total, obj) => total + obj['X^2'], 0);
		let sumY2 = updatedDataArr.reduce((total, obj) => total + obj['Y^2'], 0);
		let sumXY = updatedDataArr.reduce((total, obj) => total + obj['XY'], 0);

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
		let avgX = sumX / updatedDataArr.length;
		let avgY = sumY / updatedDataArr.length;
		let avgX2 = sumX2 / updatedDataArr.length;
		let avgY2 = sumY2 / updatedDataArr.length;
		let avgXY = sumXY / updatedDataArr.length;

		avgX = avgX.toFixed(3);
		avgY = avgY.toFixed(3);
		avgX2 = avgX2.toFixed(3);
		avgY2 = avgY2.toFixed(3);
		avgXY = avgXY.toFixed(3);

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
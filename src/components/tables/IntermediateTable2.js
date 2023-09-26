import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function IntermediateTable2({ dataArr }) {
	function roundToThreeDecimals(number) {
		return Math.round(number * 1000) / 1000;
	}
	const columns = [
	{ field: 'id', headerName: '№', width: 150, editable: false },
	{ field: 'X', headerName: 'X', width: 150, editable: false },
	{ field: 'Y', headerName: 'Y', width: 150, editable: false },
	{ field: 'X^3', headerName: 'X^3', width: 150, editable: false },
	{ field: 'X^4', headerName: 'X^4', width: 150, editable: false },
	{ field: 'X^2 * Y', headerName: 'X^2 * Y', width: 150, editable: false },
	{ field: 'ln(Y)', headerName: 'ln(Y)', width: 150, editable: false },
	{ field: 'X * ln(Y)', headerName: 'X * ln(Y)', width: 150, editable: false },
	{ field: 'ln(X)', headerName: 'ln(X)', width: 150, editable: false },
	{ field: '(ln(X))^2', headerName: '(ln(X))^2', width: 150, editable: false },
	{ field: 'Y * ln(X)', headerName: 'Y * ln(X)', width: 150, editable: false },
	{ field: '1 / X', headerName: '1 / X', width: 150, editable: false },
	{ field: '1 / X^2', headerName: '1 / X^2', width: 150, editable: false },
	{ field: 'Y / X', headerName: 'Y / X', width: 150, editable: false },
	// { field: 'f(X)', headerName: 'f(X)', width: 150, editable: false },
	// { field: '|Y - f(X)|', headerName: '|Y - f(X)|', width: 150, editable: false },
	// { field: '(Y - f(X))^2', headerName: '(Y - f(X))^2', width: 150, editable: false },
	// { field: '(Y - avg(Y))^2', headerName: '(Y - avg(Y))^2', width: 150, editable: false },
	// { field: '(f(X) - avg(Y))^2', headerName: '(f(X) - avg(Y))^2', width: 150, editable: false },
	];

	function transformDataArray(dataArr) {
		const transformedDataArr = [];

		for (let i = 0; i < dataArr.length; i++) {
			const originalObj = dataArr[i];
			const transformedObj = {
				id: originalObj.id,
				X: originalObj.X,
				Y: originalObj.Y,
				'X^3': roundToThreeDecimals(Math.pow(originalObj.X, 3)),
				'X^4': roundToThreeDecimals(Math.pow(originalObj.X, 4)),
				'X^2 * Y': roundToThreeDecimals(originalObj.X ** 2 * originalObj.Y),
				'ln(Y)': roundToThreeDecimals(parseFloat(Math.log(originalObj.Y))),
				'X * ln(Y)': roundToThreeDecimals(parseFloat((originalObj.X * Math.log(originalObj.Y)))),
				'ln(X)': roundToThreeDecimals(parseFloat(Math.log(originalObj.X))),
				'(ln(X))^2': roundToThreeDecimals(parseFloat(Math.pow(Math.log(originalObj.X), 2))),
				'Y * ln(X)': roundToThreeDecimals(parseFloat((originalObj.Y * Math.log(originalObj.X)))),
				'1 / X': roundToThreeDecimals(parseFloat((1 / originalObj.X))),
				'1 / X^2': roundToThreeDecimals(parseFloat((1 / Math.pow(originalObj.X, 2)))),
				'Y / X': roundToThreeDecimals(parseFloat((originalObj.Y / originalObj.X))),
				'f(X)': '', // Замените это поле соответствующими значениями функции f(X)
				'|Y - f(X)|': '', // Замените это поле соответствующими значениями |Y - f(X)|
				'(Y - f(X))^2': '', // Замените это поле соответствующими значениями (Y - f(X))^2
				'(Y - avg(Y))^2': '', // Замените это поле соответствующими значениями (Y - avg(Y))^2
				'(f(X) - avg(Y))^2': '', // Замените это поле соответствующими значениями (f(X) - avg(Y))^2
			};

			transformedDataArr.push(transformedObj);
		}

		return transformedDataArr;
	}

	const transformedDataArr = transformDataArray(dataArr);

	return (
		<div style={{ height: 630, width: '100%' }}>
			<DataGrid disablePagination rows={transformedDataArr} columns={columns} />
		</div>
	);
}
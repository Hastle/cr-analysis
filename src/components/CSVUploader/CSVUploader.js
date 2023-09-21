import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './CSVUploader.sass';

function CSVUploader({ onDataArr }) {
	const [csvData, setCSVData] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const contents = e.target.result;
				setCSVData(contents);
				const dataArr = parseCSV(contents);
				onDataArr(dataArr);
			};
			reader.readAsText(file);
		}
	};


	const parseCSV = (data) => {
		let dataArr = [];
		let lines = data.split('\n');
		let id = 1;

		for (let index = 0; index < lines.length; index++) {
			let line = lines[index].trim();
			if (line === '') continue; // Пропуск пустых строк

			let point = line.split(',');

			let x = parseFloat(point[0]);
			let y = parseFloat(point[1]);

			if (isNaN(x) || isNaN(y)) {
				continue; // Пропуск строки с отсутствующими значениями X или Y
			}

			// Преобразование символа 'o' в 0, если он не находится в начале значения X
			if (point[0].indexOf('o') > 0) {
				x = parseFloat(point[0].replace(/o/g, '0'));
			}

			// Преобразование символа 'o' в 0, если он не находится в начале значения Y
			if (point[1].indexOf('o') > 0) {
				y = parseFloat(point[1].replace(/o/g, '0'));
			}

			dataArr.push({
				id: id++,
				X: x,
				Y: y,
			});
		}

		return dataArr;
	};

	return (
		<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
			Загрузить файл
			<input type="file" accept=".csv" onChange={handleFileChange} />
		</Button>
	);
}

export default CSVUploader;
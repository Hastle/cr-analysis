import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './CSVUploader.sass';
import {useData} from "../utils/DataContext";

function CSVUploader({ onDataArr }) {
	const [csvData, setCSVData] = useState(null);
	const { dataArrExample } = useData();

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const contents = e.target.result;
				const lines = contents.split('\n');
				const validLines = lines.filter((line) => {
					const point = line.trim().split(',');
					const x = point[0] !== undefined ? parseFloat(point[0].replace(',', '.')) : NaN;
					const y = point[1] !== undefined ? parseFloat(point[1].replace(',', '.')) : NaN;
					return !isNaN(x) && !isNaN(y);
				});

				if (validLines.length >= 3) {
					setCSVData(contents);
					const dataArr = parseCSV(contents);
					onDataArr(dataArr);
				} else {
					alert('Загружаемые данные должны содержать как минимум 3 валидные строки!');
				}
			};
			reader.readAsText(file);
		}
	};

	const handleClearFile = () => {
		setCSVData(null);
		document.getElementById('file-input').value = '';
	};

	useEffect(() => {
		if (dataArrExample !== null) {
			onDataArr(dataArrExample);
			handleClearFile();
		}
	}, [dataArrExample]);

	const parseCSV = (data) => {
		let dataArr = [];
		let isCorrectData = true;
		let lines = data.split('\n');
		let id = 1;

		for (let index = 0; index < lines.length; index++) {
			let line = lines[index].trim();

			if (line === '') {
				isCorrectData = false;
				continue;
			}

			let point = line.split(',');

			let x = parseFloat(point[0]);
			let y = parseFloat(point[1]);

			if (isNaN(x) || isNaN(y)) {
				isCorrectData = false;
				continue; // Пропуск строки с отсутствующими значениями X или Y
			}

			// Преобразование символа 'o' в 0, если он не находится в начале значения X
			if (point[0].indexOf('o') > 0) {
				isCorrectData = false;
				x = parseFloat(point[0].replace(/o/g, '0'));
			}

			// Преобразование символа 'o' в 0, если он не находится в начале значения Y
			if (point[1].indexOf('o') > 0) {
				isCorrectData = false;
				y = parseFloat(point[1].replace(/o/g, '0'));
			}

			dataArr.push({
				id: id++,
				X: x,
				Y: y,
			});
		}
		if (!isCorrectData) {
			alert('Загружаемые данные содержат ошибки!');
		}
		return dataArr;
	};

	return (
		<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
			Загрузить файл
			<input id="file-input" type="file" accept=".csv" onChange={handleFileChange} />
		</Button>
	);
}

export default CSVUploader;
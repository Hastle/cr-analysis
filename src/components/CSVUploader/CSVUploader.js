import React, { useState } from 'react';

function CSVUploader({ onDataArr }) {
	const [csvData, setCSVData] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			const contents = e.target.result;
			setCSVData(contents);
			const dataArr = parseCSV(contents);
			onDataArr(dataArr);
		};

		reader.readAsText(file);
	};

	const parseCSV = (data) => {
		let dataArr = data.split("\n").map(function (line, index) {
			let point = line.split(",");
			return {
				id: index + 1,
				X: parseInt(point[0]),
				Y: parseInt(point[1])
			};
		});
		return dataArr;
	};

	return (
		<div>
			<input type="file" accept=".csv" onChange={handleFileChange} />
		</div>
	);
}

export default CSVUploader;
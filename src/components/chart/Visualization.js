import React, {useEffect, useRef, useState} from 'react';
import dataArrExample1 from '../../data/DataExample1';
import {Chart, registerables} from 'chart.js';
import ChartTypeInput from '../inputs/ChartTypeInput';

const Visualization = ({ dataArr, onRegressionTypeChange, a0, a1, a2}) => {
	const chartRef = useRef(null);
	const chartInstance = useRef(null);
	const [selectedType, setSelectedType] = useState('straight');

	if (!dataArr || dataArr.length === 0) {
		dataArr = dataArrExample1;
	}

	function normalizeData(dataArr) {
		dataArr = dataArr.slice().sort((a, b) => a.X - b.X);
		return dataArr.map(item => ({x: item.X, y: item.Y}));
	}

	dataArr = normalizeData(dataArr);

	useEffect(() => {
		const ctx = chartRef.current.getContext('2d');

		if (chartInstance.current) {
			chartInstance.current.destroy();
		}

		Chart.register(...registerables);

		const generateData = () => {
			switch (selectedType) {
				case 'straight':
					return dataArr.map((item) => ({ x: item.x, y: (a0) + (a1) * item.x }));
				case 'parabola':
					return dataArr.map((item) => ({ x: item.x, y: item.x * item.x }));
				case 'exponential':
					return dataArr.map((item) => ({ x: item.x, y: (a0) * Math.pow(a1, item.x )}));
				case 'hyperbola':
					return dataArr.map((item) => ({ x: item.x, y: (a0) + (a1) / item.x }));
				case 'logarithmic':
					return dataArr.map((item) => ({ x: item.x, y: (a0) + (a1) * Math.log(item.x) }));
				default:
					return [];
			}
		};

		const resultData = generateData();

		const chartConfig = {
			type: 'scatter',
			data: {
				datasets: [
					{
						type: 'scatter',
						label: 'Входные X и Y',
						data: dataArr,
						backgroundColor: 'transparent',
						borderWidth: 2,
						hoverBorderWidth: 2,
						pointRadius: 3,
						pointHoverRadius: 3,
						borderColor: 'rgba(255, 99, 132, 1)',
					},
					{
						type: 'line',
						label: 'Результирующие X и Y',
						data: resultData,
						backgroundColor: 'transparent',
						borderWidth: 2,
						hoverBorderWidth: 2,
						pointRadius: 3,
						pointHoverRadius: 3,
						borderColor: 'rgba(75, 192, 192, 1)',
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					x: {
						type: 'linear',
						position: 'bottom',
					},
					y: {
						type: 'linear',
					},
				},
			},
		};

		chartInstance.current = new Chart(ctx, chartConfig);

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
				chartInstance.current = null;
			}
		};
	}, [dataArr, selectedType]);

	const handleTypeChange = (type) => {
		setSelectedType(type);
		onRegressionTypeChange(type);
	};

	return (
		<>
			<ChartTypeInput selectedType={selectedType} onTypeChange={handleTypeChange} />
			<div>
				<canvas className="main-chart" ref={chartRef} />
			</div>
		</>
	);
};

export default Visualization;

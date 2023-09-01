import React, { useEffect, useRef, useState } from 'react';
import dataArrExample1 from '../../data/DataExample1';
import { Chart, registerables } from 'chart.js';
import ChartTypeInput from '../inputs/ChartTypeInput';

const Visualization = ({ dataArr, onRegressionTypeChange }) => {
	const chartRef = useRef(null);
	const chartInstance = useRef(null);
	const containerRef = useRef(null);
	const [savedCanvasPosition, setSavedCanvasPosition] = useState({ left: 0, top: 0 });

	if (!dataArr || dataArr.length === 0) {
		dataArr = dataArrExample1;
	}

	const [selectedType, setSelectedType] = useState('straight');

	useEffect(() => {
		const ctx = chartRef.current.getContext('2d');

		if (chartInstance.current) {
			chartInstance.current.destroy();
		}

		Chart.register(...registerables);

		const generateData = () => {
			switch (selectedType) {
				case 'straight':
					return dataArr.map((item) => ({ x: item.X, y: item.Y }));
				case 'parabola':
					return dataArr.map((item) => ({ x: item.X, y: item.X * item.X }));
				case 'exponential':
					return dataArr.map((item) => ({ x: item.X, y: Math.exp(item.X) }));
				case 'hyperbola':
					return dataArr.map((item) => ({ x: item.X, y: 1 / item.X }));
				case 'logarithmic':
					return dataArr.map((item) => ({ x: item.X, y: Math.log(item.X) }));
				default:
					return [];
			}
		};

		const chartData = generateData();

		const chartConfig = {
			type: 'scatter',
			data: {
				datasets: [
					{
						type: 'scatter',
						label: 'Входные X и Y',
						data: chartData,
						backgroundColor: 'rgba(75, 192, 192, 1)',
						borderColor: 'rgba(75, 192, 192, 1)',
						pointRadius: 3,
						pointHoverRadius: 3,
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

	const handleCanvasSizeChange = () => {
		if (containerRef.current) {
			setSavedCanvasPosition({
				left: containerRef.current.scrollLeft,
				top: containerRef.current.scrollTop,
			});
		}
	};

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollLeft = savedCanvasPosition.left;
			containerRef.current.scrollTop = savedCanvasPosition.top;
		}
	}, [savedCanvasPosition]);

	return (
		<>
			<ChartTypeInput selectedType={selectedType} onTypeChange={handleTypeChange} />
			<div ref={containerRef} onScroll={handleCanvasSizeChange}>
				<canvas className="main-chart" ref={chartRef} />
			</div>
		</>
	);
};

export default Visualization;

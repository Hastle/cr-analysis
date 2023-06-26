import React, { useEffect, useRef } from 'react';
import dataArrExample1 from '../../data/DataExample1';
import { Chart, registerables } from 'chart.js';

const Visualization = ({ dataArr, type, regressionEquation }) => {
	const chartRef = useRef(null);
	const chartInstance = useRef(null);

	if (dataArr === null || dataArr.length === 0) {
		dataArr = dataArrExample1;
	}

	console.log(dataArr);

	useEffect(() => {
		const ctx = chartRef.current.getContext('2d');

	// Удаление предыдущего графика, если он существует
	if (chartInstance.current) {
		chartInstance.current.destroy();
	}
		// Регистрация необходимых контроллеров и плагинов
		Chart.register(...registerables);

		// Определение функции, которая генерирует данные для заданного типа графика
		const generateData = (type) => {
			switch (type) {
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
		// Генерация данных для выбранного типа графика
		const chartData = generateData(type);

		// Конфигурация графика
		const chartConfig = {
			type: 'scatter',
			data: {
				datasets: [
				{
					label: type,
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
				plugins: {
					title: {
						display: true,
						text: regressionEquation,
					},
				},
			},
		};
		chartInstance.current = new Chart(ctx, chartConfig);
		return () => {
			// Очистка: уничтожение экземпляра графика при размонтировании компонента
			if (chartInstance.current) {
				chartInstance.current.destroy();
				chartInstance.current = null;
			}
		};
	}, [dataArr, type, regressionEquation]);

	return <canvas ref={chartRef} />;
};

export default Visualization;

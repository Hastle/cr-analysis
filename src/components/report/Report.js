import * as React from 'react';
import Styles from './report.sass';
import dataArrExample1 from '../../data/DataExample1';

const Report = ({ dataArr }) => {

	if (dataArr === null || dataArr.length === 0) {
		dataArr = dataArrExample1;
	}

	const { standardDeviationX, standardDeviationY } = calculateStandardDeviation(dataArr);
	const correlationCoefficient = calculateCorrelationCoefficient(dataArr);
	const interpretation = interpretCorrelationCoefficient(correlationCoefficient);
	const errorOfCorrelation = calculateMeanErrorOfCorrelationCoefficient(correlationCoefficient);

	function calculateStandardDeviation(dataArr) {
		const xValues = dataArr.map(item => item.X);
		const yValues = dataArr.map(item => item.Y);
		const n = xValues.length;

		const meanX = xValues.reduce((sum, value) => sum + value, 0) / n;
		const meanY = yValues.reduce((sum, value) => sum + value, 0) / n;

		const squaredDeviationsX = xValues.map(value => Math.pow(value - meanX, 2));
		const squaredDeviationsY = yValues.map(value => Math.pow(value - meanY, 2));

		const sumSquaredDeviationsX = squaredDeviationsX.reduce((sum, deviation) => sum + deviation, 0);
		const sumSquaredDeviationsY = squaredDeviationsY.reduce((sum, deviation) => sum + deviation, 0);

		const standardDeviationX = Number(Math.sqrt(sumSquaredDeviationsX / n).toFixed(3));
		const standardDeviationY = Number(Math.sqrt(sumSquaredDeviationsY / n).toFixed(3));

		return { standardDeviationX, standardDeviationY };
	}

	function calculateCorrelationCoefficient(dataArr) {
		const xValues = dataArr.map(item => item.X);
		const yValues = dataArr.map(item => item.Y);
		const n = xValues.length;

		const meanX = xValues.reduce((sum, value) => sum + value, 0) / n;
		const meanY = yValues.reduce((sum, value) => sum + value, 0) / n;

		const deviationsX = xValues.map(value => value - meanX);
		const deviationsY = yValues.map(value => value - meanY);

		const sumDeviationProduct = deviationsX.reduce((sum, deviationX, index) => sum + deviationX * deviationsY[index], 0);

		const sumSquaredDeviationsX = deviationsX.reduce((sum, deviation) => sum + deviation ** 2, 0);
		const sumSquaredDeviationsY = deviationsY.reduce((sum, deviation) => sum + deviation ** 2, 0);

		const correlationCoefficient = Number((sumDeviationProduct / Math.sqrt(sumSquaredDeviationsX * sumSquaredDeviationsY)).toFixed(3));

		return correlationCoefficient;
	}

	function interpretCorrelationCoefficient(correlationCoefficient) {
		let result = "";

		if (correlationCoefficient > 0.7) {
			result = "прямая сильная";
		} else if (correlationCoefficient > 0.3) {
			result = "прямая средней силы";
		} else if (correlationCoefficient > 0) {
			result = "прямая слабая";
		} else if (correlationCoefficient < -0.7) {
			result = "обратная сильная";
		} else if (correlationCoefficient < -0.5) {
			result = "обратная средней силы";
		} else if (correlationCoefficient < -0.3) {
			result = "обратная слабая";
		} else {
			result = "нет значимой корреляции";
		}

		return result;
	}

	function calculateMeanErrorOfCorrelationCoefficient(correlationCoefficient) {
		const n = dataArr.length;

		if (n < 30) {
			const meanError = Number(Math.sqrt((1 - Math.pow(correlationCoefficient, 2)) / (n - 2)).toFixed(3));
			return meanError;
		} else {
			const meanError = Number((1 - Math.pow(correlationCoefficient, 2)) / Math.sqrt(n)).toFixed(3);
			return meanError;
		}
	}

	console.log(errorOfCorrelation);

	return (
		<div>
			<h4>Отчет</h4>
			<p>Среднеквадратичное отклонение для признака X: {standardDeviationX}</p>
			<p>Среднеквадратичное отклонение для признака Y: {standardDeviationY}</p>
			<br/>
			<p>Линейный коэффициент корреляции: {correlationCoefficient}</p>
			<p>Связь между признаками X и Y по коэффициенту корреляции: {interpretation}</p>
			<br/>
			<p>Средняя ошибка коэффициента корреляции: {errorOfCorrelation}</p>
			<p>Проверка коэффициента корреляции на значимость:</p>
			<br/>
			<p>Уровень значимости:</p>
			<br/>
			<p>t - таблицы:</p>
			<p>Коэффициент корреляции:</p>
			<br/>
			<p>Коэффициент Спирмена:</p>
			<p>Связь между признаками X и Y по коэффициенту Спирмена:</p>
			<br/>
			<p>Эластичность:</p>
			<br/>
			<p>Средняя ошибка аппроксимации:</p>
			<p>Общая дисперсия:</p>
			<p>Факторная дисперсия:</p>
			<p>Остаточная дисперсия:</p>
			<p>Проверка общей дисперсии:</p>
			<br/>
			<p>Теоретический коэффициент детерминации:</p>
			<p>Теоретическое корреляционное отношение:</p>
			<br/>
			<p>Уравнение регрессии: f(x) =</p>
			<br/>
			<p>Параметр a0:</p>
			<p>Параметр a1:</p>
			<br/>
			<p>Средняя ошибка параметров а0:</p>
			<p>Средняя ошибка параметров а1:</p>
			<br/>
			<p>t a0:</p>
			<p>t a1:</p>
			<br/>
			<p>F-критерий Фишера:</p>
			<br/>
			<p>Уровень значений F-таблицы:</p>
			<br/>
			<p>F расч  F табл</p>
		</div>
	);
};

export default Report;
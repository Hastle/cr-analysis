import React, { useState } from 'react';
import * as jstat from 'jstat';
import Styles from './report.sass';
import dataArrExample1 from '../../data/DataExample1';
import SelectAlpha from '../inputs/SelectAlpha';
import TableValueInput from '../inputs/TableValueInput';

const calculateReport = (dataArr, alpha, regressionType) => {

	const calculateStandardDeviation = (values) => {
		const n = values.length;
		const mean = values.reduce((sum, value) => sum + value, 0) / n;
		const squaredDeviations = values.map((value) => Math.pow(value - mean, 2));
		const sumSquaredDeviations = squaredDeviations.reduce((sum, deviation) => sum + deviation, 0);
		const standardDeviation = Math.sqrt(sumSquaredDeviations / n);
		return standardDeviation;
	};

	const calculateCorrelationCoefficient = (xValues, yValues) => {
		const n = xValues.length;
		const meanX = xValues.reduce((sum, value) => sum + value, 0) / n;
		const meanY = yValues.reduce((sum, value) => sum + value, 0) / n;
		const deviationsX = xValues.map((value) => value - meanX);
		const deviationsY = yValues.map((value) => value - meanY);
		const sumDeviationProduct = deviationsX.reduce((sum, deviationX, index) => sum + deviationX * deviationsY[index], 0);
		const sumSquaredDeviationsX = deviationsX.reduce((sum, deviation) => sum + Math.pow(deviation, 2), 0);
		const sumSquaredDeviationsY = deviationsY.reduce((sum, deviation) => sum + Math.pow(deviation, 2), 0);
		const correlationCoefficient = sumDeviationProduct / Math.sqrt(sumSquaredDeviationsX * sumSquaredDeviationsY);
		return correlationCoefficient;
	};

	const calculateRegressionCoefficients = (xValues, yValues) => {
		const n = xValues.length;
		let sumX = 0;
		let sumY = 0;
		let sumXY = 0;
		let sumXX = 0;

		for (let i = 0; i < n; i++) {
			const x = xValues[i];
			const y = yValues[i];

			sumX += x;
			sumY += y;
			sumXY += x * y;
			sumXX += x * x;
		}

		const a1 = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
		const a0 = (sumY - a1 * sumX) / n;

		return { a0, a1 };
	};

	const interpretCorrelation = (correlationCoefficient) => {
		if (correlationCoefficient > 0.7) {
			return 'прямая сильная';
		} else if (correlationCoefficient > 0.3) {
			return 'прямая средней силы';
		} else if (correlationCoefficient > 0) {
			return 'прямая слабая';
		} else if (correlationCoefficient < -0.7) {
			return 'обратная сильная';
		} else if (correlationCoefficient < -0.5) {
			return 'обратная средней силы';
		} else if (correlationCoefficient < -0.3) {
			return 'обратная слабая';
		} else {
			return 'нет значимой корреляции';
		}
	};

	const calculateMeanErrorOfCorrelationCoefficient = (correlationCoefficient, n) => {
		if (n < 30) {
			return Math.sqrt((1 - Math.pow(correlationCoefficient, 2)) / (n - 2));
		} else {
			return Math.sqrt((1 - Math.pow(correlationCoefficient, 2)) / Math.sqrt(n));
		}
	};

	const calculateCorrelationSignificant = (correlationCoefficient, meanErrorOfCorrelationCoefficient) => {
		return Math.abs(correlationCoefficient) / (meanErrorOfCorrelationCoefficient);
	};

	const calculateTTable = (alpha, n) => {
		return jstat.studentt.inv(1 - alpha / 2, n - 2);
	};

	const significanceLevel = (tTable, correlationSignificant, dataArr) => {
		let result = "";
		const n = dataArr.length;

		if (n < 30) {
			if (correlationSignificant > tTable) {
				result = "значим";
			} else {
				result = "незначим";
			}
		} else {
			if (correlationSignificant > 3) {
				result = "значим";
			} else {
				result = "незначим";
			}
		}
		return result;
	}

	const calculateSpearmanCoefficient = (dataArr) => {
		const sortedX = dataArr.map((item) => item.X).sort((a, b) => a - b);
		const sortedY = dataArr.map((item) => item.Y).sort((a, b) => a - b);
		const ranksX = dataArr.map((item) => sortedX.indexOf(item.X) + 1);
		const ranksY = dataArr.map((item) => sortedY.indexOf(item.Y) + 1);
		const squaredDifferences = ranksX.map((rankX, index) => Math.pow(rankX - ranksY[index], 2));
		const sumSquaredDifferences = squaredDifferences.reduce((sum, difference) => sum + difference, 0);
		const spearmanCoefficient = 1 - (6 * sumSquaredDifferences) / (dataArr.length * (Math.pow(dataArr.length, 2) - 1));
		return spearmanCoefficient;
	};

	const interpretSpearman = (spearmanCoefficient) => {
		if (spearmanCoefficient > 0.7) {
			return 'прямая сильная';
		} else if (spearmanCoefficient > 0.3) {
			return 'прямая средней силы';
		} else if (spearmanCoefficient > 0) {
			return 'прямая слабая';
		} else if (spearmanCoefficient < -0.7) {
			return 'обратная сильная';
		} else if (spearmanCoefficient < -0.5) {
			return 'обратная средней силы';
		} else if (spearmanCoefficient < -0.3) {
			return 'обратная слабая';
		} else {
			return 'нет значимой корреляции';
		}
	};

	const calculateElasticity = (xValues, yValues) => {
		const n = xValues.length;
		const meanX = xValues.reduce((sum, value) => sum + value, 0) / n;
		const meanY = yValues.reduce((sum, value) => sum + value, 0) / n;
		const deviationsX = xValues.map((value) => value - meanX);
		const deviationsY = yValues.map((value) => value - meanY);
		const sumSquaredDeviationsX = deviationsX.reduce((sum, deviation) => sum + Math.pow(deviation, 2), 0);
		const sumDeviationProduct = deviationsX.reduce((sum, deviationX, index) => sum + deviationX * deviationsY[index], 0);
		const elasticity = (sumDeviationProduct / sumSquaredDeviationsX) * (meanX / meanY);
		return elasticity;
	};

	const calculateMeanApproximationError = (xValues, yValues, a0, a1) => {
		const predictedYValues = xValues.map((x) => a0 + a1 * x);
		const squaredDifferences = predictedYValues.map((predictedY, index) => Math.pow(predictedY - yValues[index], 2));
		const sumSquaredDifferences = squaredDifferences.reduce((sum, difference) => sum + difference, 0);
		const meanApproximationError = Math.sqrt(sumSquaredDifferences / predictedYValues.length);
		return meanApproximationError;
	};

	const calculateTotalVariance = (yValues) => {
		const meanY = yValues.reduce((sum, value) => sum + value, 0) / yValues.length;
		const squaredDeviations = yValues.map((value) => Math.pow(value - meanY, 2));
		const totalVariance = squaredDeviations.reduce((sum, deviation) => sum + deviation, 0);
		return totalVariance;
	};

	const calculateFactorVariance = (xValues, a0, a1, yValues) => {
		const predictedYValues = xValues.map((x) => a0 + a1 * x);
		const meanY = yValues.reduce((sum, value) => sum + value, 0) / yValues.length;
		const squaredDeviations = predictedYValues.map((value) => Math.pow(value - meanY, 2));
		const factorVariance = squaredDeviations.reduce((sum, deviation) => sum + deviation, 0);
		return factorVariance;
	};

	const calculateResidualVariance = (xValues, a0, a1, yValues) => {
		const predictedYValues = xValues.map((x) => a0 + a1 * x);
		const squaredDeviations = yValues.map((value, index) => Math.pow(value - predictedYValues[index], 2));
		const residualVariance = squaredDeviations.reduce((sum, deviation) => sum + deviation, 0);
		return residualVariance;
	};

	const calculateTheoreticalCoefficientOfDetermination = (factorVariance, totalVariance) => {
		return factorVariance / totalVariance;
	};

	const calculateTheoreticalCorrelationRatio = (theoreticalCoefficientOfDetermination) => {
		return Math.sqrt(theoreticalCoefficientOfDetermination);
	};

	const calculateRegressionEquation = (a0, a1, regressionType) => {
		if (regressionType === 'straight') {
			return `f(x) = ${a0} + ${a1} * x`;
		} else if (regressionType === 'parabola') {
			return `f(x) = ${a0} + ${a1} * x^2`;
		} else if (regressionType === 'exponential') {
			return `f(x) = ${a0} * e^(${a1} * x)`;
		} else if (regressionType === 'hyperbola') {
			return `f(x) = ${a0} + ${a1} / x`;
		} else if (regressionType === 'logarithmic') {
			return `f(x) = ${a0} + ${a1} * ln(x)`;
		} else {
			return 'Неизвестный тип регрессии';
		}
	};

	const calculateStandardErrorOfParameters = (xValues, yValues, a0, a1) => {
		const predictedYValues = xValues.map((x) => a0 + a1 * x);
		const differences = predictedYValues.map((predictedY, index) => predictedY - yValues[index]);
		const sumSquaredDifferences = differences.reduce((sum, difference) => sum + Math.pow(difference, 2), 0);
		const n = xValues.length;
		const standardErrorA0 = Math.sqrt((sumSquaredDifferences * (1 / n + Math.pow(xValues.reduce((sum, x) => sum + Math.pow(x, 2), 0), 2) / (n * xValues.reduce((sum, x) => sum + x, 0)))) / (n - 2));
		const standardErrorA1 = Math.sqrt(sumSquaredDifferences / (n * xValues.reduce((sum, x) => sum + Math.pow(x, 2), 0)) / (n - 2));
		return [standardErrorA0, standardErrorA1];
	};

	const calculateTValue = (parameter, standardError) => {
		return parameter / standardError;
	};

	const calculateFisherCriterion = (factorVariance, residualVariance, k, n) => {
		return (factorVariance / k) / (residualVariance / (n - k - 1));
	};

	const getFTableValue = (alpha, k, n) => {
		// This is a placeholder implementation and should be replaced with an actual table lookup
		// The values returned here are only for demonstration purposes and may not be accurate
		if (alpha === 0.05) {
			if (k === 1 && n === 10) {
				return 4.96;
			} else if (k === 2 && n === 10) {
				return 3.46;
			} else if (k === 1 && n === 20) {
				return 4.13;
			} else if (k === 2 && n === 20) {
				return 3.17;
			}
		}
		return null;
	};

	// Extract X and Y values from dataArr
	const xValues = dataArr.map((item) => item.X);
	const yValues = dataArr.map((item) => item.Y);

	// Calculate standard deviations
	const standardDeviationX = calculateStandardDeviation(xValues);
	const standardDeviationY = calculateStandardDeviation(yValues);

	// Calculate correlation coefficient
	const correlationCoefficient = calculateCorrelationCoefficient(xValues, yValues);

	const regressionCoefficients = calculateRegressionCoefficients(xValues, yValues);
	const a0 = regressionCoefficients.a0;
	const a1 = regressionCoefficients.a1;

	// Interpret correlation
	const correlationInterpretation = interpretCorrelation(correlationCoefficient);

	// Calculate mean error of correlation coefficient
	const meanErrorOfCorrelationCoefficient = calculateMeanErrorOfCorrelationCoefficient(correlationCoefficient, dataArr.length);

	const correlationSignificant = calculateCorrelationSignificant(correlationCoefficient, meanErrorOfCorrelationCoefficient);

	const tTable = calculateTTable(alpha, dataArr.length);

	const significance = significanceLevel(tTable, correlationSignificant, dataArr);
	// Check significance of correlation coefficient

	// Calculate Spearman coefficient
	const spearmanCoefficient = calculateSpearmanCoefficient(dataArr);

	// Interpret Spearman coefficient
	const spearmanInterpretation = interpretSpearman(spearmanCoefficient);

	// Calculate elasticity
	const elasticity = calculateElasticity(xValues, yValues);

	// Calculate mean approximation error
	const meanApproximationError = calculateMeanApproximationError(xValues, yValues, a0, a1);

	// Calculate total variance
	const totalVariance = calculateTotalVariance(yValues);

	// Calculate factor variance
	const factorVariance = calculateFactorVariance(xValues, a0, a1, yValues);

	// Calculate residual variance
	const residualVariance = calculateResidualVariance(xValues, a0, a1, yValues);

	// Calculate theoretical coefficient of determination
	const theoreticalCoefficientOfDetermination = calculateTheoreticalCoefficientOfDetermination(factorVariance, totalVariance);

	// Calculate theoretical correlation ratio
	const theoreticalCorrelationRatio = calculateTheoreticalCorrelationRatio(theoreticalCoefficientOfDetermination);

	// Calculate regression equation
	const regressionEquation = calculateRegressionEquation(a0, a1, regressionType);

	// Calculate standard errors of parameters
	const [standardErrorA0, standardErrorA1] = calculateStandardErrorOfParameters(xValues, yValues, a0, a1);

	// Calculate t-values
	const tValueA0 = calculateTValue(a0, standardErrorA0);
	const tValueA1 = calculateTValue(a1, standardErrorA1);

	// Calculate Fisher criterion
	const fisherCriterion = calculateFisherCriterion(factorVariance, residualVariance, 2, dataArr.length);

	// Calculate F-table value
	const fTableValue = getFTableValue(alpha, 2, dataArr.length);

	// Return the report object
	return {
		standardDeviationX,
		standardDeviationY,
		correlationCoefficient,
		correlationInterpretation,
		meanErrorOfCorrelationCoefficient,
		correlationSignificant,
		alpha,
		tTable,
		significance,
		spearmanCoefficient,
		spearmanInterpretation,
		elasticity,
		meanApproximationError,
		totalVariance,
		factorVariance,
		residualVariance,
		theoreticalCoefficientOfDetermination,
		theoreticalCorrelationRatio,
		regressionEquation,
		a0,
		a1,
		standardErrorA0,
		standardErrorA1,
		tValueA0,
		tValueA1,
		fisherCriterion,
		fTableValue,
	};
};

const Report = ({ dataArr, regressionType }) => {

	if (dataArr === null || dataArr.length === 0) {
		dataArr = dataArrExample1;
	}

	const [selectedAlpha, setSelectedAlpha] = useState(0.05);

	const handleAlphaChange = (alpha) => {
		setSelectedAlpha(alpha);
		calculateReport(dataArr, selectedAlpha);
	};
	// Вычисляем результаты анализа
	const reportData = calculateReport(dataArr, selectedAlpha, regressionType);

	const roundToThreeDecimals = (value) => {
		return Number(value.toFixed(3));
	};

	return (
		<div>
			<p>Среднеквадратичное отклонение для признака X: {roundToThreeDecimals(reportData.standardDeviationX)}</p>
			<p>Среднеквадратичное отклонение для признака Y: {roundToThreeDecimals(reportData.standardDeviationY)}</p>
			<br/>
			<p>Линейный коэффициент корреляции: {roundToThreeDecimals(reportData.correlationCoefficient)}</p>
			<p>Связь между признаками X и Y по коэффициенту корреляции: {reportData.correlationInterpretation}</p>
			<br/>
			<p>Средняя ошибка коэффициента корреляции: {roundToThreeDecimals(reportData.meanErrorOfCorrelationCoefficient)}</p>
			<p>Проверка коэффициента корреляции на значимость: {roundToThreeDecimals(reportData.correlationSignificant)}</p>
			<p className="inline-flex">Уровень значимости: </p>
			<SelectAlpha selectedAlpha={selectedAlpha} onAlphaChange={handleAlphaChange} />
			<p>t - таблицы: {roundToThreeDecimals(reportData.tTable)}</p>
			<p>Коэффициент корреляции: {reportData.significance}</p>
			<br/>
			<p>Коэффициент Спирмена: {roundToThreeDecimals(reportData.spearmanCoefficient)}</p>
			<p>Связь между признаками X и Y по коэффициенту Спирмена: {reportData.spearmanInterpretation}</p>
			<br/>
			<p>Эластичность: {roundToThreeDecimals(reportData.elasticity)}</p>
			<br/>
			<p>Средняя ошибка аппроксимации: {roundToThreeDecimals(reportData.meanApproximationError)}</p>
			<p>Общая дисперсия: {roundToThreeDecimals(reportData.totalVariance)}</p>
			<p>Факторная дисперсия: {roundToThreeDecimals(reportData.factorVariance)}</p>
			<p>Остаточная дисперсия: {(roundToThreeDecimals(reportData.residualVariance))}</p>
			<br/>
			<p>Теоретический коэффициент детерминации: {roundToThreeDecimals(reportData.theoreticalCoefficientOfDetermination)}</p>
			<p>Теоретическое корреляционное отношение: {roundToThreeDecimals(reportData.theoreticalCorrelationRatio)}</p>
			<br/>
			<p>Уравнение регрессии: {reportData.regressionEquation}</p>
			<br/>
			<p>Параметр a0: {roundToThreeDecimals(reportData.a0)}</p>
			<p>Параметр a1: {roundToThreeDecimals(reportData.a1)}</p>
			<br/>
			<p>Средняя ошибка параметров a0: {roundToThreeDecimals(reportData.standardErrorA0)}</p>
			<p>Средняя ошибка параметров a1: {roundToThreeDecimals(reportData.standardErrorA1)}</p>
			<br/>
			<p>t a0: {roundToThreeDecimals(reportData.tValueA0)}</p>
			<p>t a1: {roundToThreeDecimals(reportData.tValueA1)}</p>
			<br/>
			<p>F-критерий Фишера: {roundToThreeDecimals(reportData.fisherCriterion)}</p>
			<br/>
			<p className="inline-flex">Уровень значений F-таблицы: </p>
			<TableValueInput/>
		</div>
	);
};

export default Report;
import React, { useState, useEffect } from 'react';
import Styles from './report.sass';
import dataArrExample1 from '../../data/DataExample1';
import SelectAlpha from '../inputs/SelectAlpha';
import TableValueInput from '../inputs/TableValueInput';
import calculateStandardDeviation from "../maths/StandardDeviation";
import calculateCorrelationCoefficient from "../maths/CorrelationCoefficient";
import calculateRegressionCoefficients from "../maths/RegressionCoefficients";
import interpretCorrelation from "../maths/InterpretCorrelation";
import calculateMeanErrorOfCorrelationCoefficient from "../maths/MeanErrorOfCorrelationCoefficient";
import calculateCorrelationSignificant from "../maths/CorrelationSignificant";
import calculateTTable from "../maths/TTable";
import significanceLevel from "../maths/SignificanceLevel";
import calculateSpearmanCoefficient from "../maths/SpearmanCoefficient";
import interpretSpearman from "../maths/InterpretSpearman";
import calculateElasticity from "../maths/Elasticity";
import calculateMeanApproximationError from "../maths/MeanApproximationError";
import calculateTotalVariance from "../maths/TotalVariance";
import calculateFactorVariance from "../maths/FactorVariance";
import calculateResidualVariance from "../maths/ResidualVariance";
import calculateTheoreticalCoefficientOfDetermination from "../maths/TheoreticalCoefficientOfDetermination";
import calculateTheoreticalCorrelationRatio from "../maths/TheoreticalCorrelationRatio";
import calculateRegressionEquation from "../maths/RegressionEquation";
import calculateStandardErrorOfParameters from "../maths/StandardErrorOfParameters";
import calculateTValue from "../maths/TValue";
import calculateFisherCriterion from "../maths/FisherCriterion";
import getFTableValue from "../maths/FTableValue";

const calculateReport = (dataArr, alpha, regressionType) => {

	// Extract X and Y values from dataArr
	const xValues = dataArr.map((item) => item.X);
	const yValues = dataArr.map((item) => item.Y);

	// Calculate standard deviations
	const standardDeviationX = calculateStandardDeviation(xValues);
	const standardDeviationY = calculateStandardDeviation(yValues);

	// Calculate correlation coefficient
	const correlationCoefficient = calculateCorrelationCoefficient(xValues, yValues);

	const regressionCoefficients = calculateRegressionCoefficients(xValues, yValues, regressionType);

	const a0 = regressionCoefficients.a0;
	const a1 = regressionCoefficients.a1;
	const a2 = regressionCoefficients.a2;

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
	const regressionEquation = calculateRegressionEquation(regressionType);

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
		a2,
		standardErrorA0,
		standardErrorA1,
		tValueA0,
		tValueA1,
		fisherCriterion,
		fTableValue,
	};
};

const Report = ({ dataArr, regressionType, onUpdateA0A1A2 }) => {

	if (dataArr === null || dataArr.length === 0) {
		dataArr = dataArrExample1;
	}

	const [selectedAlpha, setSelectedAlpha] = useState(0.05);
	const [a0, setA0] = useState(null);
	const [a1, setA1] = useState(null);
	const [a2, setA2] = useState(null);

	const handleAlphaChange = (alpha) => {
		setSelectedAlpha(alpha);
	};
	const handleUpdateA0A1A2 = (newA0, newA1, newA2) => {
		setA0(newA0);
		setA1(newA1);
		setA2(newA2);

		onUpdateA0A1A2(newA0, newA1, newA2);
	};

	const reportData = calculateReport(dataArr, selectedAlpha, regressionType);

	const roundToThreeDecimals = (value) => {
		return Number(value.toFixed(3));
	};

	useEffect(() => {
		handleUpdateA0A1A2(reportData.a0, reportData.a1, reportData.a2);
	}, [reportData.a0, reportData.a1, reportData.a2]);

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
			{regressionType === 'parabola' && (
				<p>Параметр a2: {roundToThreeDecimals(reportData.a2)}</p>
			)}
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
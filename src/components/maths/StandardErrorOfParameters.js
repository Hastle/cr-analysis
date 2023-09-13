const calculateStandardErrorOfParameters = (xValues, yValues, a0, a1, a2, regressionType, residualVariance) => {
    let predictedYValues;

    if (regressionType === 'straight') {
        predictedYValues = xValues.map((x) => a0 + a1 * x);
    } else if (regressionType === 'parabola') {
        predictedYValues = xValues.map((x) => a0 + a1 * x + a2 * Math.pow(x, 2));
    } else if (regressionType === 'exponential') {
        predictedYValues = xValues.map((x) => a0 * Math.pow(a1, x));
    } else if (regressionType === 'hyperbola') {
        predictedYValues = xValues.map((x) => a0 + a1 / x);
    } else if (regressionType === 'logarithmic') {
        predictedYValues = xValues.map((x) => a0 + a1 * Math.log(x));
    }
    const n = xValues.length;
    const meanX = xValues.reduce((sum, value) => sum + value, 0) / n;
    const meanX2 = xValues.reduce((sum, x) => sum + Math.pow(x, 2), 0) / n;
    const meanX4 = xValues.reduce((sum, x) => sum + Math.pow(x, 4), 0) / n;
    const sumSquaredDeviations = meanX2 - Math.pow(meanX, 2);
    const sumSquaredDeviationsX2 = meanX4 - Math.pow(meanX2, 2);
    const standardErrorA0 = Math.sqrt(residualVariance / (n - 2));
    const standardErrorA1 = Math.sqrt(residualVariance / (n - 2) / sumSquaredDeviations);
    let standardErrorA2 = null;
    if (regressionType === 'parabola') {
        standardErrorA2 = Math.sqrt(residualVariance / (n - 2) / sumSquaredDeviationsX2);
    }

    return [standardErrorA0, standardErrorA1, standardErrorA2];
};
export default calculateStandardErrorOfParameters;

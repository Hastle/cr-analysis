const calculateMeanApproximationError = (xValues, yValues, a0, a1, a2, regressionType) => {
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

    const absoluteDifferences = predictedYValues.map((predictedY, index) => Math.abs(yValues[index] - predictedY));
    const sumAbsoluteDifferences = absoluteDifferences.reduce((sum, difference) => sum + difference, 0);
    const sumYValues = yValues.reduce((sum, value) => sum + value, 0);

    return sumAbsoluteDifferences / sumYValues;
};
export default calculateMeanApproximationError;

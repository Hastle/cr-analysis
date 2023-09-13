const calculateFactorVarianceSquared = (xValues, yValues, a0, a1, a2, regressionType) => {
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
    const n = yValues.length;
    const meanY = yValues.reduce((sum, value) => sum + value, 0) / n;

    const squaredDeviations = predictedYValues.map((value) => Math.pow(value - meanY, 2));

    return squaredDeviations.reduce((sum, deviation) => sum + deviation, 0) / n;
};
export default calculateFactorVarianceSquared;

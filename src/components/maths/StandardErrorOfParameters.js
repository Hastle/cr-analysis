const calculateStandardErrorOfParameters = (xValues, yValues, a0, a1) => {
    const predictedYValues = xValues.map((x) => a0 + a1 * x);
    const differences = predictedYValues.map((predictedY, index) => predictedY - yValues[index]);
    const sumSquaredDifferences = differences.reduce((sum, difference) => sum + Math.pow(difference, 2), 0);
    const n = xValues.length;
    const standardErrorA0 = Math.sqrt((sumSquaredDifferences * (1 / n + Math.pow(xValues.reduce((sum, x) => sum + Math.pow(x, 2), 0), 2) / (n * xValues.reduce((sum, x) => sum + x, 0)))) / (n - 2));
    const standardErrorA1 = Math.sqrt(sumSquaredDifferences / (n * xValues.reduce((sum, x) => sum + Math.pow(x, 2), 0)) / (n - 2));
    return [standardErrorA0, standardErrorA1];
};
export default calculateStandardErrorOfParameters;
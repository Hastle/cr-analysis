const calculateMeanApproximationError = (xValues, yValues, a0, a1) => {
    const predictedYValues = xValues.map((x) => a0 + a1 * x);
    const squaredDifferences = predictedYValues.map((predictedY, index) => Math.pow(predictedY - yValues[index], 2));
    const sumSquaredDifferences = squaredDifferences.reduce((sum, difference) => sum + difference, 0);
    return Math.sqrt(sumSquaredDifferences / predictedYValues.length);;
};
export default calculateMeanApproximationError
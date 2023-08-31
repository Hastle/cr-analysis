const calculateFactorVariance = (xValues, a0, a1, yValues) => {
    const predictedYValues = xValues.map((x) => a0 + a1 * x);
    const meanY = yValues.reduce((sum, value) => sum + value, 0) / yValues.length;
    const squaredDeviations = predictedYValues.map((value) => Math.pow(value - meanY, 2));
    return squaredDeviations.reduce((sum, deviation) => sum + deviation, 0);;
};
export default calculateFactorVariance;
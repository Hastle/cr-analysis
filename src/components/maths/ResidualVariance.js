const calculateResidualVariance = (xValues, a0, a1, yValues) => {
    const predictedYValues = xValues.map((x) => a0 + a1 * x);
    const squaredDeviations = yValues.map((value, index) => Math.pow(value - predictedYValues[index], 2));
    return squaredDeviations.reduce((sum, deviation) => sum + deviation, 0);;
};
export default calculateResidualVariance;
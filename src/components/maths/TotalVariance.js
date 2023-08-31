const calculateTotalVariance = (yValues) => {
    const meanY = yValues.reduce((sum, value) => sum + value, 0) / yValues.length;
    const squaredDeviations = yValues.map((value) => Math.pow(value - meanY, 2));
    return squaredDeviations.reduce((sum, deviation) => sum + deviation, 0);;
};
export default calculateTotalVariance;
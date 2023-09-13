const calculateTotalVarianceSquared = (yValues) => {
    const n = yValues.length;
    const meanY = yValues.reduce((sum, value) => sum + value, 0) / n;

    const squaredDifferences = yValues.map((y) => Math.pow(y - meanY, 2));
    const sumSquaredDifferences = squaredDifferences.reduce((sum, difference) => sum + difference, 0);
    return sumSquaredDifferences / n;
};
export default calculateTotalVarianceSquared;
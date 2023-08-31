const calculateStandardDeviation = (values) => {
    const n = values.length;
    const mean = values.reduce((sum, value) => sum + value, 0) / n;
    const squaredDeviations = values.map((value) => Math.pow(value - mean, 2));
    const sumSquaredDeviations = squaredDeviations.reduce((sum, deviation) => sum + deviation, 0);
    return Math.sqrt(sumSquaredDeviations / n);
};

export default calculateStandardDeviation;
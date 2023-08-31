const calculateMeanErrorOfCorrelationCoefficient = (correlationCoefficient, n) => {
    if (n < 30) {
        return Math.sqrt((1 - Math.pow(correlationCoefficient, 2)) / (n - 2));
    } else {
        return Math.sqrt((1 - Math.pow(correlationCoefficient, 2)) / Math.sqrt(n));
    }
};
export default calculateMeanErrorOfCorrelationCoefficient;
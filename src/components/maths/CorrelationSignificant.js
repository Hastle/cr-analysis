const calculateCorrelationSignificant = (correlationCoefficient, meanErrorOfCorrelationCoefficient) => {
    return Math.abs(correlationCoefficient) / (meanErrorOfCorrelationCoefficient);
};
export default calculateCorrelationSignificant;
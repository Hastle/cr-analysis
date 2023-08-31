const calculateFisherCriterion = (factorVariance, residualVariance, k, n) => {
    return (factorVariance / k) / (residualVariance / (n - k - 1));
};
export default calculateFisherCriterion;
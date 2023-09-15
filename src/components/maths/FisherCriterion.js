const calculateFisherCriterion = (factorVariance, residualVariance, regressionType, n) => {
    let k;
    if (regressionType === 'parabola')
        k = 3;
    else
        k = 2;
    return (factorVariance / (k - 1)) / (residualVariance / (n - k));
};
export default calculateFisherCriterion;

const calculateRegressionEquation = (regressionType) => {
    if (regressionType === 'straight') {
        return `f(x) = a0 + a1 * x`;
    } else if (regressionType === 'parabola') {
        return `f(x) = a0 + a1 * x + a2 * x ^ 2`;
    } else if (regressionType === 'exponential') {
        return `f(x) = a0 * a1 ^ x`;
    } else if (regressionType === 'hyperbola') {
        return `f(x) = a0 + a1 / x`;
    } else if (regressionType === 'logarithmic') {
        return `f(x) = a0 + a1 * ln(x)`;
    } else {
        return 'Неизвестный тип регрессии';
    }
};
export default calculateRegressionEquation;
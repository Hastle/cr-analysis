const calculateElasticity = (xValues, a0, a1, a2, regressionType) => {
    const n = xValues.length;
    const meanX = xValues.reduce((sum, value) => sum + value, 0) / n;
    const meanXX = xValues.reduce((sum, value) => sum + Math.pow(value, 2), 0) / n;
    if (regressionType === 'straight') {
        return (a1 * meanX) / (a0 + a1 * meanX) ;
    } else if (regressionType === 'parabola') {
        return (a1 + 2 * a2 * meanX) * meanX / (a0 + a1 * meanX + a2 * meanXX);
    } else if (regressionType === 'exponential') {
        return meanX * Math.log(a1);
    } else if (regressionType === 'hyperbola') {
        return -a1 / (a0 * meanX + a1);
    } else if (regressionType === 'logarithmic') {
        return a1 / (a0 + a1 * Math.log(meanX));
    }
};
export default calculateElasticity;
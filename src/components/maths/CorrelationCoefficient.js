const calculateCorrelationCoefficient = (xValues, yValues) => {
    const n = xValues.length;
    const meanX = xValues.reduce((sum, value) => sum + value, 0) / n;
    const meanY = yValues.reduce((sum, value) => sum + value, 0) / n;
    const deviationsX = xValues.map((value) => value - meanX);
    const deviationsY = yValues.map((value) => value - meanY);
    const sumDeviationProduct = deviationsX.reduce((sum, deviationX, index) => sum + deviationX * deviationsY[index], 0);
    const sumSquaredDeviationsX = deviationsX.reduce((sum, deviation) => sum + Math.pow(deviation, 2), 0);
    const sumSquaredDeviationsY = deviationsY.reduce((sum, deviation) => sum + Math.pow(deviation, 2), 0);
    return sumDeviationProduct / (Math.sqrt(sumSquaredDeviationsX) * Math.sqrt(sumSquaredDeviationsY));
};
export default calculateCorrelationCoefficient;
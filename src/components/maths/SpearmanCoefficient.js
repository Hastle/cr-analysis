const calculateSpearmanCoefficient = (dataArr) => {
    const sortedX = dataArr.map((item) => item.X).sort((a, b) => a - b);
    const sortedY = dataArr.map((item) => item.Y).sort((a, b) => a - b);
    const ranksX = dataArr.map((item) => sortedX.indexOf(item.X) + 1);
    const ranksY = dataArr.map((item) => sortedY.indexOf(item.Y) + 1);
    const squaredDifferences = ranksX.map((rankX, index) => Math.pow(rankX - ranksY[index], 2));
    const sumSquaredDifferences = squaredDifferences.reduce((sum, difference) => sum + difference, 0);
    return 1 - (6 * sumSquaredDifferences) / (dataArr.length * (Math.pow(dataArr.length, 2) - 1));
};
export default calculateSpearmanCoefficient;
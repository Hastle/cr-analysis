const calculateRegressionCoefficients = (xValues, yValues, regressionType) => {
    const n = xValues.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;


    let a0, a1, a2;

    if (regressionType === 'straight') {
        for (let i = 0; i < n; i++) {
            const x = xValues[i];
            const y = yValues[i];
            const xSquared = x * x;

            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += xSquared;
        }
        const determinant = n * sumXX - sumX * sumX;
        a1 = (n * sumXY - sumX * sumY) / determinant;
        a0 = (sumY - a1 * sumX) / n;
    } else if (regressionType === 'parabola') {
        a0 = 0;
        a1 = 0;
        a2 = 0;
    } else if (regressionType === 'exponential') {
        let sumXlnY = 0;
        let sumXX = 0;
        let sumX = 0;
        let sumlnY = 0;

        for (let i = 0; i < n; i++) {
            const x = xValues[i];
            const y = yValues[i];
            const lnY = Math.log(y);

            sumXlnY += x * lnY;
            sumXX += x * x;
            sumX += x;
            sumlnY += lnY;
        }

        const lnA1 = (n * sumXlnY - sumX * sumlnY) / (n * sumXX - sumX * sumX);
        const lnA0 = (sumlnY - lnA1 * sumX) / n;

        a1 = Math.exp(lnA1);
        a0 = Math.exp(lnA0);
    }
    else if (regressionType === 'hyperbola') {
        for (let i = 0; i < n; i++) {
            const x = 1 / xValues[i]; // Transform x values for hyperbolic regression
            const y = yValues[i];

            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += x * x;
        }
        const determinant = n * sumXX - sumX * sumX;
        a1 = (n * sumXY - sumX * sumY) / determinant;
        a0 = (sumY - a1 * sumX) / n;
    } else if (regressionType === 'logarithmic') {
        for (let i = 0; i < n; i++) {
            const x = Math.log(xValues[i]); // Transform x values for logarithmic regression
            const y = yValues[i];

            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += x * x;
        }
        const determinant = n * sumXX - sumX * sumX;
        a1 = (n * sumXY - sumX * sumY) / determinant;
        a0 = (sumY - a1 * sumX) / n;
    } else {
        throw new Error('Неверный тип регрессии');
    }

    return { a0, a1, a2 };
};

export default calculateRegressionCoefficients;

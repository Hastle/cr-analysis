const calculateRegressionCoefficients = (xValues, yValues, regressionType) => {
    const n = xValues.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXXY = 0;
    let sumXX = 0;
    let sumXXX = 0;
    let sumXXXX = 0;
    let sumXlnY = 0;
    let sumlnY = 0;


    let a0, a1, a2;

    if (regressionType === 'straight') {
        for (let i = 0; i < n; i++) {
            const x = xValues[i];
            const y = yValues[i];
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += x * x;
        }

        const determinant = n * sumXX - sumX * sumX;

        a1 = (n * sumXY - sumX * sumY) / determinant;
        a0 = (sumY - a1 * sumX) / n;
    } else if (regressionType === 'parabola') {
        for (let i = 0; i < n; i++) {
            const x = xValues[i];
            const y = yValues[i];
            sumX += x;
            sumXX += x * x;
            sumXXX += x * x * x;
            sumY += y;
            sumXY += x * y;
            sumXXY += x * x * y;
            sumXXXX += x * x * x * x;
        }
        sumX = sumX / n;
        sumXX = sumXX / n;
        sumXXX = sumXXX / n;
        sumY = sumY / n;
        sumXY = sumXY / n;
        sumXXY = sumXXY / n;
        sumXXXX = sumXXXX / n;

        const determinant = (sumXX * sumXXXX - sumXXX * sumXXX) - (sumX * (sumX * sumXXXX - sumXX * sumXXX)) + (sumXX * (sumX * sumXXX - sumXX * sumXX));
        const detA0 = sumY * (sumXX * sumXXXX - sumXXX * sumXXX) - (sumX * (sumXY * sumXXXX - sumXXY * sumXXX)) + (sumXX * (sumXY * sumXXX - sumXXY * sumXX));
        const detA1 = (sumXY * sumXXXX - sumXXY * sumXXX) - (sumY * (sumX * sumXXXX - sumXX * sumXXX)) + (sumXX * (sumX * sumXXY - sumXX * sumXY));
        const detA2 = (sumXX * sumXXY - sumXXX * sumXY) - (sumX * (sumX * sumXXY - sumXX * sumXY)) + (sumY * (sumX * sumXXX - sumXX * sumXX));

        a0 = detA0 / determinant;
        a1 = detA1 / determinant;
        a2 = detA2 / determinant;
    } else if (regressionType === 'exponential') {
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

import * as jstat from "jstat";

const getFTableValue = (alpha, regressionType, n) => {
    let k;
    if (regressionType === 'parabola')
        k = 3;
    else
        k = 2;
    return jstat.centralF.inv(1 - alpha, k - 1, n);
};
export default getFTableValue;

const significanceLevel = (tTable, correlationSignificant, dataArr) => {
    let result = "";
    const n = dataArr.length;

    if (n < 30) {
        if (correlationSignificant > tTable) {
            result = "значим";
        } else {
            result = "незначим";
        }
    } else {
        if (correlationSignificant > 3) {
            result = "значим";
        } else {
            result = "незначим";
        }
    }
    return result;
}
export default significanceLevel;
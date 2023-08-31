import * as jstat from "jstat";

const calculateTTable = (alpha, n) => {
    return jstat.studentt.inv(1 - alpha / 2, n - 2);
};
export default calculateTTable;
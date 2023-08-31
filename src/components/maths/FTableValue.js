const getFTableValue = (alpha, k, n) => {
    // This is a placeholder implementation and should be replaced with an actual table lookup
    // The values returned here are only for demonstration purposes and may not be accurate
    if (alpha === 0.05) {
        if (k === 1 && n === 10) {
            return 4.96;
        } else if (k === 2 && n === 10) {
            return 3.46;
        } else if (k === 1 && n === 20) {
            return 4.13;
        } else if (k === 2 && n === 20) {
            return 3.17;
        }
    }
    return null;
};
export default getFTableValue;
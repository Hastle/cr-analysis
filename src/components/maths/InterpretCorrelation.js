const interpretCorrelation = (correlationCoefficient) => {
    if (correlationCoefficient > 0.7) {
        return 'прямая сильная';
    } else if (correlationCoefficient > 0.3) {
        return 'прямая средней силы';
    } else if (correlationCoefficient > 0) {
        return 'прямая слабая';
    } else if (correlationCoefficient < -0.7) {
        return 'обратная сильная';
    } else if (correlationCoefficient < -0.5) {
        return 'обратная средней силы';
    } else if (correlationCoefficient < -0.3) {
        return 'обратная слабая';
    } else {
        return 'нет значимой корреляции';
    }
};
export default interpretCorrelation;
const interpretSpearman = (spearmanCoefficient) => {
    if (spearmanCoefficient > 0.7) {
        return 'прямая сильная';
    } else if (spearmanCoefficient > 0.3) {
        return 'прямая средней силы';
    } else if (spearmanCoefficient > 0) {
        return 'прямая слабая';
    } else if (spearmanCoefficient === 0) {
        return 'связь отсутствует';
    } else if (spearmanCoefficient < -0.7) {
        return 'обратная сильная';
    } else if (spearmanCoefficient < -0.5) {
        return 'обратная средней силы';
    } else if (spearmanCoefficient < -0.3) {
        return 'обратная слабая';
    } else {
        return 'нет значимой корреляции';
    }
};
export default interpretSpearman;
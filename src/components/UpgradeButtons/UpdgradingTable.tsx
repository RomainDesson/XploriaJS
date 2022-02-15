export const getCostToUpgrade = (level: number) => {
    if (level >= 1 && level < 10) {
        return 50;
    }
    if (level >= 10 && level < 20) {
        return 100;
    }
    return 100000000;
};

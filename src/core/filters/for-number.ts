export const filterForNumbers = <T extends string>(value: T) => {
    return /^\d+$/gim.test(value);
};

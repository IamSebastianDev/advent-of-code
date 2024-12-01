export const range = (start: number, end: number, inclusive = true): number[] => {
	return Array.from({ length: end + (inclusive ? 1 : 0) - start }, (_, idx) => idx + start);
};

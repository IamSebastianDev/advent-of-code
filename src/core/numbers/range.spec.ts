import { describe, expect, it } from 'bun:test';
import { range } from './range';

describe('range', () => {
	it('should return a range of numbers inclusive of the end by default', () => {
		const start = 1;
		const end = 5;
		const result = range(start, end);
		const expected = [1, 2, 3, 4, 5];

		expect(result).toEqual(expected);
	});

	it('should return a range of numbers exclusive of the end when inclusive is false', () => {
		const start = 1;
		const end = 5;
		const result = range(start, end, false);
		const expected = [1, 2, 3, 4];

		expect(result).toEqual(expected);
	});

	it('should return a single-element array if start equals end and inclusive is true', () => {
		const start = 3;
		const end = 3;
		const result = range(start, end);
		const expected = [3];

		expect(result).toEqual(expected);
	});

	it('should return an empty array if start equals end and inclusive is false', () => {
		const start = 3;
		const end = 3;
		const result = range(start, end, false);
		const expected: never[] = [];

		expect(result).toEqual(expected);
	});

	it('should handle negative numbers in the range', () => {
		const start = -3;
		const end = 2;
		const result = range(start, end);
		const expected = [-3, -2, -1, 0, 1, 2];

		expect(result).toEqual(expected);
	});

	it('should handle a descending range with inclusive set to true', () => {
		const start = 5;
		const end = 1;
		const result = range(start, end);
		const expected: never[] = [];

		expect(result).toEqual(expected);
	});

	it('should return an empty array for a descending range even when inclusive is false', () => {
		const start = 5;
		const end = 1;
		const result = range(start, end, false);
		const expected: never[] = [];

		expect(result).toEqual(expected);
	});
});

import { describe, expect, it } from 'bun:test';
import { getDistance } from './get-distance';

describe('getDistance', () => {
	it('should return the absolute difference when num2 is greater than num1', () => {
		const num1 = 5;
		const num2 = 10;
		const result = getDistance(num1, num2);
		const expected = 5;

		expect(result).toBe(expected);
	});

	it('should return the absolute difference when num1 is greater than num2', () => {
		const num1 = 10;
		const num2 = 5;
		const result = getDistance(num1, num2);
		const expected = 5;

		expect(result).toBe(expected);
	});

	it('should return 0 when num1 and num2 are equal', () => {
		const num1 = 7;
		const num2 = 7;
		const result = getDistance(num1, num2);
		const expected = 0;

		expect(result).toBe(expected);
	});

	it('should return the correct distance when one of the numbers is negative', () => {
		const num1 = -5;
		const num2 = 10;
		const result = getDistance(num1, num2);
		const expected = 15;

		expect(result).toBe(expected);
	});

	it('should return the correct distance when both numbers are negative', () => {
		const num1 = -10;
		const num2 = -5;
		const result = getDistance(num1, num2);
		const expected = 5;

		expect(result).toBe(expected);
	});
});

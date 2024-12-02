import { describe, expect, it } from 'bun:test';
import { green, red } from 'kolorist';
import { formatForAdvent } from './for-advent';

describe('formatForAdvent', () => {
	it('should format a string with alternating red and green colors', () => {
		const input = 'Advent';
		const result = formatForAdvent(input);

		const expected = `🎄 ${red('A')}${green('d')}${red('v')}${green('e')}${red('n')}${green('t')} 🎄`;

		expect(result).toBe(expected);
	});

	it('should format an empty string correctly', () => {
		const input = '';
		const result = formatForAdvent(input);

		const expected = '🎄  🎄';
		expect(result).toBe(expected);
	});

	it('should handle a single character string', () => {
		const input = 'X';
		const result = formatForAdvent(input);

		const expected = `🎄 ${red('X')} 🎄`;
		expect(result).toBe(expected);
	});

	it('should handle a string with only spaces', () => {
		const input = '   ';
		const result = formatForAdvent(input);

		const expected = `🎄 ${red(' ')}${green(' ')}${red(' ')} 🎄`;
		expect(result).toBe(expected);
	});

	it('should handle strings with special characters', () => {
		const input = '🎅🎄✨';
		const result = formatForAdvent(input);

		const expected = `🎄 ${red('🎅')}${green('🎄')}${red('✨')} 🎄`;
		expect(result).toBe(expected);
	});
});

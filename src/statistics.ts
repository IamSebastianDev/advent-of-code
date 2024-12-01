// We want to render out 24 starts, which are either color less or filled,
// depending on the number of solved elements. We need to check for and
// create the runner if it exists, then parse the number. After that
// we can render our own leaderboard.

import { bold, gray, yellow } from 'kolorist';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import prompts from 'prompts';
import { filterForNumbers } from './core/filters/for-number';
import { formatForAdvent } from './core/format/for-advent';
import { range } from './core/numbers/range';
import type { Run } from './core/run';

// To get started, we check for which year the statistics should be
// displayed
const years = (await readdir(import.meta.dir)).filter(filterForNumbers);
const { year } = await prompts({
	name: 'year',
	type: 'select',
	message: `Select which year's statistics you'd like to see`,
	choices: [
		...years.map((year) => ({
			title: year,
			value: year,
		})),
	],
});

const lines = [['Solved first: 	'], ['Solved second: 	']];

// Now that we know for which year we need to scan, we can get the filename
// for each day and check if a runner exists
for (const day of range(1, 24)) {
	const path = join(import.meta.dir, year, `${day}`.padStart(2, '0'));
	try {
		const Runner: new (...args: [string, string]) => Run = await import(path).then((file) => file.default);
		const runner = new Runner(year, `${day}`);

		switch (runner.solved) {
			case 1:
				lines[0].push(gray(yellow('*')));
				lines[1].push(gray(bold('*')));
				break;
			case 2:
				lines[0].push(gray(yellow('*')));
				lines[1].push(gray(yellow('*')));
				break;
			default:
				lines[0].push(gray(bold('*')));
				lines[1].push(gray(bold('*')));
				break;
		}
	} catch (e) {
		// If no runner was found or misconstructed, render
		// two empty stars
		lines[0].push(gray(bold('*')));
		lines[1].push(gray(bold('*')));
	}
}

// Log the lines
console.clear();
console.log(bold(formatForAdvent(`Solution for AOC: [${year}]:[Overview]`)), '\n');
console.log(lines[0].join(''));
console.log(lines[1].join(''));

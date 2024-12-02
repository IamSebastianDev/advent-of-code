import { bold, yellow } from 'kolorist';
import { readdirSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import prompts from 'prompts';
import { filterForNumbers } from './core/filters/for-number';
import type { Run } from './core/run';

// Read all directories, remove the core directory
// and present the other directories as list of options
const years = (await readdir(import.meta.dir)).filter(filterForNumbers);
const { year, day } = await prompts([
	{
		name: 'year',
		type: 'select',
		message: 'Select the year to run',
		choices: [
			...years.map((year) => ({
				title: year,
				value: year,
			})),
		],
	},
	{
		name: 'day',
		type: 'select',
		message: 'Select day to run',
		choices: (prev: string) => {
			const content = readdirSync(join(import.meta.dir, prev));
			if (!content.includes('inputs')) {
				console.log(bold(yellow(`WARNING: No input directory found for ${prev}`)));
				return null;
			}

			// Construct the days
			const days = content.filter((file) => file !== 'inputs');

			if (days.length === 0) {
				return null;
			}

			return [
				...days
					// sort and reverse should ensure that the current day is up top
					.sort()
					.reverse()
					.map((day) => ({
						title: `Day ${day.replace('.ts', '')}`,
						value: day,
					})),
			];
		},
	},
]);

// Check if both year and day are supplied
if (!year || !day) {
	console.log(bold(yellow('WARNING: Could not resolve correct runner. Either missing year, day or inputs.')));
	process.exit(1);
}

// Otherwise, we fetch the file and execute it
type RunCtor = new (...args: [year: string, day: string]) => Run;
const Runner: RunCtor = await import(join(import.meta.dir, year, day)).then((file) => file.default);

// Check if a runner exists
if (!Runner) {
	console.warn(yellow(bold('File has no export. Create a runner.')));
	process.exit(1);
}

const runner = new Runner(year, day);
await runner.run();

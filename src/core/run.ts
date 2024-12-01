import { bold, yellow } from 'kolorist';
import { exists, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { formatForAdvent } from './format/for-advent';

export abstract class Run {
	readonly year: string;
	readonly day: string;

	constructor(year: string, day: string) {
		this.year = year;
		this.day = day.replace('.ts', '').padStart(2, '0');

		// check if all input files exist
		this.assertInputFiles();
	}

	private async assertInputFiles() {
		await Promise.all(
			[1].map(async (solution) => {
				const file = this.getFileNameForSolution(solution);
				if (!(await exists(file))) {
					console.log(bold(yellow(`WARNING: Missing input file for solution ${solution}`)));
				}
			}),
		);
	}

	private getFileNameForSolution(solution: number) {
		return join(process.cwd(), 'src', this.year, 'inputs', this.day, 'input.txt');
	}

	private async getFileContent(solution: number) {
		try {
			return await readFile(this.getFileNameForSolution(solution), 'utf-8');
		} catch (e) {
			throw new Error('No input file found.');
		}
	}

	async run() {
		console.clear();
		console.log(bold(formatForAdvent(`Solution for AOC: [${this.year}]:[${this.day}]`)), '\n');
		console.log(bold('Solution 1:'));
		console.log(await this.getSolutionOne(await this.getFileContent(1)), '\n');
		console.log(bold('Solution 2:'));
		console.log(await this.getSolutionTwo(await this.getFileContent(2)), '\n');
	}

	// To be implement per day
	abstract getSolutionOne(file: string): Promise<string> | string;
	abstract getSolutionTwo(file: string): Promise<string> | string;
}

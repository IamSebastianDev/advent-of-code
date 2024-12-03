import { Run } from '../core/run';

export default class extends Run {
	solvedPuzzleOne = true;
	getSolutionOne(file: string): string {
		const regexp = /mul\(\d+\,\d+\)/gim;
		return [...file.matchAll(regexp)]
			.map(([match]) => [...match.matchAll(/\d+/gim)].map(([match]) => Number.parseInt(match)))
			.map(([first, second]) => first * second)
			.reduce((acc, cur) => acc + cur, 0)
			.toString();
	}

	solvedPuzzleTwo = true;
	getSolutionTwo(file: string): string {
		// This time, we want to process the file first,
		// by getting all instructions that start with a do()
		// and all instructions that start with a dont() (which
		// we can discard)

		// We also want to single out the start of the file,
		// as that is enabled by default
		const [start, ...sections] = file.split("don't()");

		// After splitting the file into sections, we want to go
		// iterate over the sections, and split them by 'do()',
		// then discard the first part and keep just the second,
		// if the second part is not empty
		const parsed = sections.map((section) => {
			const [discard, ...keep] = section.split('do()');
			return keep.join('');
		});

		return this.getSolutionOne([start, ...parsed].join(''));
	}
}

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

	solvedPuzzleTwo = false;
	getSolutionTwo(file: string): string {
		return '';
	}
}

import { Files } from '../core/files';
import { Run } from '../core/run';

export default class extends Run {
	private processFile(file: string) {
		const lines = Files.getLines(file);
	}

	solvedPuzzleOne = false;
	getSolutionOne(file: string): string {
		return '';
	}

	solvedPuzzleTwo = false;
	getSolutionTwo(file: string): string {
		return '';
	}
}

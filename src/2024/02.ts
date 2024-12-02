import { getLines } from '../core/file/get-lines';
import { getDistance } from '../core/numbers/get-distance';
import { Run } from '../core/run';

export default class extends Run {
	private processFile(file: string) {
		// we need to split and map the input
		// into two different arrays, that can then
		// be sorted and evaluated
		const lines = getLines(file);
		return lines.map((line) => line.split(' ').map((entry) => Number.parseInt(entry)));
	}

	private checkSequence(seq: number[]): boolean {
		// A sequence is deemed safe if the following two conditions are met:
		// - The sequence is always rising or falling
		// - The distance between two entries is at least one and at most 3;
		const startDirection = seq[0] - seq[1] > 0;
		let start = seq.shift();

		if (!start) {
			return false;
		}

		let safe = true;
		while (seq.length && safe) {
			const current = seq.shift();
			if (!current) {
				break;
			}

			const currentDirection = start - current > 0;

			if (startDirection !== currentDirection) {
				safe = false;
				break;
			}

			const distance = getDistance(start, current);
			if (distance < 1 || distance > 3) {
				safe = false;
				break;
			}

			start = current;
		}

		return safe;
	}

	solvedPuzzleOne = true;
	getSolutionOne(file: string): string {
		// We get the file and split all the input numbers into
		// Sequences of numbers, that we can then process
		const sequences = this.processFile(file);

		let safeSequences = 0;
		// We want to iterate all sequences, and depending on
		// if the sequence is deemed safe or not, increase the counter
		for (const sequence of sequences) {
			if (this.checkSequence(sequence)) {
				safeSequences++;
			}
		}

		return safeSequences.toString();
	}

	private checkDampenedSequences(seq: number[]) {
		let hasSafeSequence = false;
		for (let i = 0; i < seq.length; i++) {
			const dampened = [...seq].toSpliced(i, 1);
			if (this.checkSequence(dampened)) {
				hasSafeSequence = true;
			}
		}
		return hasSafeSequence;
	}

	solvedPuzzleTwo = false;
	getSolutionTwo(file: string): string {
		// We get the file and split all the input numbers into
		// Sequences of numbers, that we can then process
		const sequences = this.processFile(file);

		let safeSequences = 0;
		// We want to iterate all sequences, and depending on
		// if the sequence is deemed safe or not, increase the counter
		for (const sequence of sequences) {
			if (this.checkDampenedSequences(sequence)) {
				safeSequences++;
			}
		}

		return safeSequences.toString();
	}
}

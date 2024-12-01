import { getLines } from '../core/file/get-lines';
import { getDistance } from '../core/numbers/get-distance';
import { Run } from '../core/run';

export default class extends Run {
	private processFile(file: string) {
		// we need to split and map the input
		// into two different arrays, that can then
		// be sorted and evaluated
		const lines = getLines(file);
		const leftNumbers: number[] = [];
		const rightNumbers: number[] = [];

		for (const line of lines) {
			const [left, right] = line.split('   ');
			leftNumbers.push(Number.parseInt(left));
			rightNumbers.push(Number.parseInt(right));
		}

		return [leftNumbers, rightNumbers];
	}

	getSolutionOne(file: string): string {
		const [left, right] = this.processFile(file);

		const leftSorted = left.sort();
		const rightSorted = right.sort();
		const distances: number[] = [];

		for (let i = 0; i < leftSorted.length; i++) {
			distances.push(getDistance(leftSorted[i], rightSorted[i]));
		}

		return distances.reduce((acc, cur) => acc + cur, 0).toString();
	}

	getSolutionTwo(file: string): string {
		const [left, right] = this.processFile(file);

		// Create a map of the number of times the
		// left list numbers appear in the right list
		const map = new Map<number, number>(
			left.map((number) => {
				return [number, (right.filter((right) => right === number) ?? []).length];
			}),
		);

		return [...map.entries()].reduce((acc, [num, cur]) => acc + num * cur, 0).toString();
	}
}

import { red } from 'kolorist';
import { Files } from '../core/files';
import { Run } from '../core/run';

export default class extends Run {
	private symbols: Record<string, 'CLEAR' | 'OBSTACLE'> = {
		'.': 'CLEAR',
		'#': 'OBSTACLE',
	};

	private directions: Record<string, [number, number]> = {
		'^': [0, -1],
		'>': [1, 0],
		v: [0, 1],
		'<': [-1, 0],
	};

	private processFile(file: string) {
		const lines = Files.getLines(file);

		// convert the input to a coordinate map
		const map = new Map<string, string>([
			...lines.flatMap((line, yIdx) =>
				line
					.split('')
					// This might be a windows specific thingy
					.filter((char) => char !== '\r')
					.map((char, xIdx, array) => {
						return [`${xIdx}:${yIdx}`, this.symbols[char] ?? char] as const;
					}),
			),
		]);

		return map;
	}

	private getNextPosition(current: [number, number], direction: [number, number]) {
		const next = [current[0] + direction[0], current[1] + direction[1]];
		const key = `${next[0]}:${next[1]}`;

		return key;
	}

	private convertToPosition(pos: string) {
		return pos.split(':').map((v) => Number.parseInt(v)) as [number, number];
	}

	private getNextDirection([curX, curY]: [number, number]) {
		const idx = Object.entries(this.directions).findIndex(([_, [x, y]]) => x === curX && y === curY);
		if (idx === -1) {
			throw Error('Direction not valid');
		}

		if (idx === 3) {
			return Object.values(this.directions)[0];
		}

		return Object.values(this.directions)[idx + 1];
	}

	solvedPuzzleOne = true;
	getSolutionOne(file: string): string {
		const map = this.processFile(file);

		const origin = [...map.entries()].find(([_, entry]) => Object.keys(this.directions).includes(entry));

		if (!origin) {
			console.log(red('No origin found'));
			process.exit(0);
		}

		const [startPosition, char] = origin;
		const navigatedCells = new Set<string>(startPosition);

		let currentPosition = this.convertToPosition(startPosition);
		let currentDirection = this.directions[char];

		const next = () => {
			const nextPosition = this.getNextPosition(currentPosition, currentDirection);
			const type = map.get(nextPosition);

			if (!type) {
				return false;
			}

			if (type === 'CLEAR' || Object.keys(this.directions).includes(type)) {
				currentPosition = this.convertToPosition(nextPosition);
				navigatedCells.add(nextPosition);
			}

			if (type === 'OBSTACLE') {
				currentDirection = this.getNextDirection(currentDirection);
			}

			return true;
		};

		while (next()) {
			// console.log(navigatedCells);
		}

		return navigatedCells.size.toString();
	}

	solvedPuzzleTwo = false;
	getSolutionTwo(file: string): string {
		return '';
	}
}

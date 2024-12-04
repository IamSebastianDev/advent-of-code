import { Files } from '../core/files';
import { Run } from '../core/run';

const point = (x: number, y: number) => ({ x, y });
type Point = ReturnType<typeof point>;

export default class extends Run {
	private processFile(file: string) {
		return Files.getLines(file);
	}

	private matchPattern(
		pattern: (Point & { letter: string })[],
		[line, char]: [number, number],
		iterator: string[][],
	) {
		return pattern.every((entry) => {
			return iterator?.[line + entry.y]?.[char + entry.x] === entry.letter;
		});
	}

	private checkNeighbors(
		patterns: Set<(Point & { letter: string })[]>,
		[line, char]: [number, number],
		iterator: string[][],
	) {
		// We want to check the pattern to be true for each position in the iterator
		// that is marked as an X, which is is the start of the word. As we always
		// have that as known position, we can navigate from there.
		let matches = 0;
		for (const pattern of patterns) {
			if (this.matchPattern(pattern, [line, char], iterator)) {
				matches += 1;
			}
		}

		return matches;
	}

	private standardPatterns = new Set<(Point & { letter: 'M' | 'A' | 'S' })[]>([
		[
			// Diagonal Left Top
			{
				...point(-1, -1),
				letter: 'M',
			},
			{
				...point(-2, -2),
				letter: 'A',
			},
			{
				...point(-3, -3),
				letter: 'S',
			},
		],
		// Straight Top
		[
			{
				...point(0, -1),
				letter: 'M',
			},
			{
				...point(0, -2),
				letter: 'A',
			},
			{
				...point(0, -3),
				letter: 'S',
			},
		],
		// Diagonal Right Top
		[
			{
				...point(1, -1),
				letter: 'M',
			},
			{
				...point(2, -2),
				letter: 'A',
			},
			{
				...point(3, -3),
				letter: 'S',
			},
		],
		// Straight Left
		[
			{
				...point(-1, 0),
				letter: 'M',
			},
			{
				...point(-2, 0),
				letter: 'A',
			},
			{
				...point(-3, 0),
				letter: 'S',
			},
		],
		// Straight right
		[
			{
				...point(1, 0),
				letter: 'M',
			},
			{
				...point(2, 0),
				letter: 'A',
			},
			{
				...point(3, 0),
				letter: 'S',
			},
		],
		// Diagonal Left Bottom
		[
			{
				...point(-1, 1),
				letter: 'M',
			},
			{
				...point(-2, 2),
				letter: 'A',
			},
			{
				...point(-3, 3),
				letter: 'S',
			},
		],
		// Straight Bottom
		[
			{
				...point(0, 1),
				letter: 'M',
			},
			{
				...point(0, 2),
				letter: 'A',
			},
			{
				...point(0, 3),
				letter: 'S',
			},
		],
		// Diagonal Right Bottom
		[
			{
				...point(1, 1),
				letter: 'M',
			},
			{
				...point(2, 2),
				letter: 'A',
			},
			{
				...point(3, 3),
				letter: 'S',
			},
		],
	]);

	solvedPuzzleOne = true;
	getSolutionOne(file: string): string {
		const lines = this.processFile(file);
		const map = lines.map((line) => line.split(''));

		let matches = 0;
		for (let line = 0; line < map.length; line++) {
			for (let char = 0; char < map[line].length; char++) {
				if (map[line][char] === 'X') {
					matches += this.checkNeighbors(this.standardPatterns, [line, char], map);
				}
			}
		}

		return matches.toString();
	}

	private xmasPattern = new Set<(Point & { letter: 'S' | 'M' })[]>([
		// M.S
		// .A.
		// M.S
		[
			{
				...point(-1, -1),
				letter: 'M',
			},
			{
				...point(1, -1),
				letter: 'S',
			},
			{
				...point(-1, 1),
				letter: 'M',
			},
			{
				...point(1, 1),
				letter: 'S',
			},
		],
		// S.M
		// .A.
		// S.M
		[
			{
				...point(-1, -1),
				letter: 'S',
			},
			{
				...point(1, -1),
				letter: 'M',
			},
			{
				...point(-1, 1),
				letter: 'S',
			},
			{
				...point(1, 1),
				letter: 'M',
			},
		],
		// M.M
		// .A.
		// S.S
		[
			{
				...point(-1, -1),
				letter: 'M',
			},
			{
				...point(1, -1),
				letter: 'M',
			},
			{
				...point(-1, 1),
				letter: 'S',
			},
			{
				...point(1, 1),
				letter: 'S',
			},
		],
		// S.S
		// .A.
		// M.M
		[
			{
				...point(-1, -1),
				letter: 'S',
			},
			{
				...point(1, -1),
				letter: 'S',
			},
			{
				...point(-1, 1),
				letter: 'M',
			},
			{
				...point(1, 1),
				letter: 'M',
			},
		],
	]);

	solvedPuzzleTwo = true;
	getSolutionTwo(file: string): string {
		const lines = this.processFile(file);
		const map = lines.map((line) => line.split(''));

		let matches = 0;
		for (let line = 0; line < map.length; line++) {
			for (let char = 0; char < map[line].length; char++) {
				if (map[line][char] === 'A') {
					matches += this.checkNeighbors(this.xmasPattern, [line, char], map);
				}
			}
		}

		return matches.toString();
	}
}

import { getLines } from "../core/file/get-lines";
import { getDistance } from "../core/numbers/get-distance";
import { Run } from "../core/run";

export default class extends Run {
    getSolutionOne(file: string): string {
        // we need to split and map the input
        // into two different arrays, that can then
        // be sorted and evaluated
        const firstNumbers: number[] = [];
        const secondNumbers: number[] = [];

        // split the file into lines
        getLines(file).forEach((line) => {
            const [first, second] = line.split("   ");
            firstNumbers.push(parseInt(first));
            secondNumbers.push(parseInt(second));
        });

        const firstSorted = firstNumbers.sort();
        const secondSorted = secondNumbers.sort();
        const distances: number[] = [];

        for (let i = 0; i < firstSorted.length; i++) {
            distances.push(getDistance(firstSorted[i], secondSorted[i]));
        }

        return distances.reduce((acc, cur) => acc + cur, 0).toString();
    }

    getSolutionTwo(file: string): string {
        return file;
    }
}

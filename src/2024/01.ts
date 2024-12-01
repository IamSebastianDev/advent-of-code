import { getLines } from "../core/file/get-lines";
import { getDistance } from "../core/numbers/get-distance";
import { Run } from "../core/run";

export default class extends Run {
    getSolutionOne(file: string): string {
        // we need to split and map the input
        // into two different arrays, that can then
        // be sorted and evaluated
        const leftNumbers: number[] = [];
        const rightNumbers: number[] = [];

        // split the file into lines
        getLines(file).forEach((line) => {
            const [left, right] = line.split("   ");
            leftNumbers.push(parseInt(left));
            rightNumbers.push(parseInt(right));
        });

        const leftSorted = leftNumbers.sort();
        const rightSorted = rightNumbers.sort();
        const distances: number[] = [];

        for (let i = 0; i < leftSorted.length; i++) {
            distances.push(getDistance(leftSorted[i], rightSorted[i]));
        }

        return distances.reduce((acc, cur) => acc + cur, 0).toString();
    }

    getSolutionTwo(file: string): string {
        return "file";
    }
}

import { bold } from "kolorist";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { formatForAdvent } from "./format/for-advent";

export abstract class Run {
    readonly year: string;
    readonly day: string;

    constructor(year: string, day: string) {
        this.year = year;
        this.day = day.replace(".ts", "").padStart(2, "0");
    }
    abstract getSolutionOne(file: string): string;
    abstract getSolutionTwo(file: string): string;

    async getFile(solution: number) {
        const fileName = join(process.cwd(), "src", this.year, "inputs", this.day, `input.${solution}.txt`);

        return await readFile(fileName, "utf-8");
    }

    async run() {
        // Run reporter
        console.clear();
        console.log(bold(formatForAdvent(`Solution for AOC: [${this.year}]:[${this.day}]`)));
        console.log("");
        console.log(bold("Solution 1:"));
        console.log(this.getSolutionOne(await this.getFile(1)));
        console.log("");
        console.log(bold("Solution 2:"));
        console.log(this.getSolutionTwo(await this.getFile(2)));
    }
}

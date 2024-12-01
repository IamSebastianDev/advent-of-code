import { readdirSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import prompts from "prompts";
import { filterForNumbers } from "./core/filters/for-number";
import type { Run } from "./core/run";

// Read all directories, remove the core directory
// and present the other directories as list of options
const years = (await readdir(import.meta.dir)).filter(filterForNumbers);
const { year, day } = await prompts([
    {
        name: "year",
        type: "select",
        message: "Select the year to run",
        choices: [
            ...years.map((year) => ({
                title: year,
                value: year,
            })),
        ],
    },
    {
        name: "day",
        type: "select",
        message: "Select day to run",
        choices: (prev: string) => {
            const days = readdirSync(join(import.meta.dir, prev)).filter((file) => file !== "inputs");

            if (days.length === 0) {
                return null;
            }

            return [
                ...days.map((day) => ({
                    title: day,
                    value: day,
                })),
            ];
        },
    },
]);

// Check if both year and day are supplied
if (!year || !day) {
    throw new Error(`No runner specified`);
    process.exit(1);
}

// Otherwise, we fetch the file and execute it
console.log({ year, day });
const runner: new (...args: any[]) => Run = await import(join(import.meta.dir, year, day)).then((file) => file.default);
new runner(year, day).run();

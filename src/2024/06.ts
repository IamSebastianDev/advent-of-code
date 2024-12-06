import { red } from "kolorist";
import { Files } from "../core/files";
import { Run } from "../core/run";

export default class extends Run {
  private symbols: Record<string, "CLEAR" | "OBSTACLE"> = {
    ".": "CLEAR",
    "#": "OBSTACLE",
  };

  private directions: Record<string, [number, number]> = {
    "^": [0, -1],
    ">": [1, 0],
    "<": [-1, 0],
    v: [0, 1],
  };

  private processFile(file: string) {
    const lines = Files.getLines(file);

    // convert the input to a coordinate map
    const map = new Map<string, string>([
      ...lines.flatMap((line, yIdx) =>
        line
          .split("")
          // This might be a windows specific thingy
          .filter((char) => char !== "\r")
          .map((char, xIdx, array) => {
            return [`${xIdx}:${yIdx}`, this.symbols[char] ?? char] as const;
          })
      ),
    ]);

    return map;
  }

  solvedPuzzleOne = false;
  getSolutionOne(file: string): string {
    const map = this.processFile(file);

    const origin = [...map.entries()].find(([_, entry]) =>
      Object.keys(this.directions).includes(entry)
    );

    if (!origin) {
      console.log(red("No origin found"));
      process.exit(0);
    }

    const [startPosition, char] = origin;
    const startDirection = this.directions[char];
    const navigatedCells: string[] = [];

    console.log({ startDirection, startPosition });

    return "";
  }

  solvedPuzzleTwo = false;
  getSolutionTwo(file: string): string {
    return "";
  }
}

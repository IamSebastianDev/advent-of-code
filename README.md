# @iasd/aoc

This is my current [Advent of Code](https://adventofcode.com) project. The setup currently comprises of a Runner and a small CLI to let you select a specific day to run. This will also ensure that a input file exists.

## How to

To install dependencies (After installing Bun):

```bash
bun install
```

Add the input to the corresponding day into the correct input directory. Per year, there is a `inputs` directory. Add the day in the format `0{day}` or `{day}{day}` as directory. Then place a single `input.txt` file with your puzzle input inside. This should enable the CLI to run the respective day.

```bash
bun run solve
```

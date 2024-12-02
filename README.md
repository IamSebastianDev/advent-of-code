# @iasd/aoc 🎄

This is my current [Advent of Code](https://adventofcode.com) project. The setup currently comprises of a Runner and a small CLI to let you select a specific day to run. There are certain checks that make sure that a input file exists

## Installing

You need to install [Bun](https://bun.sh) as primary runtime. You can then run `bun install` to install the workspace dependencies.

## Setup

The runner expects a `input.txt` file in the corresponding directory. For `2024/01.ts`, there should be a corresponding entry in `2024/inputs/01/input.txt`. The CLI will give you a warning if no input can be found. After setting up your inputs, you can run the CLI.

## Running the solver

Run the solver using:

```bash
# Run the CLI
bun run solve
```

This will prompt you for the `year` and `day` to solve. (And also check if the correct input is available.)

## Summary

You can run `bun run summary` to get a report of what puzzles are solved and which aren't.

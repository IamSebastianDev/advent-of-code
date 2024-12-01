import { green, red } from "kolorist";

export const formatForAdvent = (string: string) => {
    const isEven = (num: number) => num % 2 === 0;
    const [...chars] = string;
    return ["🎄", " ", ...chars.map((char, idx) => (isEven(idx) ? red(char) : green(char))), " ", "🎄"].join("");
};

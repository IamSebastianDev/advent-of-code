import { describe, expect, it } from "bun:test";
import { getLines } from "./get-lines";

describe("getLines", () => {
  it("should split a string into lines by newline characters", () => {
    const content = "line1\nline2\nline3";
    const result = getLines(content);
    expect(result).toEqual(["line1", "line2", "line3"]);
  });

  it("should return an array with one element if there are no newline characters", () => {
    const content = "single line";
    const result = getLines(content);
    expect(result).toEqual(["single line"]);
  });

  it("should return an empty array for an empty string", () => {
    const content = "";
    const result = getLines(content);
    expect(result).toEqual([""]);
  });

  it("should handle strings with consecutive newline characters", () => {
    const content = "line1\n\nline3";
    const result = getLines(content);
    expect(result).toEqual(["line1", "", "line3"]);
  });

  it("should handle strings ending with a newline character", () => {
    const content = "line1\nline2\n";
    const result = getLines(content);
    expect(result).toEqual(["line1", "line2", ""]);
  });
});
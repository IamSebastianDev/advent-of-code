import { describe, expect, it } from "bun:test";
import { filterForNumbers } from "./for-number";

describe("filterForNumbers", () => {
  it("should return true for a string containing only digits", () => {
    const input = "12345";
    const result = filterForNumbers(input);
    expect(result).toBe(true);
  });

  it("should return false for a string containing letters", () => {
    const input = "abc123";
    const result = filterForNumbers(input);
    expect(result).toBe(false);
  });

  it("should return false for a string containing special characters", () => {
    const input = "123!@#";
    const result = filterForNumbers(input);
    expect(result).toBe(false);
  });

  it("should return false for an empty string", () => {
    const input = "";
    const result = filterForNumbers(input);
    expect(result).toBe(false);
  });

  it("should return false for a string with spaces", () => {
    const input = "123 456";
    const result = filterForNumbers(input);
    expect(result).toBe(false);
  });

  it("should return true for a string of digits with leading zeros", () => {
    const input = "00123";
    const result = filterForNumbers(input);
    expect(result).toBe(true);
  });

  it("should return false for a string with only spaces", () => {
    const input = "   ";
    const result = filterForNumbers(input);
    expect(result).toBe(false);
  });

  it("should return false for a string containing only newlines", () => {
    const input = "\n";
    const result = filterForNumbers(input);
    expect(result).toBe(false);
  });
});
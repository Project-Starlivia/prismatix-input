import { describe, it, expect } from "bun:test";
import { multiableToArray } from "../utils";

describe("multiableToArray", () => {
  it("should convert a single item to an array", () => {
    const result = multiableToArray("test");
    expect(result).toEqual(["test"]);
  });

  it("should return the same array when given an array", () => {
    const input = ["test1", "test2"];
    const result = multiableToArray(input);
    expect(result).toEqual(["test1", "test2"]);
  });

  it("should handle numbers", () => {
    const result = multiableToArray(42);
    expect(result).toEqual([42]);
  });

  it("should handle array of numbers", () => {
    const input = [1, 2, 3];
    const result = multiableToArray(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should handle empty array", () => {
    const input: string[] = [];
    const result = multiableToArray(input);
    expect(result).toEqual([]);
  });

  it("should handle null and undefined", () => {
    const resultNull = multiableToArray(null);
    expect(resultNull).toEqual([null]);

    const resultUndefined = multiableToArray(undefined);
    expect(resultUndefined).toEqual([undefined]);
  });

  it("should handle objects", () => {
    const obj = { key: "value" };
    const result = multiableToArray(obj);
    expect(result).toEqual([obj]);
  });

  it("should preserve readonly array type", () => {
    const input = ["a", "b", "c"] as const;
    const result = multiableToArray(input);
    expect(result).toEqual(["a", "b", "c"]);
  });
});
import { describe, it, expect } from "bun:test";
import { isEventBySetUndef } from "../utils";

describe("isEventBySetUndef", () => {
  it("should return true when set is undefined", () => {
    const result = isEventBySetUndef(undefined, "any-value");
    expect(result).toBe(true);
  });

  it("should return true when value exists in set", () => {
    const set = new Set(["a", "b", "c"]);
    const result = isEventBySetUndef(set, "b");
    expect(result).toBe(true);
  });

  it("should return false when value does not exist in set", () => {
    const set = new Set(["a", "b", "c"]);
    const result = isEventBySetUndef(set, "d");
    expect(result).toBe(false);
  });

  it("should work with number sets", () => {
    const set = new Set([1, 2, 3]);
    expect(isEventBySetUndef(set, 2)).toBe(true);
    expect(isEventBySetUndef(set, 4)).toBe(false);
  });

  it("should work with empty set", () => {
    const set = new Set<string>();
    const result = isEventBySetUndef(set, "any-value");
    expect(result).toBe(false);
  });

  it("should handle complex objects in set", () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const set = new Set([obj1, obj2]);
    
    expect(isEventBySetUndef(set, obj1)).toBe(true);
    expect(isEventBySetUndef(set, obj2)).toBe(true);
    expect(isEventBySetUndef(set, { id: 1 })).toBe(false); // Different object reference
  });

  it("should handle null and undefined values", () => {
    const set = new Set([null, undefined, "value"]);
    
    expect(isEventBySetUndef(set, null)).toBe(true);
    expect(isEventBySetUndef(set, undefined)).toBe(true);
    expect(isEventBySetUndef(set, "value")).toBe(true);
    expect(isEventBySetUndef(set, "other")).toBe(false);
  });
});
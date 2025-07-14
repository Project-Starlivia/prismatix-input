import { describe, it, expect, beforeEach } from "bun:test";
import { KeyboardInputBase, KeyboardInput, KeyboardInputCode } from "../keyboard";
import type { KeyboardInputOptions } from "../keyboard";
import type { PRXEvent, MultiSubject } from "../../types";

// Mock subject for testing
class MockSubject<T> {
  private events: T[] = [];

  next(event: T) {
    this.events.push(event);
  }

  getEvents() {
    return [...this.events];
  }

  clear() {
    this.events = [];
  }
}

describe("Keyboard Input Filters", () => {
  let mockSubject: MockSubject<PRXEvent>;
  let mockTarget: EventTarget;

  beforeEach(() => {
    mockSubject = new MockSubject<PRXEvent>();
    mockTarget = {
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true
    };
  });

  describe("KeyboardInput filtering", () => {
    it("should filter by key when keys option is provided", () => {
      const keyboard = new KeyboardInput(mockSubject as any, {
        target: mockTarget,
        filters: {
          key: ["a", "b"]
        }
      });

      // Test keyFilter method directly
      const keyboardBase = keyboard as any;
      expect(keyboardBase.keyFilter("a")).toBe(true);
      expect(keyboardBase.keyFilter("b")).toBe(true);
      expect(keyboardBase.keyFilter("c")).toBe(false);
    });

    it("should filter by code when codes option is provided", () => {
      const keyboard = new KeyboardInput(mockSubject as any, {
        target: mockTarget,
        filters: {
          code: ["KeyA", "KeyB"]
        }
      });

      const keyboardBase = keyboard as any;
      expect(keyboardBase.codeFilter("KeyA")).toBe(true);
      expect(keyboardBase.codeFilter("KeyB")).toBe(true);
      expect(keyboardBase.codeFilter("KeyC")).toBe(false);
    });

    it("should allow all keys when no key filter is provided", () => {
      const keyboard = new KeyboardInput(mockSubject as any, {
        target: mockTarget
      });

      const keyboardBase = keyboard as any;
      expect(keyboardBase.keyFilter("a")).toBe(true);
      expect(keyboardBase.keyFilter("Enter")).toBe(true);
      expect(keyboardBase.keyFilter("Escape")).toBe(true);
    });

    it("should allow all codes when no code filter is provided", () => {
      const keyboard = new KeyboardInput(mockSubject as any, {
        target: mockTarget
      });

      const keyboardBase = keyboard as any;
      expect(keyboardBase.codeFilter("KeyA")).toBe(true);
      expect(keyboardBase.codeFilter("Enter")).toBe(true);
      expect(keyboardBase.codeFilter("Escape")).toBe(true);
    });

    it("should handle single key/code as filter", () => {
      const keyboard = new KeyboardInput(mockSubject as any, {
        target: mockTarget,
        filters: {
          key: "a",
          code: "KeyA"
        }
      });

      const keyboardBase = keyboard as any;
      expect(keyboardBase.keyFilter("a")).toBe(true);
      expect(keyboardBase.keyFilter("b")).toBe(false);
      expect(keyboardBase.codeFilter("KeyA")).toBe(true);
      expect(keyboardBase.codeFilter("KeyB")).toBe(false);
    });
  });

  describe("Event type filtering", () => {
    it("should check for keydown events correctly", () => {
      const keyboard = new KeyboardInput(mockSubject as any, {
        target: mockTarget,
        events: ["keydown"]
      });

      const keyboardBase = keyboard as any;
      expect(keyboardBase.hasEvent("keydown")).toBe(true);
      expect(keyboardBase.hasEvent("keyup")).toBe(false);
      expect(keyboardBase.hasEvent("keydown-repeat")).toBe(false);
    });

    it("should check for keyup events correctly", () => {
      const keyboard = new KeyboardInput(mockSubject as any, {
        target: mockTarget,
        events: ["keyup"]
      });

      const keyboardBase = keyboard as any;
      expect(keyboardBase.hasEvent("keyup")).toBe(true);
      expect(keyboardBase.hasEvent("keydown")).toBe(false);
    });

    it("should handle multiple event types", () => {
      const keyboard = new KeyboardInput(mockSubject as any, {
        target: mockTarget,
        events: ["keydown", "keyup", "keydown-repeat"]
      });

      const keyboardBase = keyboard as any;
      expect(keyboardBase.hasEvent("keydown")).toBe(true);
      expect(keyboardBase.hasEvent("keyup")).toBe(true);
      expect(keyboardBase.hasEvent("keydown-repeat")).toBe(true);
      expect(keyboardBase.hasEvent("keydown-norepeat")).toBe(false);
    });
  });

  describe("KeyboardInputCode", () => {
    it("should create events with code as key", () => {
      const mockSubjectCode = new MockSubject<PRXEvent>();
      const keyboard = new KeyboardInputCode(mockSubjectCode as any, {
        target: mockTarget
      });

      // Test the mapEvent function indirectly by checking the constructor logic
      const keyboardBase = keyboard as any;
      const mockEvent = {
        code: "KeyA",
        key: "a",
        timeStamp: 123,
        repeat: false
      } as KeyboardEvent;

      const result = keyboardBase.mapEvent(mockEvent, "start");
      expect(result.key).toBe("KeyA"); // Should use code, not key
      expect(result.action).toBe("start");
      expect(result.time).toBe(123);
    });
  });
});

describe("Keyboard Input Event Mapping", () => {
  let mockSubject: MockSubject<PRXEvent>;
  let mockTarget: EventTarget;

  beforeEach(() => {
    mockSubject = new MockSubject<PRXEvent>();
    mockTarget = {
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true
    };
  });

  it("should map keyboard events correctly for KeyboardInput", () => {
    const keyboard = new KeyboardInput(mockSubject as any, {
      target: mockTarget
    });

    const keyboardBase = keyboard as any;
    const mockEvent = {
      key: "a",
      code: "KeyA",
      timeStamp: 123,
      repeat: false
    } as KeyboardEvent;

    const result = keyboardBase.mapEvent(mockEvent, "start");      expect(result).toEqual({
        key: "a",
        action: "start",
        time: 123
      });
  });

  it("should handle different actions", () => {
    const keyboard = new KeyboardInput(mockSubject as any, {
      target: mockTarget
    });

    const keyboardBase = keyboard as any;
    const mockEvent = {
      key: "Enter",
      code: "Enter",
      timeStamp: 456,
      repeat: false
    } as KeyboardEvent;

    const startResult = keyboardBase.mapEvent(mockEvent, "start");
    expect(startResult.action).toBe("start");

    const endResult = keyboardBase.mapEvent(mockEvent, "end");
    expect(endResult.action).toBe("end");

    const holdResult = keyboardBase.mapEvent(mockEvent, "hold");
    expect(holdResult.action).toBe("hold");
  });
});

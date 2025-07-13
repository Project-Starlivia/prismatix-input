import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { KeyboardInput, KeyboardInputCode } from "../input/keyboard";
import { MouseInput, MouseInputPosition } from "../input/mouse";
import type { KeyboardInputEvent } from "../input/keyboard";
import type { PRXEvent } from "../types";
import type { InputEventPosition } from "../input/types";

// Mock DOM implementation for testing
class MockEventTarget implements EventTarget {
  private listeners: Map<string, ((event: Event) => void)[]> = new Map();

  addEventListener(type: string, listener: (event: Event) => void): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(listener);
  }

  removeEventListener(type: string, listener: (event: Event) => void): void {
    const typeListeners = this.listeners.get(type);
    if (typeListeners) {
      const index = typeListeners.indexOf(listener);
      if (index > -1) {
        typeListeners.splice(index, 1);
      }
    }
  }

  dispatchEvent(event: Event): boolean {
    const typeListeners = this.listeners.get(event.type);
    if (typeListeners) {
      typeListeners.forEach(listener => listener(event));
    }
    return true;
  }

  // Helper method to simulate events
  simulateEvent(type: string, eventData: any): void {
    const event = {
      type,
      timeStamp: Date.now(),
      preventDefault: () => {},
      stopPropagation: () => {},
      ...eventData
    } as Event;
    this.dispatchEvent(event);
  }
}

// Mock subject that collects events
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

describe("Integration Tests - Keyboard Input", () => {
  let mockTarget: MockEventTarget;
  let mockSubject: MockSubject<KeyboardInputEvent>;
  let keyboardInput: KeyboardInput;

  beforeEach(() => {
    mockTarget = new MockEventTarget();
    mockSubject = new MockSubject<KeyboardInputEvent>();
    keyboardInput = new KeyboardInput(mockSubject as any, {
      target: mockTarget,
      events: ["keydown", "keyup"]
    });
  });

  afterEach(() => {
    keyboardInput.dispose();
  });

  it("should handle keydown events and generate correct events", () => {
    // Simulate a keydown event
    mockTarget.simulateEvent("keydown", {
      key: "a",
      code: "KeyA",
      repeat: false,
      timeStamp: 123
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: "a",
      code: "KeyA",
      action: "hold",
      time: 123
    });
  });

  it("should handle keyup events and generate correct events", () => {
    // Simulate a keyup event
    mockTarget.simulateEvent("keyup", {
      key: "Enter",
      code: "Enter",
      repeat: false,
      timeStamp: 456
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: "Enter",
      code: "Enter",
      action: "end",
      time: 456
    });
  });

  it("should filter events based on key filter", () => {
    // Create keyboard input with key filter
    keyboardInput.dispose();
    keyboardInput = new KeyboardInput(mockSubject as any, {
      target: mockTarget,
      events: ["keydown"],
      filters: {
        key: ["a", "b"]
      }
    });

    // Simulate allowed key
    mockTarget.simulateEvent("keydown", {
      key: "a",
      code: "KeyA",
      repeat: false,
      timeStamp: 100
    });

    // Simulate filtered key
    mockTarget.simulateEvent("keydown", {
      key: "c",
      code: "KeyC",
      repeat: false,
      timeStamp: 200
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0].key).toBe("a");
  });

  it("should filter events based on code filter", () => {
    keyboardInput.dispose();
    keyboardInput = new KeyboardInput(mockSubject as any, {
      target: mockTarget,
      events: ["keydown"],
      filters: {
        code: ["KeyA", "KeyB"]
      }
    });

    // Simulate allowed code
    mockTarget.simulateEvent("keydown", {
      key: "a",
      code: "KeyA",
      repeat: false,
      timeStamp: 100
    });

    // Simulate filtered code
    mockTarget.simulateEvent("keydown", {
      key: "c",
      code: "KeyC",
      repeat: false,
      timeStamp: 200
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0].code).toBe("KeyA");
  });

  it("should handle repeat events correctly", () => {
    keyboardInput.dispose();
    keyboardInput = new KeyboardInput(mockSubject as any, {
      target: mockTarget,
      events: ["keydown", "keydown-repeat", "keydown-norepeat"]
    });

    // Simulate non-repeat keydown
    mockTarget.simulateEvent("keydown", {
      key: "a",
      code: "KeyA",
      repeat: false,
      timeStamp: 100
    });

    // Simulate repeat keydown
    mockTarget.simulateEvent("keydown", {
      key: "a",
      code: "KeyA",
      repeat: true,
      timeStamp: 200
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(4); // keydown + keydown-norepeat, then keydown + keydown-repeat

    // First event (non-repeat)
    expect(events[0].action).toBe("hold");
    expect(events[1].action).toBe("start"); // keydown-norepeat

    // Second event (repeat)
    expect(events[2].action).toBe("hold");
    expect(events[3].action).toBe("hold"); // keydown-repeat
  });
});

describe("Integration Tests - Mouse Input", () => {
  let mockTarget: MockEventTarget;
  let mockSubject: MockSubject<PRXEvent>;
  let mouseInput: MouseInput;

  beforeEach(() => {
    mockTarget = new MockEventTarget();
    mockSubject = new MockSubject<PRXEvent>();
    mouseInput = new MouseInput(mockSubject as any, {
      target: mockTarget,
      events: ["mousedown", "mouseup", "click"]
    });
  });

  afterEach(() => {
    mouseInput.dispose();
  });

  it("should handle mouse events and generate correct events", () => {
    // Simulate a mousedown event
    mockTarget.simulateEvent("mousedown", {
      button: 0,
      buttons: 1,
      x: 100,
      y: 200,
      timeStamp: 123
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: "0",
      action: "start",
      time: 123
    });
  });

  it("should filter events based on button filter", () => {
    // Create a fresh mock subject for this test
    const testMockSubject = new MockSubject<PRXEvent>();
    mouseInput.dispose();
    mouseInput = new MouseInput(testMockSubject as any, {
      target: mockTarget,
      events: ["mousedown"],
      filters: {
        button: 0 // Only left button
      }
    });

    // Simulate allowed button
    mockTarget.simulateEvent("mousedown", {
      button: 0,
      buttons: 1,
      timeStamp: 100
    });

    // Simulate filtered button
    mockTarget.simulateEvent("mousedown", {
      button: 2,
      buttons: 2,
      timeStamp: 200
    });

    const events = testMockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0].key).toBe("0");
  });

  it("should filter events based on buttons filter", () => {
    mouseInput.dispose();
    mouseInput = new MouseInput(mockSubject as any, {
      target: mockTarget,
      events: ["mousedown"],
      filters: {
        buttons: 1 // Only left button pressed
      }
    });

    // Simulate allowed buttons state
    mockTarget.simulateEvent("mousedown", {
      button: 0,
      buttons: 1,
      timeStamp: 100
    });

    // Simulate filtered buttons state
    mockTarget.simulateEvent("mousedown", {
      button: 0,
      buttons: 3, // Left + right buttons
      timeStamp: 200
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0].key).toBe("0");
  });
});

describe("Integration Tests - Mouse Position Input", () => {
  let mockTarget: MockEventTarget;
  let mockSubject: MockSubject<InputEventPosition>;
  let mouseInput: MouseInputPosition;

  beforeEach(() => {
    mockTarget = new MockEventTarget();
    mockSubject = new MockSubject<InputEventPosition>();
    mouseInput = new MouseInputPosition(mockSubject as any, {
      target: mockTarget,
      events: ["mousemove", "mousedown"]
    });
  });

  afterEach(() => {
    mouseInput.dispose();
  });

  it("should include position data in events", () => {
    // Simulate a mousemove event with position
    mockTarget.simulateEvent("mousemove", {
      button: 0,
      buttons: 0,
      x: 150,
      y: 250,
      timeStamp: 123
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: "0",
      action: "move",
      time: 123,
      x: 150,
      y: 250
    });
  });

  it("should handle mousedown with position", () => {
    mockTarget.simulateEvent("mousedown", {
      button: 1,
      buttons: 4,
      x: 300,
      y: 400,
      timeStamp: 456
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: "1",
      action: "start",
      time: 456,
      x: 300,
      y: 400
    });
  });
});

describe("Integration Tests - Multiple Subjects", () => {
  let mockTarget: MockEventTarget;
  let mockSubject1: MockSubject<KeyboardInputEvent>;
  let mockSubject2: MockSubject<KeyboardInputEvent>;
  let keyboardInput: KeyboardInput;

  beforeEach(() => {
    mockTarget = new MockEventTarget();
    mockSubject1 = new MockSubject<KeyboardInputEvent>();
    mockSubject2 = new MockSubject<KeyboardInputEvent>();
    keyboardInput = new KeyboardInput([mockSubject1, mockSubject2] as any, {
      target: mockTarget,
      events: ["keydown"]
    });
  });

  afterEach(() => {
    keyboardInput.dispose();
  });

  it("should send events to multiple subjects", () => {
    mockTarget.simulateEvent("keydown", {
      key: "a",
      code: "KeyA",
      repeat: false,
      timeStamp: 123
    });

    const events1 = mockSubject1.getEvents();
    const events2 = mockSubject2.getEvents();

    expect(events1).toHaveLength(1);
    expect(events2).toHaveLength(1);
    expect(events1[0]).toEqual(events2[0]);
    expect(events1[0].key).toBe("a");
  });
});

describe("Integration Tests - Disposal", () => {
  let mockTarget: MockEventTarget;
  let mockSubject: MockSubject<KeyboardInputEvent>;

  beforeEach(() => {
    mockTarget = new MockEventTarget();
    mockSubject = new MockSubject<KeyboardInputEvent>();
  });

  it("should stop receiving events after disposal", () => {
    const keyboardInput = new KeyboardInput(mockSubject as any, {
      target: mockTarget,
      events: ["keydown"]
    });

    // Send event before disposal
    mockTarget.simulateEvent("keydown", {
      key: "a",
      code: "KeyA",
      repeat: false,
      timeStamp: 100
    });

    expect(mockSubject.getEvents()).toHaveLength(1);

    // Dispose and send another event
    keyboardInput.dispose();
    mockTarget.simulateEvent("keydown", {
      key: "b",
      code: "KeyB",
      repeat: false,
      timeStamp: 200
    });

    // Should still have only 1 event
    expect(mockSubject.getEvents()).toHaveLength(1);
  });
});

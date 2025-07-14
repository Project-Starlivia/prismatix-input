import { describe, it, expect, beforeEach } from "bun:test";
import { MouseInput, MouseInputButtons, MouseInputPosition, MouseInputFull } from "../mouse";
import type { MouseInputOptions } from "../mouse";
import type { PRXEvent } from "../../types";
import type { InputEventPosition } from "../types";

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

describe("Mouse Input Filters", () => {
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

  describe("Button filtering", () => {
    it("should filter by single button", () => {
      // Create a fresh mock subject for this test
      const testMockSubject = new MockSubject<PRXEvent>();

      // Create a mock event target that can simulate events
      const mockEventTarget = {
        addEventListener: (type: string, listener: (event: Event) => void) => {
          if (type === "mousedown") {
            // Simulate left button click (should pass filter)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 1,
              timeStamp: 100
            } as any);

            // Simulate right button click (should be filtered out)
            listener({
              type: "mousedown", 
              button: 2,
              buttons: 2,
              timeStamp: 200
            } as any);
          }
        },
        removeEventListener: () => {},
        dispatchEvent: () => true
      };

      const mouse = new MouseInput(testMockSubject as any, {
        target: mockEventTarget,
        events: ["mousedown"],
        filters: {
          button: 0 // Left button only
        }
      });

      const events = testMockSubject.getEvents();
      expect(events).toHaveLength(1); // Only left button event should pass
      expect(events[0].key).toBe("0");

      mouse.dispose();
    });

    it("should filter by multiple buttons", () => {
      const mockEventTarget = {
        addEventListener: (type: string, listener: (event: Event) => void) => {
          if (type === "mousedown") {
            // Simulate left button (should pass)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 1,
              timeStamp: 100
            } as any);

            // Simulate middle button (should pass)
            listener({
              type: "mousedown",
              button: 1,
              buttons: 4,
              timeStamp: 200
            } as any);

            // Simulate right button (should be filtered)
            listener({
              type: "mousedown",
              button: 2,
              buttons: 2,
              timeStamp: 300
            } as any);
          }
        },
        removeEventListener: () => {},
        dispatchEvent: () => true
      };

      const mouse = new MouseInput(mockSubject as any, {
        target: mockEventTarget,
        events: ["mousedown"],
        filters: {
          button: [0, 1] // Left and middle buttons
        }
      });

      const events = mockSubject.getEvents();
      expect(events).toHaveLength(2); // Left and middle button events should pass
      expect(events[0].key).toBe("0");
      expect(events[1].key).toBe("1");

      mouse.dispose();
    });

    it("should allow all buttons when no button filter is provided", () => {
      const mockEventTarget = {
        addEventListener: (type: string, listener: (event: Event) => void) => {
          if (type === "mousedown") {
            // Simulate all button types (all should pass)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 1,
              timeStamp: 100
            } as any);

            listener({
              type: "mousedown",
              button: 1,
              buttons: 4,
              timeStamp: 200
            } as any);

            listener({
              type: "mousedown",
              button: 2,
              buttons: 2,
              timeStamp: 300
            } as any);
          }
        },
        removeEventListener: () => {},
        dispatchEvent: () => true
      };

      const mouse = new MouseInput(mockSubject as any, {
        target: mockEventTarget,
        events: ["mousedown"]
      });

      const events = mockSubject.getEvents();
      expect(events).toHaveLength(3); // All button events should pass
      expect(events[0].key).toBe("0");
      expect(events[1].key).toBe("1");
      expect(events[2].key).toBe("2");

      mouse.dispose();
    });
  });

  describe("Buttons filtering", () => {
    it("should filter by single buttons value", () => {
      const mockEventTarget = {
        addEventListener: (type: string, listener: (event: Event) => void) => {
          if (type === "mousedown") {
            // Simulate left button only (should pass)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 1,
              timeStamp: 100
            } as any);

            // Simulate left and right buttons (should be filtered)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 3,
              timeStamp: 200
            } as any);

            // Simulate no buttons (should be filtered)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 0,
              timeStamp: 300
            } as any);
          }
        },
        removeEventListener: () => {},
        dispatchEvent: () => true
      };

      const mouse = new MouseInput(mockSubject as any, {
        target: mockEventTarget,
        events: ["mousedown"],
        filters: {
          buttons: 1 // Only left button pressed
        }
      });

      const events = mockSubject.getEvents();
      expect(events).toHaveLength(1); // Only left button only event should pass
      expect(events[0].key).toBe("0");

      mouse.dispose();
    });

    it("should filter by multiple buttons values", () => {
      const mockEventTarget = {
        addEventListener: (type: string, listener: (event: Event) => void) => {
          if (type === "mousedown") {
            // Simulate left button only (should pass)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 1,
              timeStamp: 100
            } as any);

            // Simulate right button only (should pass)
            listener({
              type: "mousedown",
              button: 2,
              buttons: 2,
              timeStamp: 200
            } as any);

            // Simulate left and right buttons (should be filtered)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 3,
              timeStamp: 300
            } as any);
          }
        },
        removeEventListener: () => {},
        dispatchEvent: () => true
      };

      const mouse = new MouseInput(mockSubject as any, {
        target: mockEventTarget,
        events: ["mousedown"],
        filters: {
          buttons: [1, 2] // Left button only or right button only
        }
      });

      const events = mockSubject.getEvents();
      expect(events).toHaveLength(2); // Left only and right only should pass
      expect(events[0].key).toBe("0");
      expect(events[1].key).toBe("2");

      mouse.dispose();
    });

    it("should allow all buttons values when no buttons filter is provided", () => {
      const mockEventTarget = {
        addEventListener: (type: string, listener: (event: Event) => void) => {
          if (type === "mousedown") {
            // Simulate different buttons states (all should pass)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 1,
              timeStamp: 100
            } as any);

            listener({
              type: "mousedown",
              button: 0,
              buttons: 3,
              timeStamp: 200
            } as any);

            listener({
              type: "mousedown",
              button: 0,
              buttons: 0,
              timeStamp: 300
            } as any);
          }
        },
        removeEventListener: () => {},
        dispatchEvent: () => true
      };

      const mouse = new MouseInput(mockSubject as any, {
        target: mockEventTarget,
        events: ["mousedown"]
      });

      const events = mockSubject.getEvents();
      expect(events).toHaveLength(3); // All button states should pass
      expect(events[0].key).toBe("0");
      expect(events[1].key).toBe("0");
      expect(events[2].key).toBe("0");

      mouse.dispose();
    });
  });

  describe("Combined filtering", () => {
    it("should filter by both button and buttons", () => {
      // Create a fresh mock subject for this test
      const testMockSubject = new MockSubject<PRXEvent>();

      const mockEventTarget = {
        addEventListener: (type: string, listener: (event: Event) => void) => {
          if (type === "mousedown") {
            // Valid event (should pass)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 1,
              timeStamp: 100
            } as any);

            // Wrong button (should be filtered)
            listener({
              type: "mousedown",
              button: 2,
              buttons: 1,
              timeStamp: 200
            } as any);

            // Wrong buttons state (should be filtered)
            listener({
              type: "mousedown",
              button: 0,
              buttons: 3,
              timeStamp: 300
            } as any);
          }
        },
        removeEventListener: () => {},
        dispatchEvent: () => true
      };

      const mouse = new MouseInput(testMockSubject as any, {
        target: mockEventTarget,
        events: ["mousedown"],
        filters: {
          button: 0, // Left button
          buttons: 1 // Only left button pressed
        }
      });

      const events = testMockSubject.getEvents();
      expect(events).toHaveLength(1); // Only valid event should pass
      expect(events[0].key).toBe("0");

      mouse.dispose();
    });
  });
});

describe("Mouse Input Event Mapping", () => {
  let mockSubject: MockSubject<PRXEvent>;

  beforeEach(() => {
    mockSubject = new MockSubject<PRXEvent>();
  });

  it("should map mouse events correctly for MouseInput", () => {
    const mockEventTarget = {
      addEventListener: (type: string, listener: (event: Event) => void) => {
        if (type === "mousedown") {
          listener({
            type: "mousedown",
            button: 0,
            buttons: 1,
            timeStamp: 123,
            x: 100,
            y: 200
          } as any);
        }
      },
      removeEventListener: () => {},
      dispatchEvent: () => true
    };

    const mouse = new MouseInput(mockSubject as any, {
      target: mockEventTarget,
      events: ["mousedown"]
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: "0",
      action: "start",
      time: 123
    });

    mouse.dispose();
  });

  it("should map mouse events correctly for MouseInputButtons", () => {
    const mockSubjectButtons = new MockSubject<any>();
    const mockEventTarget = {
      addEventListener: (type: string, listener: (event: Event) => void) => {
        if (type === "mouseup") {
          listener({
            type: "mouseup",            button: 1,
            buttons: 4,
            timeStamp: 456,
            clientX: 150,
            clientY: 250
          } as any);
        }
      },
      removeEventListener: () => {},
      dispatchEvent: () => true
    };

    const mouse = new MouseInputButtons(mockSubjectButtons as any, {
      target: mockEventTarget,
      events: ["mouseup"]
    });

    const events = mockSubjectButtons.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: "1",
      action: "end",
      time: 456,
      buttons: 4
    });

    mouse.dispose();
  });

  it("should map mouse events correctly for MouseInputPosition", () => {
    const mockSubjectPosition = new MockSubject<InputEventPosition>();
    const mockEventTarget = {
      addEventListener: (type: string, listener: (event: Event) => void) => {
        if (type === "mousemove") {
          listener({
            type: "mousemove",            button: 2,
            buttons: 2,
            timeStamp: 789,
            clientX: 300,
            clientY: 400
          } as any);
        }
      },
      removeEventListener: () => {},
      dispatchEvent: () => true
    };

    const mouse = new MouseInputPosition(mockSubjectPosition as any, {
      target: mockEventTarget,
      events: ["mousemove"]
    });

    const events = mockSubjectPosition.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: "2",
      action: "move",
      time: 789,
      x: 300,
      y: 400
    });

    mouse.dispose();
  });

  it("should handle different mouse button values", () => {
    const mockEventTarget = {
      addEventListener: (type: string, listener: (event: Event) => void) => {
        if (type === "mousedown") {
          // Test different button values
          listener({
            type: "mousedown",
            button: 0,
            timeStamp: 100
          } as any);

          listener({
            type: "mousedown",
            button: 1,
            timeStamp: 200
          } as any);

          listener({
            type: "mousedown",
            button: 2,
            timeStamp: 300
          } as any);
        }
      },
      removeEventListener: () => {},
      dispatchEvent: () => true
    };

    const mouse = new MouseInput(mockSubject as any, {
      target: mockEventTarget,
      events: ["mousedown"]
    });

    const events = mockSubject.getEvents();
    expect(events).toHaveLength(3);
    expect(events[0].key).toBe("0");
    expect(events[1].key).toBe("1");
    expect(events[2].key).toBe("2");

    mouse.dispose();
  });
});

describe("Mouse Event Types", () => {
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

  it("should handle custom event types", () => {
    const mouse = new MouseInput(mockSubject as any, {
      target: mockTarget,
      events: ["click", "mousedown"]
    });

    // The mouse input should be configured with only the specified events
    // This is tested indirectly through the constructor behavior
    expect(mouse).toBeDefined();
  });

  it("should handle single event type", () => {
    const mouse = new MouseInput(mockSubject as any, {
      target: mockTarget,
      events: "click"
    });

    expect(mouse).toBeDefined();
  });
});

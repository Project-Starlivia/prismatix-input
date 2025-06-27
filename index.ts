import mitt, { Emitter } from "mitt";
import {WithPositionInputEvent} from "~/input";
import { KeyboardInputEvent } from "~/input/keyboard";
import {DurationInputEvent} from "~/middleware/duration";
import {createSubject} from "~/mitt";


type Events = {
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
  duration: DurationInputEvent;
};

// Create event emitter and subjects
const emitter = mitt<Events & { global: KeyboardInputEvent | WithPositionInputEvent | DurationInputEvent }>();
const globalSubject = createSubject(emitter, 'global');
const mouseSubject = createSubject(emitter, 'mouse');
const keyboardSubject = createSubject(emitter, 'keyboard');
const durationSubject = createSubject(emitter, 'duration');


// Test the store functionality
console.log("Store created successfully!");
console.log("Environment check - window exists:", typeof window !== 'undefined');

// Test subject functionality
const testEvent = {
    key: "test",
    action: "start" as const,
    time: Date.now(),
    x: 100,
    y: 200
};

mouseSubject.next(testEvent);

// Test global subject directly
globalSubject.next(testEvent);

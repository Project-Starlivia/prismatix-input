import {keyboardInput, pointerInputWithPosition} from "./src/web-native";
import type { KeyboardInputOptions, KeyboardInputEvent } from "./src/web-native";
import {createSubject} from "./src/mitt";
import type { WithPositionInputEvent } from "./src/web-native";
import {repeatInput, startToEndDurationInput} from "./src/middleware";
import type {
    DurationInputEvent,
    RepeatInputEvent
} from "./src/middleware";
import mitt from "mitt";
import type { Subject } from "./src/subject";

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
console.log("After adding test event to mouseSubject - Log entries:", store.log.length);

// Test global subject directly
globalSubject.next(testEvent);
console.log("After adding test event to globalSubject - Log entries:", store.log.length);

// Test cleanup
store.dispose();
console.log("Store disposed successfully!");

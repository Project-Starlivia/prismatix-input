import {createKeyboardInput, createPointerInputWithPosition} from "../src/web-native";
import type { KeyboardInputOptions, KeyboardInputEvent } from "../src/web-native";
import {createAllSubjects, createSubject} from "../src/mitt";
import type { WithPositionInputEvent } from "../src/web-native";
import {createStartToEndDurationMiddleware} from "../src/middleware";
import type {
    DurationInputEvent,
} from "../src/middleware";
import mitt from "mitt";
import {Subject} from "../src/subject";

type Events = {
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
  duration: DurationInputEvent;
  global: KeyboardInputEvent | WithPositionInputEvent | DurationInputEvent;
};

// Create event emitter and subjects
const { mouse, keyboard, duration, global } = createAllSubjects<Events>();

createKeyboardInput([keyboard], { events: "keyup" });

// Set up logging
const logElement = document.getElementById('log') as HTMLElement;
let logCount = 0;

function updateLog(message: string) {
    logCount++;
    const timestamp = new Date().toLocaleTimeString();
    logElement.textContent += `[${timestamp}] ${message}\n`;
    logElement.scrollTop = logElement.scrollHeight;
}

// Make clearLog available globally
(window as any).clearLog = () => {
    logElement.textContent = '';
    logCount = 0;
    updateLog('Log cleared');
};

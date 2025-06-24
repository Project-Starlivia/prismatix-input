import {keyboardInput, pointerInputWithPosition} from "../src/web-native";
import type { KeyboardInputOptions, KeyboardInputEvent } from "../src/web-native";
import {createSubject} from "../src/mitt";
import type { WithPositionInputEvent } from "../src/web-native";
import {startToEndDurationInput} from "../src/middleware";
import type {
    DurationInputEvent,
} from "../src/middleware";
import mitt from "mitt";

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

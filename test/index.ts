import {createKeyboardInput, createMouseInput, createPointerInputWithPosition} from "../src/web-native";
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
const { mouse, keyboard, duration } = createAllSubjects<Events>();

createKeyboardInput(keyboard);
createMouseInput(mouse);

// Set up logging
const logElement = document.getElementById('log') as HTMLElement;

function updateLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    logElement.textContent += `[${timestamp}] ${message}\n`;
    logElement.scrollTop = logElement.scrollHeight;
}

keyboard.subscribe(event => {
    updateLog(`Keyboard event: ${JSON.stringify(event)}`);
});

mouse.subscribe(event => {
    updateLog(`Mouse event: ${JSON.stringify(event)}`);
});
import mitt, { Emitter } from "mitt";
import type {WithPositionInputEvent} from "~/input";
import {createKeyboardInput, KeyboardInputEvent} from "~/input/keyboard";
import {DurationInputEvent} from "~/middleware/duration";
import {createKeycodePositionMiddleware} from "~/middleware/keycode-position";
import { createSubject } from "~/mitt-ex";
import { PRXSubject } from "~/types";

type Events = {
    position: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
  duration: DurationInputEvent;
  global: KeyboardInputEvent | WithPositionInputEvent | DurationInputEvent;
};

// Create event emitter and subjects
const emitter = mitt<Events>();
const keyboard = createSubject(emitter, "keyboard") as PRXSubject<KeyboardInputEvent>;
const position = createSubject(emitter, "position") as PRXSubject<WithPositionInputEvent>;
createKeyboardInput(keyboard);
createKeycodePositionMiddleware(keyboard, position);

// Set up logging
const logElement = document.getElementById('log') as HTMLElement;

function updateLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    logElement.textContent += `[${timestamp}] ${message}\n`;
    logElement.scrollTop = logElement.scrollHeight;
}
function clearLog() {
    logElement.textContent = '';
}

keyboard.subscribe(event => {
    updateLog(`Keyboard event: ${JSON.stringify(event)}`);
});

position.subscribe(event => {
    updateLog(`Position event: ${JSON.stringify(event)}`);
});



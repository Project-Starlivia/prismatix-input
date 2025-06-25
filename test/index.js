import mitt from "mitt";
import { createKeyboardInput } from "~/input/keyboard";
import { createKeycodePositionMiddleware } from "~/middleware/keycode-position";
import { createSubject } from "~/mitt";
// Create event emitter and subjects
const emitter = mitt();
const keyboard = createSubject(emitter, "keyboard");
const position = createSubject(emitter, "position");
createKeyboardInput(keyboard);
createKeycodePositionMiddleware(keyboard, position);
// Set up logging
const logElement = document.getElementById('log');
function updateLog(message) {
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

import { keyboardBasicInput, type KeyboardInputEvent, type KeyboardInputOptions } from "./pure/keyboard";
import { createStore } from "./mitt-ex";
import type { PRXInputEvent } from "./types";

type Events = {
    global: PRXInputEvent | KeyboardInputEvent;
    keyboard: KeyboardInputEvent;
}

const store = createStore<Events>()
  .addEmitterMit<KeyboardInputOptions, KeyboardInputEvent>(keyboardBasicInput, { actions: ["keyboard"], option: { events: 'keydown' } })
store.keyboard.subscribe((v) => {
    console.log("mouse", v);
});
store.global.subscribe((v) => {
    console.log("global", v);
});
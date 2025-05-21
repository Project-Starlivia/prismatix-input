import { keyboardBasicInput, type KeyboardInputEvent, type KeyboardInputOptions } from "./src/pure/keyboard";
import { createStore } from "./src/mitt-ex";
import type { PRXInputEvent } from "./src/types";

type Events = {
    global: PRXInputEvent | KeyboardInputEvent;
    keyboard: KeyboardInputEvent;
}

const store = createStore<Events>()
  .addEmitter(keyboardBasicInput, { actions: ["keyboard"], option: { events: 'keydown' } as KeyboardInputOptions } )
store.keyboard.subscribe((v) => {
    console.log("mouse", v);
});
store.global.subscribe((v) => {
    console.log("global", v);
});
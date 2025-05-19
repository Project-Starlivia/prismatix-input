import mitt from "mitt";
import { keyboardBasicInput, type KeyboardInputOptions } from "./pure/keyboard";
import { createStore, createSubject } from "./mitt-ex";
import type { PRXInputEvent } from "./types";

type Events = {
    mouse: PRXInputEvent;
    global: PRXInputEvent;
    keyboard: PRXInputEvent;
}

const { keyboard, ...store } = createStore<Events>()
  .addEmitter<KeyboardInputOptions>(keyboardBasicInput, { actions: ["keyboard"], option: { events: 'keydown' } });
store.mouse.subscribe((v) => {
    console.log("mouse", v);
});
keyboard.subscribe((v) => {
    console.log("keyboard", v);
});
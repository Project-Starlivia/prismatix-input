import { keyboardBasicInput, type KeyboardInputEvent, type KeyboardInputOptions } from "./src/pure/keyboard";
import { createStore, type WithGlobal } from "./src/mitt";
import type { MouseInputEvent } from "./src/pure/mouse";

type Events = WithGlobal<{
  keyboard: KeyboardInputEvent;
  mouse: MouseInputEvent;
}>;

const store = createStore<Events>()
  .addEmitter(keyboardBasicInput, { actions: ["keyboard"], option: { events: 'keydown' } as KeyboardInputOptions } )
console.log(store, store.keyboard);
store.keyboard.subscribe((v) => {
    console.log("keyboard", v);
});
store.global.subscribe((v) => {
    console.log("global", v);
});

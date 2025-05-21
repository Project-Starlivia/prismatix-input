import { keyboardNativeInput, type KeyboardInputEvent, type KeyboardInputOptions } from "./src/web-native/keyboard";
import { createLogStore, type WithGlobal } from "./src/mitt";
import type { MouseInputEvent } from "./src/web-native/mouse";

type Events = WithGlobal<{
  keyboard: KeyboardInputEvent;
  mouse: MouseInputEvent;
}>;

const store = createLogStore<Events>()
  .addEmitter(keyboardNativeInput, { actions: ["keyboard"], option: { events: 'keydown' } as KeyboardInputOptions } )
console.log(store, store.keyboard);
store.keyboard.subscribe((v) => {
    console.log("keyboard", v);
});
store.global.subscribe((v) => {
    console.log("global", v);
});

import { KeyboardInputEvent, keyboardNativeInput } from "./src/web-native/keyboard";
import { createLogStore, type WithGlobal } from "./src/mitt";
import { pointerNativeInput } from "./src/web-native/pointer";
import { MouseFullInputEvent, mouseFullInput, mouseInput } from "./src/web-native/mouse";
import type { PRXInputEvent } from "./src/events";
import type { WithPositionInputEvent } from "./src/web-native";

type Events = WithGlobal<{
  keyboard: KeyboardInputEvent;
  mouse: MouseFullInputEvent;
}>;

const h1 = document.getElementById('') as HTMLElement;
const store = createLogStore<Events>()
.addEmitter(mouseFullInput, { actions: ["mouse"], option: {
  target: h1
} })
.addEmitter(keyboardNativeInput, { actions: ["keyboard"] })
console.log(store, store.mouse);
store.keyboard.subscribe((v) => {
    console.log("key", v);
});
store.global.subscribe((v) => {
  console.log("global", v);
});

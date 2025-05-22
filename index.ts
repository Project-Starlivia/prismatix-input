import { KeyboardInputEvent, keyboardInput } from "./src/web-native/keyboard";
import { createLogStore, type WithGlobal } from "./src/mitt";
import { pointerInput, pointerInputWithPosition } from "./src/web-native/pointer";
import { mouseInput } from "./src/web-native/mouse";
import type { PRXInputEvent } from "./src/events";
import type { WithPositionInputEvent } from "./src/web-native";

type Events = WithGlobal<{
  keyboard: KeyboardInputEvent;
  mouse: WithPositionInputEvent;
}>;

const h1 = document.getElementById('') as HTMLElement;
const store = createLogStore<Events>()
.addEmitter(pointerInputWithPosition, { outEvents: "mouse", option: {  }})
.addEmitter(keyboardInput, { outEvents: ["keyboard"] })
console.log(store, store.mouse);
store.keyboard.subscribe((v) => {
    console.log("key", v);
});
store.global.subscribe((v) => {
  console.log("global", v);
});

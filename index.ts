import { keyboardInput, type KeyboardInputOptions, type KeyboardInputEvent } from "./src/web-native/keyboard";
import { createLogStore, type WithGlobal } from "./src/mitt";
import { pointerInputWithPosition } from "./src/web-native/pointer";
import type { WithPositionInputEvent } from "./src/web-native";

type Events = WithGlobal<{
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
}>;

const store = createLogStore<Events>()
  .addEmitter(keyboardInput, { outEvents: "keyboard", option: { events: ["keydown"] } as KeyboardInputOptions })
  .addEmitter(pointerInputWithPosition, { outEvents: ["mouse"] as const });

console.log(store, store.mouse);
store.keyboard.subscribe((v) => {
    console.log("key", v);
});
store.global.subscribe((v) => {
  console.log("global", v);
});

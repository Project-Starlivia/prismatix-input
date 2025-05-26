import { keyboardInput, pointerInputWithPosition } from "./src/web-native";
import type { KeyboardInputOptions, KeyboardInputEvent } from "./src/web-native";
import { createLogStore, type WithGlobal } from "./src/mitt";
import type { WithPositionInputEvent } from "./src/web-native";

type Events = WithGlobal<{
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
}>;

const store = createLogStore<Events>()
  .addEmitter(keyboardInput, { output: "keyboard", options: { events: ["keydown"] } as KeyboardInputOptions })
  .addEmitter(pointerInputWithPosition, { output: "mouse" });

console.log(store, store.mouse);
store.keyboard.subscribe((v) => {
    console.log("key", v);
});
store.global.subscribe((v) => {
  console.log("global", v);
});

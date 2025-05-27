import { keyboardInput, pointerInputWithPosition } from "./src/web-native";
import type { KeyboardInputOptions, KeyboardInputEvent } from "./src/web-native";
import { createLogStore, type WithGlobal } from "./src/mitt";
import type { WithPositionInputEvent } from "./src/web-native";
import {repeatInput, startToEndDurationInput} from "./src/Middleware";
import type {
    DurationInputEvent,
    RepeatInputEvent
} from "./src/Middleware";

type Events = WithGlobal<{
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
  duration: DurationInputEvent,
}>;

const store = createLogStore<Events>()
    .addEmitter(keyboardInput, { output: "keyboard", options: { events: ["keydown-norepeat", "keyup"] } as KeyboardInputOptions })
    .addMiddleware(startToEndDurationInput, { input: "mouse", output: "duration" })
    .addEmitter(pointerInputWithPosition, { output: "mouse" })

console.log(store, store.mouse);
store.keyboard.subscribe((v) => {
    console.log("key", v);
});
store.duration.subscribe((v) => {
  console.log(v);
})
store.global.subscribe((v) => {
  console.log("global", v);
});

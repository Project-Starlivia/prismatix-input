import { keyboardNativeInput } from "./src/web-native/keyboard";
import { createLogStore, type WithGlobal } from "./src/mitt";
import { pointerNativeInput } from "./src/web-native/pointer";
import type { PRXInputEvent } from "./src/events";
import type { WithPositionInputEvent } from "./src/web-native";

type Events = WithGlobal<{
  keyboard: PRXInputEvent;
  mouse: WithPositionInputEvent;
}>;

const store = createLogStore<Events>()
.addEmitter(pointerNativeInput, { actions: ["mouse"] })
.addEmitter(keyboardNativeInput, { actions: ["keyboard"] })
console.log(store, store.mouse);
store.global.subscribe((v) => {
    console.log("global", v);
});

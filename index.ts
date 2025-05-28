import {keyboardInput, KeyboardInputEmitter, pointerInputWithPosition} from "./src/web-native";
import type { KeyboardInputOptions, KeyboardInputEvent } from "./src/web-native";
import {createLogStore as createMittLogStore, createSubject, type WithGlobal} from "./src/mitt";
import type { WithPositionInputEvent } from "./src/web-native";
import {repeatInput, startToEndDurationInput} from "./src/Middleware";
import type {
    DurationInputEvent,
    RepeatInputEvent
} from "./src/Middleware";
import {createLogStore} from "./src/log-store";
import mitt, {Emitter} from "mitt";

type Events = WithGlobal<{
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
  duration: DurationInputEvent,
}>;

const store = createMittLogStore<Events>()
    .addEmitter(keyboardInput, { emitterId: "key", output: "keyboard", options: { events: ["keydown-norepeat", "keyup"] } as KeyboardInputOptions })
    .addMiddleware(startToEndDurationInput, { input: "mouse", output: "duration" })
    .addEmitter(pointerInputWithPosition, { output: "mouse" });

// These lines should now cause type errors
console.log(store.emitter.key.log());

// Instead, we can access the emitters and middleware correctly
console.log(store.emitter.ldlafjw);
console.log(store.miemitterddleware);

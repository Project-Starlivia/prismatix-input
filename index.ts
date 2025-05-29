import mitt from "mitt";

import type { KeyboardInputEvent } from "./src/web-native";
import type { WithPositionInputEvent } from "./src/web-native";
import type {
    DurationInputEvent,
    CounterInputEvent,
} from "./src/middleware";
import { createSubjects } from "./src/mitt";
import { keyboardInput } from "./src/web-native";
import { counterMiddleware } from "./src/middleware";

type Events = {
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
  countUp: CounterInputEvent;
  duration: DurationInputEvent
};

const mitEmitter = mitt<Events>();
const { mouse, keyboard, countUp } = createSubjects(mitEmitter, ['keyboard', 'mouse', 'countUp', 'duration']);
console.log(mouse);
console.log(keyboard);
console.log(countUp);
keyboardInput(keyboard);
counterMiddleware(keyboard, countUp);

keyboard.subscribe(e => console.log(e));
countUp.subscribe(e => console.log(e));

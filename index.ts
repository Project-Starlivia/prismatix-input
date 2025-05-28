import mitt from "mitt";

import type { KeyboardInputEvent } from "./src/web-native";
import type { WithPositionInputEvent } from "./src/web-native";
import type {
    DurationInputEvent,
    CountUpInputEvent,
} from "./src/Middleware";
import { createSubjects } from "./src/mitt";
import { keyboardInput } from "./src/web-native";
import { countUpMiddleware } from "./src/Middleware";

type Events = {
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
  countUp: CountUpInputEvent;
  duration: DurationInputEvent
};

const mitEmitter = mitt<Events>();
const { mouse, keyboard, countUp } = createSubjects(mitEmitter, ['keyboard', 'mouse', 'countUp', 'duration']);
console.log(mouse);
console.log(keyboard);
console.log(countUp);
keyboardInput(keyboard);
countUpMiddleware(keyboard, countUp);

keyboard.subscribe(e => console.log(e));
countUp.subscribe(e => console.log(e));

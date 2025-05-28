import type { KeyboardInputEvent } from "./src/web-native";
import type { WithPositionInputEvent } from "./src/web-native";
import type {
    DurationInputEvent,
} from "./src/Middleware";
import mitt from "mitt";
import { createAllSubjects } from "./src/mitt";
import { keyboardInput } from "./src/web-native";

type Events = {
  mouse: WithPositionInputEvent;
  keyboard: KeyboardInputEvent;
  duration: DurationInputEvent,
};

const mitEmitter = mitt<Events>();
const { mouse, keyboard } = createAllSubjects(mitEmitter);
keyboardInput(keyboard);
import type {DefaultAction, InputEmitter, InputEmitterCreator, PRXInputEvent} from "../../events";
import type { MultiSubject } from "../../subject";
import type { Multiable } from "../../utils";
import { multiableToArray } from "../../utils";
import { isEventBySetUndef } from "../";

type KeyboardNativeEvent = "keydown" | "keyup";
type KeyboardExtensionEvent = "keydown-norepeat" | "keydown-repeat";

export interface KeyboardInputOptions {
    target?: EventTarget
    key?: Multiable<string>
    code?: Multiable<string>
    events?: Multiable<KeyboardNativeEvent & KeyboardExtensionEvent>
}

export interface KeyboardInputEvent extends PRXInputEvent {
    code: string;
}

export  interface KeyboardInputEmitter extends InputEmitter {
    log: () => void;
}
export const keyboardInput: InputEmitterCreator<KeyboardInputOptions, KeyboardInputEvent> = (
    input: MultiSubject<KeyboardInputEvent>,
    options?: KeyboardInputOptions
): KeyboardInputEmitter => {
    const subjects = multiableToArray(input);
    const { target, code, key, events } = options || {};
    const eventTarget = target || document;
    const keySet = key ? new Set(multiableToArray(key)) : undefined;
    const codeSet = code ? new Set(multiableToArray(code)) : undefined;
    const eventSet = new Set(
        events
            ? Array.isArray(events) ? events : [events]
            : ["keydown", "keydown-norepeat", "keydown-repeat", "keyup"]
    );
    const id = `keyboard-${Date.now()}`;

    const keyFilter = (key: string) => isEventBySetUndef(keySet, key);
    const codeFilter = (code: string) => isEventBySetUndef(codeSet, code);
    const hasEvent = (name: string) => eventSet.has(name);
    const hasKeydown =
        eventSet.has("keydown") ||
        eventSet.has("keydown-norepeat") ||
        eventSet.has("keydown-repeat");

    const onKeyboardEvent = (e: KeyboardEvent, action: DefaultAction): void => {
        const event: KeyboardInputEvent = {
            key: e.key,
            action,
            time: e.timeStamp,
            code: e.code,
        };
        for (const stream of subjects) {
            stream.next(event);
        }
    };

    const onKeydownEvent = (e: Event): void => {
        const keyboardEvent = e as KeyboardEvent;
        if (!keyFilter(keyboardEvent.key)) return;
        if (!codeFilter(keyboardEvent.code)) return;
        const repeat = keyboardEvent.repeat;

        if (hasEvent("keydown")) onKeyboardEvent(keyboardEvent, 'hold');
        if (repeat ? hasEvent("keydown-repeat") : hasEvent("keydown-norepeat")) {
            onKeyboardEvent(keyboardEvent, repeat ? 'hold' : 'start');
        }
    };

    const onKeyupEvent = (e: Event): void => {
        const keyboardEvent = e as KeyboardEvent;
        if (!keyFilter(keyboardEvent.key)) return;
        if (!codeFilter(keyboardEvent.code)) return;
        onKeyboardEvent(keyboardEvent, 'end');
    };

    if (hasKeydown) {
        eventTarget.addEventListener("keydown", onKeydownEvent);
    }
    if (eventSet.has("keyup")) {
        eventTarget.addEventListener("keyup", onKeyupEvent);
    }

    const dispose = (): void => {
        if (hasKeydown) {
            eventTarget.removeEventListener("keydown", onKeydownEvent);
        }
        if (eventSet.has("keyup")) {
            eventTarget.removeEventListener("keyup", onKeyupEvent);
        }
    };

    return {
        id,
        dispose,
        log: (): void => {
            console.log(`Keyboard emitter ${id} active`);
        }
    };
}

import type { DefaultAction, InputEmitter, PRXInputEvent } from "../events";
import type { MultiSubject } from "../subject";
import type { Multiable } from "../utils";
import { multiableToArray } from "../utils";
import { isEventBySetUndef } from ".";

type KeyboardNativeEvent = "keydown" | "keyup";
type KeyboardExtensionEvent = "keydown-norepeat" | "keydown-repeat";

export type KeyboardInputOptions = {
    target?: EventTarget
    key?: Multiable<string>
    code?: Multiable<string>
    events?: Multiable<KeyboardNativeEvent & KeyboardExtensionEvent>
}

const inputTypeAction: Record<KeyboardNativeEvent & KeyboardExtensionEvent, DefaultAction> = {
    "keydown": "start",
    "keydown-norepeat": "start",
    "keydown-repeat": "hold",
    "keyup": "end",
};
export interface KeyboardInputEvent extends PRXInputEvent {
    code: string;
}
export const keyboardInput
: InputEmitter<KeyboardInputOptions, KeyboardInputEvent> = (
    s: MultiSubject<KeyboardInputEvent>,
    o?: KeyboardInputOptions
) => {
    const _subjects = multiableToArray(s);
    const { target, code, key, events } = o || {};
    const _target = target || document;
    const _key = key ? new Set(multiableToArray(key)) : undefined;
    const _code = code ? new Set(multiableToArray(code)) : undefined;
    const _events = new Set(
    events
        ? Array.isArray(events) ? events : [events]
        : ["keydown", "keydown-norepeat", "keydown-repeat", "keyup"]
    );

    const keyFilter = (key: string) => isEventBySetUndef(_key, key);
    const codeFilter = (code: string) => isEventBySetUndef(_code, code);
    const hasEvent = (name: string) => _events.has(name);
    const hasKeydown =
    _events.has("keydown") ||
    _events.has("keydown-norepeat") ||
    _events.has("keydown-repeat");

    const onKeyboardEvent = (e: KeyboardEvent, action: DefaultAction) =>{
        const event = {
            key: e.key,
            action,
            time: e.timeStamp,
            code: e.code,
        } as KeyboardInputEvent;
        for (const stream of _subjects) {
            stream.next(event);
        }
    }

    const onKeydownEvent = (e: Event) => {
        const keyboardEvent = e as KeyboardEvent;
        if(!keyFilter(keyboardEvent.key)) return;
        if(!codeFilter(keyboardEvent.code)) return;
        const repeat = keyboardEvent.repeat;

        if (hasEvent("keydown")) onKeyboardEvent(keyboardEvent, 'hold');
        if (repeat ? hasEvent("keydown-repeat") : hasEvent("keydown-norepeat")) {
            onKeyboardEvent(keyboardEvent, repeat ? 'hold' : 'start');
        }
    }

    const onKeyupEvent = (e: Event) => {
        const keyboardEvent = e as KeyboardEvent;
        if(!keyFilter(keyboardEvent.key)) return;
        if(!codeFilter(keyboardEvent.code)) return;
        onKeyboardEvent(keyboardEvent, 'end');
    }

    if (hasKeydown) {
    _target.addEventListener("keydown", onKeydownEvent);
    }
    if (_events.has("keyup")) {
    _target.addEventListener("keyup", onKeyupEvent);
    }

    const dispose = () => {
    if (hasKeydown) {
        _target.removeEventListener("keydown", onKeydownEvent);
    }
    if (_events.has("keyup")) {
        _target.removeEventListener("keyup", onKeyupEvent);
    }
    };

    const api = {
        dispose
    };
    return api;
}
import type { DefaultAction, InputEmitter, PRXInputEvent } from "../events";
import type { MultiSubject } from "../subject";
import { multiableToArray } from "../utils";

type KeyboardNativeEvent = "keydown" | "keydown-norepeat" | "keydown-repeat" | "keyup";

export type KeyboardInputOptions = {
    target?: HTMLElement | Document | Window
    keys?: string[] | undefined,
    codes?: string[] | undefined,
    events?: KeyboardNativeEvent[] | KeyboardNativeEvent | undefined
}

const inputTypeAction: Record<KeyboardNativeEvent, DefaultAction> = {
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
    const { target, codes, events } = o || {};
    const _target = target || document;
    const _keys = o?.keys ? new Set((Array.isArray(o.keys) ? o.keys : [o.keys])) : undefined;
    const _codes = codes ? new Set((Array.isArray(codes) ? codes : [codes])) : undefined;
    const _events = new Set(
    events
        ? Array.isArray(events) ? events : [events]
        : ["keydown", "keydown-norepeat", "keydown-repeat", "keyup"]
    );

    const keyFilter = _keys ? (key: string) => _keys.has(key) : () => true;
    const codeFilter = _codes ? (code: string) => _codes.has(code) : () => true;
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
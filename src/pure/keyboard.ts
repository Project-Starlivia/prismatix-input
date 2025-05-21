import type { DefaultAction, MultiSubject, PRXInputEvent } from "../types";
import { multiableToArray } from "../util";

type KeyboardEventType = "keydown" | "keydown-first" | "keydown-repeat" | "keyup";

export type KeyboardInputOptions = {
    target?: HTMLElement | Document | Window
    keys?: string[] | undefined,
    codes?: string[] | undefined,
    events?: KeyboardEventType[] | KeyboardEventType | undefined
}

export interface KeyboardInputEvent extends PRXInputEvent {
    code: string;
}

export function keyboardBasicInput<T extends KeyboardInputEvent, A extends DefaultAction = DefaultAction>(
    s: MultiSubject<T>,
    o?: KeyboardInputOptions
) {
    const _subjects = multiableToArray(s);
    const { target, codes, events } = o || {};
    const _target = target || document;
    const _keys = o?.keys ? (Array.isArray(o.keys) ? o.keys : [o.keys]) : undefined;
    const _codes = codes ? (Array.isArray(codes) ? codes : [codes]) : undefined;
    const _events = events ? (Array.isArray(events) ? events : [events]) : ["keydown", "keydown-first", "keydown-repeat", "keyup"] as KeyboardEventType[];

    function onKeyDown(e: Event){
        if (!(e instanceof KeyboardEvent)) return;
        onKeyboardEvent(e, "hold" as A);
    }
    function onKeyUp(e: Event){
        if (!(e instanceof KeyboardEvent)) return;
        onKeyboardEvent(e, "end" as A);
    }
    function onKeyDownStart(e: Event){
        if (!(e instanceof KeyboardEvent)) return;
        if (e.repeat) return;
        onKeyboardEvent(e, "start" as A);
    }
    function onKeyDownRepeat(e: Event){
        if (!(e instanceof KeyboardEvent)) return;
        if (!e.repeat) return;
        onKeyboardEvent(e, "hold" as A);
    }
    function onKeyboardEvent(e: KeyboardEvent, action: A){
        const key = e.key;
        if (!_keys?.includes(key)) return;
        const code = e.code;
        if (!_codes?.includes(key)) return;
        const event = {
            key: key,
            action,
            time: e.timeStamp,
            code: code,
        } as T;
        for (const stream of _subjects) {
            stream.next(event);
        }
    }

    const keyboardEvents: Record<KeyboardEventType, {type: string, listener: (e: Event) => void}> = {
        "keydown": { type: "keydown", listener: onKeyDown },
        "keyup": { type: "keyup", listener: onKeyUp },
        "keydown-first": { type: "keydown", listener: onKeyDownStart },
        "keydown-repeat": { type: "keydown", listener: onKeyDownRepeat },
    };

    for (const event of _events) {
        if (keyboardEvents[event]) {
            _target.addEventListener(keyboardEvents[event].type, keyboardEvents[event].listener);
        }
    }

    return {
        dispose: () => {
            for (const event of _events) {
                _target.removeEventListener(keyboardEvents[event].type, keyboardEvents[event].listener);
            }
        }
    }
}


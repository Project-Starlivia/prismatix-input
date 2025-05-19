import { disposeEmitNodes } from "typescript";
import type { InputActionGenerics, PRXMultiSubject, PRXInputEvent } from "../types";
import { multiableToArray } from "../util";

type KeyboardEventType = "keydown" | "keyup";

export type KeyboardInputOptions = {
    target?: HTMLElement | Document | Window
    codes?: string[] | undefined,
    events?: KeyboardEventType[] | KeyboardEventType | undefined,
}

export function keyboardBasicInput<G extends InputActionGenerics = InputActionGenerics>(
    s: PRXMultiSubject<G>,
    o?: KeyboardInputOptions
) {
    const _subjects = multiableToArray(s);
    const { target, codes, events } = o || {};
    const _target = target || document;
    const _events = events ? (Array.isArray(events) ? events : [events]) : undefined;
    const _codes = codes ? (Array.isArray(codes) ? codes : [codes]) : undefined;
    
    function onKeyDown(e: Event){
        if (!(e instanceof KeyboardEvent)) return;
        onKeyboardEvent(e, "start");
    }
    function onKeyUp(e: Event){
        if (!(e instanceof KeyboardEvent)) return;
        onKeyboardEvent(e, "up");
    }
    function onKeyboardEvent(e: KeyboardEvent, action: G['A']){
        const inputCode = e.key;
        if (!_codes?.includes(inputCode)) return;
        const event: PRXInputEvent<G> = {
            key: inputCode,
            action,
            time: e.timeStamp,
        } as PRXInputEvent<G>;
        for (const stream of _subjects) {
            stream.next(event);
        }
    }
    const keyboardEvents: Record<KeyboardEventType, (e: Event) => void> = {
        "keydown": onKeyDown,
        "keyup": onKeyUp,
    };

    if (!_events) {
        for (const type of ["keydown", "keyup"] as const) {
            _target.addEventListener(type, keyboardEvents[type]);
        }
    }

    return {
        dispose: () => {
            for (const type of _events || ["keydown", "keyup"] as const) {
                _target.removeEventListener(type, keyboardEvents[type]);
            }
        }
    }
}


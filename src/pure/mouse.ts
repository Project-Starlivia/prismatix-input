import { disposeEmitNodes } from "typescript";
import type { DefaultAction, MultiSubject, PRXInputEvent } from "../types";
import { multiableToArray } from "../util";

type MouseEventType = "mousedown" | "mouseup" | "mousemove" | "mouseenter" | "mouseleave" | "mouseover" | "mouseout" | "click" | "dblclick" | "contextmenu";

export type MouseInputOptions = {
    target?: HTMLElement | Document | Window
    buttons?: number[] | undefined
    types?: MouseEventType[] | MouseEventType | undefined,
}

export interface MouseInputEvent extends PRXInputEvent {
    button: number;
    x: number;
    y: number;
}

export function mouseBasicInput<T extends MouseInputEvent = MouseInputEvent>(
    s: MultiSubject<T>,
    o?: MouseInputOptions
) {
    const _subjects = multiableToArray(s);
    const { target, buttons, types } = o || {};
    const _target = target || document;
    const _types = types ? (Array.isArray(types) ? types : [types]) : undefined;
    const _buttons = buttons ? (Array.isArray(buttons) ? buttons : [buttons]) : undefined;

    function onMouseDown(e: Event) {
        if (!(e instanceof MouseEvent)) return;
        onMouseEvent(e, "start");
    }
    function onMouseUp(e: Event) {
        if (!(e instanceof MouseEvent)) return;
        onMouseEvent(e, "end");
    }
    function onMouseMove(e: Event) {
        if (!(e instanceof MouseEvent)) return;
        onMouseEvent(e, "hold");
    }
    function onMouseEvent(e: MouseEvent, action: DefaultAction){
        const inputButton = e.button;
        if (!_buttons?.includes(inputButton)) return;
        const event = {
            key: inputButton.toString(),
            action,
            time: e.timeStamp,
        } as T;
        for (const stream of _subjects) {
            stream.next(event);
        }
    }

    const mouseEvents: Record<MouseEventType, (e: Event) => void> = {
        "mousedown": onMouseDown,
        "mouseup": onMouseUp,
        "mousemove": onMouseMove,
        "mouseenter": () => { },
        "mouseleave": () => { },
        "mouseover": () => { },
        "mouseout": () => { },
        "click": () => { },
        "dblclick": () => { },
        "contextmenu": () => { },
    };

    if (!_types) {
        for (const type of ["mousedown", "mouseup", "mousemove"] as const) {
            _target.addEventListener(type, mouseEvents[type]);
        }
    }

    return {
        dispose: () => {
            for (const type of _types || ["mousedown", "mouseup", "mousemove"] as const) {
                _target.removeEventListener(type, mouseEvents[type]);
            }
        }
    }

}
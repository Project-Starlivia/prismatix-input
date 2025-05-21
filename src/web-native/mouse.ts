import type { DefaultAction, PRXInputEvent } from "../events";
import type { MultiSubject } from "../subject";
import { multiableToArray } from "../utils";

export type ClickEvent = "click" | "dblclick" | "contextmenu";
export type ButtonEvent = "mousedown" | "mouseup";
export type MoveEvent = "mousemove";
export type WrapEvent = "mouseenter" | "mouseleave" | "mouseover" | "mouseout";

type MouseNativeEvent = ClickEvent | ButtonEvent | MoveEvent | WrapEvent;

export type MouseInputOptions = {
    target?: HTMLElement | Document | Window
    buttons?: number[] | undefined
    events?: MouseNativeEvent[] | MouseNativeEvent | undefined,
}

export interface MouseInputEvent extends PRXInputEvent {
    button: number;
    x: number;
    y: number;
}

export function mouseNativeInput<T extends MouseInputEvent = MouseInputEvent>(
    s: MultiSubject<T>,
    o?: MouseInputOptions
) {
    const _subjects = multiableToArray(s);
    const { target, buttons, events } = o || {};
    const _target = target || document;
    const _events = events ? (Array.isArray(events) ? events : [events]) : undefined;
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

    const mouseEvents: Record<MouseNativeEvent, (e: Event) => void> = {
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

    if (!_events) {
        for (const type of ["mousedown", "mouseup", "mousemove"] as const) {
            _target.addEventListener(type, mouseEvents[type]);
        }
    }

    return {
        dispose: () => {
            for (const type of _events || ["mousedown", "mouseup", "mousemove"] as const) {
                _target.removeEventListener(type, mouseEvents[type]);
            }
        }
    }

}
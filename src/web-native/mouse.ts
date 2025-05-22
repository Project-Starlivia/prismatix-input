import type { DefaultAction, InputEmitter, PRXInputEvent } from "../events";
import type { MultiSubject } from "../subject";
import { multiableToArray } from "../utils";

export type ClickEvent = "click" | "dblclick" | "contextmenu";
export type ButtonEvent = "mousedown" | "mouseup";
export type MoveEvent = "mousemove";
export type WrapEvent = "mouseenter" | "mouseleave" | "mouseover" | "mouseout";

type MouseNativeEvent = ClickEvent | ButtonEvent | MoveEvent | WrapEvent;

export interface MouseInputFullEvent extends PRXInputEvent {
    clientX: number;
    clientY: number;
    screenX: number;
    screenY: number;
    offsetX: number;
    offsetY: number;
    pageX: number;
    pageY: number;
    target: EventTarget;
    buttons: number;
}

export type MouseInputOptions<T extends PRXInputEvent> = {
    target?: HTMLElement | Document | Window
    buttons?: number[] | undefined
    events?: MouseNativeEvent[] | MouseNativeEvent | undefined,
    onMouseEvent: (e: MouseEvent, type: MouseNativeEvent ) => T
}


const inputTypeAction: Record<MouseNativeEvent, DefaultAction> = {
    "mousedown": "start",
    "mouseup": "end",
    "mousemove": "move",
    "click": "start",
    "dblclick": "start",
    "contextmenu": "start",
    "mouseenter": "start",
    "mouseleave": "end",
    "mouseover": "start",
    "mouseout": "end",
};

export const mouseNativeBasicInput
: InputEmitter<MouseInputOptions<WithPositionInputEvent>, WithPositionInputEvent>
= (
    s: MultiSubject<WithPositionInputEvent>,
    o?: MouseInputOptions<WithPositionInputEvent>
) => {
    return mouseNativeInput(s, { ...o, onMouseEvent: (e: MouseEvent, type: MouseNativeEvent) => {
            const action = inputTypeAction[type];
            const event = {
                x: e.clientX,
                y: e.clientY,
                action,
                time: e.timeStamp,
            } as WithPositionInputEvent;
            return event;
        }
    });
}

export const mouseNativeFullInput
: InputEmitter<MouseInputOptions<MouseInputFullEvent>, MouseInputFullEvent>
 = (
    s: MultiSubject<MouseInputFullEvent>,
    o?: MouseInputOptions<MouseInputFullEvent>
) => {
    return mouseNativeInput(s, { ...o, onMouseEvent: (e: MouseEvent, type: MouseNativeEvent) => {
            const action = inputTypeAction[type];
            const event = {
                clientX: e.clientX,
                clientY: e.clientY,
                screenX: e.screenX,
                screenY: e.screenY,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                pageX: e.pageX,
                pageY: e.pageY,
                target: e.target,
                buttons: e.buttons,
                action,
                time: e.timeStamp,
            } as MouseInputFullEvent;
            return event;
        }
    });
}

export const mouseNativeInput = <T extends PRXInputEvent>(
  s: MultiSubject<T>,
  o?: MouseInputOptions<T>
) => {
    const _subjects = multiableToArray(s);
    const { target, buttons, events, onMouseEvent } = o || {};
    const _target = target || document;
    const _events = events ? (Array.isArray(events) ? events : [events]) : ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave", "mouseover", "mouseout"] as MouseNativeEvent[];
    const _buttons = buttons ? new Set(Array.isArray(buttons) ? buttons : [buttons]): undefined;
    const _onMouseEvent = onMouseEvent || ((e: MouseEvent, type: MouseNativeEvent) => {
        const action = inputTypeAction[type];
        const event = {
            key: e.button.toString(),
            action,
            time: e.timeStamp,
        } as T;
        return event;
    });

    const listeners = [] as (() => void)[];

    const buttonFilter = _buttons ? (button: number) => _buttons.has(button): () => true;

    for (const eventType of _events || []) {
        const handler = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            if (!buttonFilter(mouseEvent.button)) return;
            const result = _onMouseEvent(mouseEvent, eventType) as T;
            for (const stream of _subjects) {
                stream.next(result);
            }
        };
        _target.addEventListener(eventType, handler);
        listeners.push(() => _target.removeEventListener(eventType, handler));
    }

    const dispose = () => {
        for (const remove of listeners) {
            remove();
        }
    }

    return {
        dispose,
    }
}
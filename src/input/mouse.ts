import type { DefaultAction, PRXEvent, MultiSubject } from "~/types";
import { multiableToArray, Multiable } from "~/utils";

import { isEventBySetUndef, NativeInputBase } from "./utils";
import type { InputEventPosition, PRXInput } from "~/input/types";

export type ClickEvent = "click" | "dblclick" | "contextmenu";
export type ButtonEvent = "mousedown" | "mouseup";
export type MoveEvent = "mousemove";
export type WrapEvent = "mouseenter" | "mouseleave" | "mouseover" | "mouseout";

type MouseNativeEvent = ClickEvent | ButtonEvent | MoveEvent | WrapEvent;

export interface MouseInputOptions {
    target?: EventTarget
    events?: Multiable<MouseNativeEvent>,
    filters?: {
        button?: Multiable<number>,
        buttons?: Multiable<number>,
    }
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

export class MouseInputBase<T extends PRXEvent> extends NativeInputBase<T, MouseNativeEvent, MouseEvent> {
    constructor(
        input: MultiSubject<T>,
        mapEvent: (e: MouseEvent, action: DefaultAction) => T,
        options?: MouseInputOptions,
    ) {
        const { target, events, filters } = options || {};
        const { button, buttons } = filters || {};
        const _target = target || document;
        const _events = events ? 
            multiableToArray(events) : 
                ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove"] as MouseNativeEvent[];
        const _button = button ? new Set(multiableToArray(button)) : undefined;
        const _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
        const isExec = (e: MouseEvent) => isEventBySetUndef(_button, e.button) && isEventBySetUndef(_buttons, e.buttons);

        super(
            input,
            _target,
            _events,
            inputTypeAction,
            isExec,
            mapEvent,
        );
    }
}

export class MouseInput extends MouseInputBase<PRXEvent> {
    constructor(
        input: MultiSubject<PRXEvent>,
        options?: MouseInputOptions
    ) {
        super(
            input,
            (e, action) => ({
                key: e.button.toString(),
                action,
                time: e.timeStamp,
            } as PRXEvent),
            options
        );
    }
}

export interface InputEventButtons extends PRXEvent {
    buttons: number;
}
export class MouseInputButtons extends MouseInputBase<InputEventButtons> {
    constructor(
        input: MultiSubject<InputEventButtons>,
        options?: MouseInputOptions
    ) {
        super(
            input,
            (e, action) => ({
                key: e.button.toString(),
                action,
                time: e.timeStamp,
                buttons: e.buttons
            }),
            options
        );
    }
}

export class MouseInputPosition extends MouseInputBase<InputEventPosition> {
    constructor(
        input: MultiSubject<InputEventPosition>,
        options?: MouseInputOptions
    ) {
        super(
            input,
            (e: MouseEvent, action: DefaultAction) => ({
                key: e.button.toString(),
                action,
                time: e.timeStamp,
                x: e.x,
                y: e.y
            }),
            options
        );
    }
}

export interface InputEventMouseFull extends PRXEvent, MouseEvent { }
export class MouseInputFull extends MouseInputBase<InputEventMouseFull> {
    constructor(
        input: MultiSubject<InputEventMouseFull>,
        options?: MouseInputOptions
    ) {
        super(
            input,
            (e, action) => ({
                key: e.button.toString(),
                time: e.timeStamp,
                action,
                ...e
            }),
            options
        );
    }
}

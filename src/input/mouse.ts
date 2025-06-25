import type { DefaultAction, PRXEvent, MultiSubject } from "~/types";
import { multiableToArray, Multiable } from "~/utils";

import { isEventBySetUndef, nativeInputBase, WithPositionInputEvent } from ".";

export type ClickEvent = "click" | "dblclick" | "contextmenu";
export type ButtonEvent = "mousedown" | "mouseup";
export type MoveEvent = "mousemove";
export type WrapEvent = "mouseenter" | "mouseleave" | "mouseover" | "mouseout";

type MouseNativeEvent = ClickEvent | ButtonEvent | MoveEvent | WrapEvent;

export interface MouseInputOptions {
    target?: EventTarget
    events?: Multiable<MouseNativeEvent>,
    button?: Multiable<number>,
    buttons?: Multiable<number>,
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

export function mouseInputBase<T extends PRXEvent>(
    input: MultiSubject<T>,
    mapEvent: (e: MouseEvent, action: DefaultAction) => T,
    options?: MouseInputOptions,
){
    const { target, events, button, buttons } = options || {};
    const _target = target || document;
    const _events = events ? 
        multiableToArray(events) : 
            ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove"] as MouseNativeEvent[];
    const _button = button ? new Set(multiableToArray(button)) : undefined;
    const _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
    const isExec = (e: MouseEvent) => isEventBySetUndef(_button, e.button) && isEventBySetUndef(_buttons, e.buttons);

    return nativeInputBase<T, MouseNativeEvent, MouseEvent>(
        input,
        _target,
        _events,
        inputTypeAction,
        isExec,
        mapEvent,
    );
}

export function createMouseInputWithPosition(
    input: MultiSubject<WithPositionInputEvent>,
    options?: MouseInputOptions
) {
    return mouseInputBase(input, (e: MouseEvent, action: DefaultAction) => ({
        key: e.button.toString(),
        action,
        time: e.timeStamp,
        x: e.x,
        y: e.y
    }as WithPositionInputEvent) ,options)
}

export function createMouseInput(
    s: MultiSubject<PRXEvent>,
    o?: MouseInputOptions
) {
    return mouseInputBase(s, (e: MouseEvent, action: DefaultAction) => ({
        key: e.button.toString(),
        action,
        time: e.timeStamp,
    }as PRXEvent) ,o)
}

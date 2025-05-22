import { isEventBySetUndef, nativeInputBase, type WithPositionInputEvent } from ".";
import type { DefaultAction, PRXInputEvent } from "../events";
import type { MultiSubject } from "../subject";
import type { Multiable } from "../utils";
import { multiableToArray } from "../utils";

export type ClickEvent = "click" | "dblclick" | "contextmenu";
export type ButtonEvent = "mousedown" | "mouseup";
export type MoveEvent = "mousemove";
export type WrapEvent = "mouseenter" | "mouseleave" | "mouseover" | "mouseout";

type MouseNativeEvent = ClickEvent | ButtonEvent | MoveEvent | WrapEvent;

export type MouseInputOptions = {
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

export function mouseInputBase<T extends PRXInputEvent>(
    s: MultiSubject<T>,
    mapEvent: (e: MouseEvent, action: DefaultAction) => T,
    o?: MouseInputOptions,
){
    const { target, events, button, buttons } = o || {};
    const _target = target || document;
    const _events = events ? 
        multiableToArray(events) : 
            ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove"] as MouseNativeEvent[];
    const _button = button ? new Set(multiableToArray(button)) : undefined;
    const _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
    const isExec = (e: MouseEvent) => isEventBySetUndef(_button, e.button) && isEventBySetUndef(_buttons, e.buttons)

    return nativeInputBase<T, MouseNativeEvent, MouseEvent>(
        s,
        _target,
        _events,
        inputTypeAction,
        isExec,
        mapEvent
    );
}

export function mouseInputWithPosition(
    s: MultiSubject<WithPositionInputEvent>,
    o?: MouseInputOptions
) {
    return mouseInputBase(s, (e: MouseEvent, action: DefaultAction) => ({
        key: e.button.toString(),
        action,
        time: e.timeStamp,
        x: e.x,
        y: e.y
    }as WithPositionInputEvent) ,o)
}

export function mouseInput(
    s: MultiSubject<PRXInputEvent>,
    o?: MouseInputOptions
) {
    return mouseInputBase(s, (e: MouseEvent, action: DefaultAction) => ({
        key: e.button.toString(),
        action,
        time: e.timeStamp,
    }as PRXInputEvent) ,o)
}
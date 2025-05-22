import { isEventBySetUndef, nativeInputBase, WithPositionInputEvent } from ".";
import type { DefaultAction, InputEmitter, PRXInputEvent } from "../events";
import type { MultiSubject } from "../subject";
import type { Multiable } from "../utils";
import { multiableToArray } from "../utils";

export type ClickEvent = "click" | "dblclick" | "contextmenu";
export type ButtonEvent = "mousedown" | "mouseup";
export type MoveEvent = "mousemove";
export type WrapEvent = "mouseenter" | "mouseleave" | "mouseover" | "mouseout";

type MouseNativeEvent = ClickEvent | ButtonEvent | MoveEvent | WrapEvent;

export interface MouseFullInputEvent extends PRXInputEvent {
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

export type MouseInputOptions = {
    target?: EventTarget
    buttons?: Multiable<number>,
    events?: Multiable<MouseNativeEvent>,
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
    const { target, events, buttons } = o || {};
    const _target = target || document;
    const _events = events ? 
        multiableToArray(events) : 
            ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove"] as MouseNativeEvent[];
    const _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
    const isExec = (e: MouseEvent) => isEventBySetUndef(_buttons, e.button);

    return nativeInputBase<T, MouseNativeEvent, MouseEvent>(
        s,
        _target,
        _events,
        inputTypeAction,
        isExec,
        mapEvent
    );
}

export function mouseInput(
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

export function mouseFullInput(
    s: MultiSubject<MouseFullInputEvent>,
    o?: MouseInputOptions
) {
    return mouseInputBase(s, (e: MouseEvent, action: DefaultAction) => ({
            key: e.button.toString(),
            action,
            time: e.timeStamp,
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
        } as MouseFullInputEvent),
    );
}
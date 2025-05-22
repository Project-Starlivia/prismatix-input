import type { DefaultAction } from "../events";
import type { MultiSubject } from "../subject";
import { multiableToArray } from "../utils";
import type { Multiable } from "../utils";
import { isEventBySetUndef, nativeInputBase } from ".";
import type { WithPositionInputEvent } from "./index";

export type ButtonEvent = 'pointerdown' | 'pointerup';
export type MoveEvent = 'pointermove';
export type WrapEvent = 'pointerenter' | 'pointerleave' | 'pointerover' | 'pointerout';
export type CancelEvent = 'pointercancel';
type PointerNativeEvent = ButtonEvent | MoveEvent | WrapEvent | CancelEvent;

export interface PointerInputOptions extends MouseInputOptions {
    events?: Multiable<PointerNativeEvent>;
    pointerType?: Multiable<string>;
    pointerId?: Multiable<number>;
}

const inputTypeAction: Record<PointerNativeEvent, DefaultAction> = {
    'pointerdown': 'start',
    'pointerup': 'end',
    'pointermove': 'move',
    'pointerenter': 'start',
    'pointerleave': 'end',
    'pointerover': 'start',
    'pointerout': 'end',
    'pointercancel': 'end',
};

export function pointerInputBase<T extends PRXInputEvent>(
    s: MultiSubject<T>,
    mapEvent: (e: PointerEvent, action: DefaultAction) => T,
    o?: PointerInputOptions,
){
    const { target, events, button, buttons, pointerType, pointerId } = o || {};
    const _target = target || document;
    const _events = events ? 
        multiableToArray(events) : 
            ['pointerdown', 'pointerup', 'pointermove', 'pointerenter', 'pointerleave', 'pointerover', 'pointerout', 'pointercancel'] as PointerNativeEvent[];
    const _button = button ? new Set(multiableToArray(button)) : undefined;
    const _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
    const _pointerType = pointerType ? new Set(multiableToArray(pointerType)) : undefined;
    const _pointerId = pointerId ? new Set(multiableToArray(pointerId)) : undefined;
    const isExec = (e: PointerEvent) => 
        isEventBySetUndef(button, e.button) && 
        isEventBySetUndef(_buttons, e.buttons) && 
        isEventBySetUndef(_pointerType, e.pointerType) && 
        isEventBySetUndef(_pointerId, e.pointerId);

    return nativeInputBase<T, PointerNativeEvent, MouseEvent>(
        s,
        _target,
        _events,
        inputTypeAction,
        isExec,
        mapEvent
    );
}

export const pointerInput = (
    s: MultiSubject<PRXInputEvent>,
    o?: PointerInputOptions
) => {
    return pointerInputBase<PRXInputEvent>(
        s,
        (e: PointerEvent, action: DefaultAction) => ({
            key: e.pointerType,
            action,
            time: e.timeStamp,
        } as PRXInputEvent),
        o
    );
}

export const pointerInputWithPosition = (
    s: MultiSubject<WithPositionInputEvent>,
    o?: PointerInputOptions
) => {
    return pointerInputBase<WithPositionInputEvent>(
        s,
        (e: PointerEvent, action: DefaultAction) => ({
            key: e.pointerType,
            action,
            time: e.timeStamp,
            x: e.clientX,
            y: e.clientY,
        } as WithPositionInputEvent),
        o
    );
}

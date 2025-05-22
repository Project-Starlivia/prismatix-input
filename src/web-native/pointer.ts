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

export interface PointerInputOptions {
    target?: EventTarget;
    buttons?: Multiable<number>;
    events?: Multiable<PointerNativeEvent>;
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

export const pointerInput = (
    s: MultiSubject<WithPositionInputEvent>,
    o?: PointerInputOptions
) => {
    const { target, events, buttons } = o || {};
    const _target = target || document;
    const _events = events ? 
        multiableToArray(events) : 
        ['pointerdown', 'pointerup', 'pointermove', 'pointerenter', 'pointerleave', 'pointerover', 'pointerout', 'pointercancel'] as PointerNativeEvent[];
    const _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
    const isExec = (e: PointerEvent) => isEventBySetUndef(_buttons, e.button);

    return nativeInputBase<WithPositionInputEvent, PointerNativeEvent, PointerEvent>(
        s,
        _target,
        _events,
        inputTypeAction,
        isExec,
        (e: PointerEvent, action: DefaultAction) => ({
            key: e.pointerId.toString(),
            action,
            time: e.timeStamp,
            x: e.clientX,
            y: e.clientY,
        } as WithPositionInputEvent),
    );
}

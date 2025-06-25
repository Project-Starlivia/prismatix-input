import type { DefaultAction, PRXEvent, MultiSubject } from "~/types";
import { multiableToArray, type Multiable } from "~/utils"

import { isEventBySetUndef, nativeInputBase, WithPositionInputEvent, PRXInputCreator } from ".";

export type PointerButtonEvent = 'pointerdown' | 'pointerup';
export type PointerMoveEvent = 'pointermove';
export type PointerWrapEvent = 'pointerenter' | 'pointerleave' | 'pointerover' | 'pointerout';
export type PointerCancelEvent = 'pointercancel';
type PointerNativeEvent = PointerButtonEvent | PointerMoveEvent | PointerWrapEvent | PointerCancelEvent;

export interface PointerInputOptions {
    target?: EventTarget;
    events?: Multiable<PointerNativeEvent>;
    pointerType?: Multiable<string>;
    pointerId?: Multiable<number>;
    button?: Multiable<number>;
    buttons?: Multiable<number>;
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

export function pointerInputBase<T extends PRXEvent>(
    input: MultiSubject<T>,
    mapEvent: (e: PointerEvent, action: DefaultAction) => T,
    options?: PointerInputOptions,
){
    const { target, events, button, buttons, pointerType, pointerId } = options || {};
    const _target = target || document;
    const _events = events ? 
        multiableToArray(events) : 
            ['pointerdown', 'pointerup', 'pointermove', 'pointerenter', 'pointerleave', 'pointerover', 'pointerout', 'pointercancel'] as PointerNativeEvent[];
    const _button = button ? new Set(multiableToArray(button)) : undefined;
    const _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
    const _pointerType = pointerType ? new Set(multiableToArray(pointerType)) : undefined;
    const _pointerId = pointerId ? new Set(multiableToArray(pointerId)) : undefined;
    const isExec = (e: PointerEvent) => 
        isEventBySetUndef(_button, e.button) && 
        isEventBySetUndef(_buttons, e.buttons) && 
        isEventBySetUndef(_pointerType, e.pointerType) && 
        isEventBySetUndef(_pointerId, e.pointerId);

    return nativeInputBase<T, PointerNativeEvent, PointerEvent>(
        input,
        _target,
        _events,
        inputTypeAction,
        isExec,
        mapEvent,
    );
}

export const createPointerInput = (
    input: MultiSubject<PRXEvent>,
    options?: PointerInputOptions
) => {
    return pointerInputBase<PRXEvent>(
        input,
        (e: PointerEvent, action: DefaultAction) => ({
            key: e.pointerType,
            action,
            time: e.timeStamp,
        } as PRXEvent),
        options
    );
}

export const createPointerInputWithPosition
: PRXInputCreator<PointerInputOptions, WithPositionInputEvent>
= (
    input: MultiSubject<WithPositionInputEvent>,
    options?: PointerInputOptions
) => {
    return pointerInputBase<WithPositionInputEvent>(
        input,
        (e: PointerEvent, action: DefaultAction) => ({
            key: e.pointerType,
            action,
            time: e.timeStamp,
            x: e.clientX,
            y: e.clientY,
        } as WithPositionInputEvent),
        options
    );
}

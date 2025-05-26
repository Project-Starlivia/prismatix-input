import type { DefaultAction, InputEmitter, PRXInputEvent } from "../events";
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

export interface PointerInputOptions extends PRXInputEvent {
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

export function pointerInputBase<T extends PRXInputEvent>(
    input: MultiSubject<T>,
    mapEvent: (e: PointerEvent, action: DefaultAction) => T,
    option?: PointerInputOptions,
){
    const { target, events, button, buttons, pointerType, pointerId } = option || {};
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
        mapEvent
    );
}

export const pointerInput = (
    input: MultiSubject<PRXInputEvent>,
    option?: PointerInputOptions
) => {
    return pointerInputBase<PRXInputEvent>(
        input,
        (e: PointerEvent, action: DefaultAction) => ({
            key: e.pointerType,
            action,
            time: e.timeStamp,
        } as PRXInputEvent),
        option
    );
}

export const pointerInputWithPosition
: InputEmitter<PointerInputOptions, WithPositionInputEvent>
= (
    input: MultiSubject<WithPositionInputEvent>,
    option?: PointerInputOptions
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
        option
    );
}

import type { DefaultAction, PRXEvent, MultiSubject } from "../types";
import { multiableToArray, type Multiable } from "../utils"

import { isEventBySetUndef, NativeInputBase } from "./utils";
import type { InputEventPosition, PRXInput } from "./types";

export type PointerButtonEvent = 'pointerdown' | 'pointerup';
export type PointerMoveEvent = 'pointermove';
export type PointerWrapEvent = 'pointerenter' | 'pointerleave' | 'pointerover' | 'pointerout';
export type PointerCancelEvent = 'pointercancel';
type PointerNativeEvent = PointerButtonEvent | PointerMoveEvent | PointerWrapEvent | PointerCancelEvent;

export interface PointerInputOptions {
    target?: EventTarget;
    events?: Multiable<PointerNativeEvent>;
    filters?: {
        pointerType?: Multiable<string>;
        pointerId?: Multiable<number>;
        button?: Multiable<number>;
        buttons?: Multiable<number>;
    }
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

export class PointerInputBase<T extends PRXEvent> extends NativeInputBase<T, PointerNativeEvent, PointerEvent> {
    constructor(
        input: MultiSubject<T>,
        mapEvent: (e: PointerEvent, action: DefaultAction) => T,
        options?: PointerInputOptions,
    ) {
        const { target, events, filters } = options || {};
        const { pointerType, pointerId, button, buttons } = filters || {};
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


export class PointerInput extends PointerInputBase<PRXEvent> {
    constructor(
        input: MultiSubject<PRXEvent>,
        options?: PointerInputOptions
    ) {
        super(
            input,
            (e: PointerEvent, action: DefaultAction) => ({
                key: e.pointerType,
                action,
                time: e.timeStamp,
            } as PRXEvent),
            options
        );
    }
}

export class PointerInputWithPosition extends PointerInputBase<InputEventPosition> {
    constructor(
        input: MultiSubject<InputEventPosition>,
        options?: PointerInputOptions
    ) {
        super(
            input,
            (e: PointerEvent, action: DefaultAction) => ({
                key: e.pointerType,
                action,
                time: e.timeStamp,
                x: e.offsetX,
                y: e.offsetY,
            }),
            options
        );
    }
}

export interface InputEventPointerFull extends PRXEvent, PointerEvent { }
export class PointerInputFull extends PointerInputBase<InputEventPointerFull>{
    constructor(
        input: MultiSubject<InputEventPointerFull>,
        options?: PointerInputOptions
    ) {
        super(
            input,
            (e: PointerEvent, action: DefaultAction) => ({
                key: e.pointerType,
                action,
                time: e.timeStamp,
                ...e
            }),
            options
        );
    }
}

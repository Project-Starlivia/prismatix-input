import type { DefaultAction, PRXEvent, MultiSubject } from "../types";
import { type Multiable } from "../utils";
import { NativeInputBase } from "./utils";
import type { InputEventPosition } from "./types";
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
export declare class PointerInputBase<T extends PRXEvent> extends NativeInputBase<T, PointerNativeEvent, PointerEvent> {
    constructor(input: MultiSubject<T>, mapEvent: (e: PointerEvent, action: DefaultAction) => T, options?: PointerInputOptions);
}
export declare class PointerInput extends PointerInputBase<PRXEvent> {
    constructor(input: MultiSubject<PRXEvent>, options?: PointerInputOptions);
}
export declare class PointerInputWithPosition extends PointerInputBase<InputEventPosition> {
    constructor(input: MultiSubject<InputEventPosition>, options?: PointerInputOptions);
}
export interface InputEventPointerFull extends PRXEvent, PointerEvent {
}
export declare class PointerInputFull extends PointerInputBase<InputEventPointerFull> {
    constructor(input: MultiSubject<InputEventPointerFull>, options?: PointerInputOptions);
}
export {};

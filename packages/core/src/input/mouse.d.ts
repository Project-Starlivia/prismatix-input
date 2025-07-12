import type { DefaultAction, PRXEvent, MultiSubject } from "../types";
import { Multiable } from "../utils";
import { NativeInputBase } from "./utils";
import type { InputEventPosition } from "./types";
export type ClickEvent = "click" | "dblclick" | "contextmenu";
export type ButtonEvent = "mousedown" | "mouseup";
export type MoveEvent = "mousemove";
export type WrapEvent = "mouseenter" | "mouseleave" | "mouseover" | "mouseout";
type MouseNativeEvent = ClickEvent | ButtonEvent | MoveEvent | WrapEvent;
export interface MouseInputOptions {
    target?: EventTarget;
    events?: Multiable<MouseNativeEvent>;
    filters?: {
        button?: Multiable<number>;
        buttons?: Multiable<number>;
    };
}
export declare class MouseInputBase<T extends PRXEvent> extends NativeInputBase<T, MouseNativeEvent, MouseEvent> {
    constructor(input: MultiSubject<T>, mapEvent: (e: MouseEvent, action: DefaultAction) => T, options?: MouseInputOptions);
}
export declare class MouseInput extends MouseInputBase<PRXEvent> {
    constructor(input: MultiSubject<PRXEvent>, options?: MouseInputOptions);
}
export interface InputEventButtons extends PRXEvent {
    buttons: number;
}
export declare class MouseInputButtons extends MouseInputBase<InputEventButtons> {
    constructor(input: MultiSubject<InputEventButtons>, options?: MouseInputOptions);
}
export declare class MouseInputPosition extends MouseInputBase<InputEventPosition> {
    constructor(input: MultiSubject<InputEventPosition>, options?: MouseInputOptions);
}
export interface InputEventMouseFull extends PRXEvent, MouseEvent {
}
export declare class MouseInputFull extends MouseInputBase<InputEventMouseFull> {
    constructor(input: MultiSubject<InputEventMouseFull>, options?: MouseInputOptions);
}
export {};

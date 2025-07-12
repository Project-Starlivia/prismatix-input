import type { PositionMap, KeyCodeMap } from "../key-map/types";
import type { DefaultAction, PRXEvent, MultiSubject, PRXSubject } from "../types";
import { type Multiable } from "../utils";
import type { InputEventPosition, PRXInput } from "./types";
type KeyboardNativeEvent = "keydown" | "keyup";
type KeyboardExtensionEvent = "keydown-norepeat" | "keydown-repeat";
type KeyboardEventType = KeyboardNativeEvent | KeyboardExtensionEvent;
export interface KeyboardInputOptions {
    target?: EventTarget;
    key?: Multiable<string>;
    code?: Multiable<string>;
    events?: Multiable<KeyboardEventType>;
}
export interface KeyboardInputEvent extends PRXEvent {
    code: string;
}
export declare abstract class KeyboardInputBase<T extends PRXEvent> implements PRXInput {
    protected readonly subjects: PRXSubject<T>[];
    protected eventTarget: EventTarget;
    protected keySet?: Set<string>;
    protected codeSet?: Set<string>;
    protected eventSet: Set<KeyboardEventType>;
    protected hasKeydown: boolean;
    constructor(input: MultiSubject<T>, mapEvent: (e: KeyboardEvent, action: DefaultAction) => T, options?: KeyboardInputOptions);
    protected mapEvent: (e: KeyboardEvent, action: DefaultAction) => T;
    protected keyFilter: (key: string) => boolean;
    protected codeFilter: (code: string) => boolean;
    protected hasEvent: (name: string) => boolean;
    protected onKeyboardEvent: (e: KeyboardEvent, action: DefaultAction) => void;
    private onKeydownEvent;
    private onKeyupEvent;
    private init;
    dispose(): void;
}
export declare class KeyboardInput extends KeyboardInputBase<KeyboardInputEvent> {
    constructor(input: MultiSubject<KeyboardInputEvent>, options?: KeyboardInputOptions);
}
export declare class KeyboardInputCode extends KeyboardInputBase<PRXEvent> {
    constructor(input: MultiSubject<PRXEvent>, options?: KeyboardInputOptions);
}
export interface InputEventKeyboardFull extends PRXEvent, KeyboardEvent {
}
export declare class KeyboardInputFull extends KeyboardInputBase<InputEventKeyboardFull> {
    constructor(input: MultiSubject<InputEventKeyboardFull>, options?: KeyboardInputOptions);
}
export interface KeyboardInputWithKeyMapOptions extends KeyboardInputOptions {
    keyCodeMap?: KeyCodeMap;
    positionMap?: PositionMap;
    defaultPosition?: number;
}
export declare class KeyboardInputWithKeyMap extends KeyboardInputBase<InputEventPosition> {
    private readonly keyCodeMap;
    private readonly positionMap;
    private readonly defaultPosition;
    constructor(input: MultiSubject<InputEventPosition>, options?: KeyboardInputWithKeyMapOptions);
}
export {};

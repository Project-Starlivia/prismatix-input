import type { DefaultAction, PRXEvent, MultiSubject } from "../types";
import type { PRXInput } from "./types";
export declare const isEventBySetUndef: <T>(set: Set<T> | undefined, value: T) => boolean;
export declare class NativeInputBase<T extends PRXEvent, ET extends string, EN extends Event, A extends string = DefaultAction> implements PRXInput {
    private subjects;
    private listeners;
    constructor(input: MultiSubject<T>, target: EventTarget, events: readonly ET[], actionMap: Record<ET, A>, isEvent: (e: EN) => boolean, mapEvent: (e: EN, action: A) => T);
    dispose(): void;
}

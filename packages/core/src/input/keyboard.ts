import {UtilKeyCodeToUsageIdMap} from "../key-map/code-usage";
import {UtilUsageIdToPositionMap} from "../key-map/usage-position";
import type { PositionMap, KeyCodeMap } from "../key-map/types";
import type {DefaultAction, PRXEvent, MultiSubject, PRXSubject} from "../types";
import { multiableToArray, type Multiable } from "../utils";

import { isEventBySetUndef } from "./utils";
import type {InputEventPosition, PRXInput} from "./types";

type KeyboardNativeEvent = "keydown" | "keyup";
type KeyboardExtensionEvent = "keydown-norepeat" | "keydown-repeat";
type KeyboardEventType = KeyboardNativeEvent | KeyboardExtensionEvent;

export interface KeyboardInputOptions {
    target?: EventTarget
    key?: Multiable<string>
    code?: Multiable<string>
    events?: Multiable<KeyboardEventType>
}

export interface KeyboardInputEvent extends PRXEvent {
    code: string;
}

export abstract class KeyboardInputBase<T extends PRXEvent> implements PRXInput {
    protected readonly subjects: PRXSubject<T>[];
    protected eventTarget: EventTarget;
    protected keySet?: Set<string>;
    protected codeSet?: Set<string>;
    protected eventSet: Set<KeyboardEventType>;
    protected hasKeydown: boolean;

    constructor(
        input: MultiSubject<T>,
        mapEvent: (e: KeyboardEvent, action: DefaultAction) => T,
        options?: KeyboardInputOptions
    ) {
        this.subjects = multiableToArray(input) as PRXSubject<T>[];
        const { target, code, key, events } = options || {};
        this.eventTarget = target || document;
        this.keySet = key ? new Set(multiableToArray(key)) : undefined;
        this.codeSet = code ? new Set(multiableToArray(code)) : undefined;
        this.eventSet = new Set(
            events
                ? Array.isArray(events) ? events : [events]
                : ["keydown", "keydown-norepeat", "keydown-repeat", "keyup"]
        );

        this.hasKeydown =
            this.eventSet.has("keydown") ||
            this.eventSet.has("keydown-norepeat") ||
            this.eventSet.has("keydown-repeat");

        this.mapEvent = mapEvent;
        this.init();
    }

    protected mapEvent: (e: KeyboardEvent, action: DefaultAction) => T;

    protected keyFilter = (key: string) => isEventBySetUndef(this.keySet, key);
    protected codeFilter = (code: string) => isEventBySetUndef(this.codeSet, code);
    protected hasEvent = (name: string) => this.eventSet.has(name as KeyboardEventType);

    protected onKeyboardEvent = (e: KeyboardEvent, action: DefaultAction): void => {
        const event = this.mapEvent(e, action);
        for (const stream of this.subjects) {
            stream.next(event);
        }
    };

    private onKeydownEvent = (e: Event): void => {
        const keyboardEvent = e as KeyboardEvent;
        if (!this.keyFilter(keyboardEvent.key)) return;
        if (!this.codeFilter(keyboardEvent.code)) return;
        const repeat = keyboardEvent.repeat;

        if (this.hasEvent("keydown")) this.onKeyboardEvent(keyboardEvent, 'hold');
        if (repeat ? this.hasEvent("keydown-repeat") : this.hasEvent("keydown-norepeat")) {
            this.onKeyboardEvent(keyboardEvent, repeat ? 'hold' : 'start');
        }
    };

    private onKeyupEvent = (e: Event): void => {
        const keyboardEvent = e as KeyboardEvent;
        if (!this.keyFilter(keyboardEvent.key)) return;
        if (!this.codeFilter(keyboardEvent.code)) return;
        this.onKeyboardEvent(keyboardEvent, 'end');
    };

    private init(): void {
        if (this.hasKeydown) {
            this.eventTarget.addEventListener("keydown", this.onKeydownEvent);
        }
        if (this.eventSet.has("keyup")) {
            this.eventTarget.addEventListener("keyup", this.onKeyupEvent);
        }
    }

    dispose(): void {
        if (this.hasKeydown) {
            this.eventTarget.removeEventListener("keydown", this.onKeydownEvent);
        }
        if (this.eventSet.has("keyup")) {
            this.eventTarget.removeEventListener("keyup", this.onKeyupEvent);
        }
    }
}

export class KeyboardInput extends KeyboardInputBase<KeyboardInputEvent> {
    constructor(
        input: MultiSubject<KeyboardInputEvent>,
        options?: KeyboardInputOptions
    ) {
        super(
            input,
            (e, action) => ({
                key: e.key,
                action,
                time: e.timeStamp,
                code: e.code,
            } as KeyboardInputEvent),
            options
        );
    }
}

export class KeyboardInputCode extends KeyboardInputBase<PRXEvent> {
    constructor(
        input: MultiSubject<PRXEvent>,
        options?: KeyboardInputOptions
    ) {
        super(
            input,
            (e, action) => ({
                key: e.code,
                action,
                time: e.timeStamp,
            } as PRXEvent),
            options
        );
    }
}

export interface InputEventKeyboardFull extends PRXEvent, KeyboardEvent { }

export class KeyboardInputFull extends KeyboardInputBase<InputEventKeyboardFull> {
    constructor(
        input: MultiSubject<InputEventKeyboardFull>,
        options?: KeyboardInputOptions
    ) {
        super(
            input,
            (e, action) => ({
                action,
                time: e.timeStamp,
                ...e
            }),
            options
        );
    }
}

export interface KeyboardInputWithKeyMapOptions extends KeyboardInputOptions {
    keyCodeMap?: KeyCodeMap,
    positionMap?: PositionMap,
    defaultPosition?: number
}

export class KeyboardInputWithKeyMap extends KeyboardInputBase<InputEventPosition> {
    private readonly keyCodeMap: KeyCodeMap;
    private readonly positionMap: PositionMap;
    private readonly defaultPosition: number;

    constructor(
        input: MultiSubject<InputEventPosition>,
        options?: KeyboardInputWithKeyMapOptions
    ) {
        super(
            input,
            (e: KeyboardEvent, action: DefaultAction) => {
                // Get usage ID from key code using the provided keyCodeMap
                const usageId = this.keyCodeMap[e.code];

                // Get position from usage ID using the provided positionMap
                const position = this.positionMap[usageId];

                // Default position if not found in key map
                const x = position?.x ?? this.defaultPosition;
                const y = position?.y ?? this.defaultPosition;

                return {
                    key: e.key,
                    action,
                    time: e.timeStamp,
                    x,
                    y,
                } as InputEventPosition;
            },
            options
        );

        // Use constructor parameters first, then fall back to options, then defaults
        this.keyCodeMap = options?.keyCodeMap || UtilKeyCodeToUsageIdMap;
        this.positionMap = options?.positionMap || UtilUsageIdToPositionMap;
        this.defaultPosition = options?.defaultPosition ?? NaN;
    }
}

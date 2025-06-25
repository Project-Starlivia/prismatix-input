import type { DefaultAction, PRXEvent, MultiSubject, Disposable } from "~/types";
import { multiableToArray, EmptyObject } from "~/utils";

export interface PRXInput extends Disposable {}

export type PRXInputCreator<
    O extends object = EmptyObject,
    T extends PRXEvent = PRXEvent,
    IE extends PRXInput = PRXInput,
> = (
  input: MultiSubject<T>,
  options?: O
) => IE;

export const isEventBySetUndef = <T>(set: Set<T> | undefined, value: T): boolean => {
    if (!set) return true;
    return set.has(value);
}

export const nativeInputBase = <T extends PRXEvent, ET extends string, EN extends Event, A extends string = DefaultAction>(
    input: MultiSubject<T>,
    target: EventTarget,
    events: readonly ET[],
    actionMap: Record<ET, A>,
    isEvent: (e: EN) => boolean,
    mapEvent: (e: EN, action: A) => T,
) => {
    const subjects = multiableToArray(input);

    const listeners = events.map(type => {
        const handler = (e: EN) => {
            const action = actionMap[type];
            if (!action) throw new Error(`No action for event type: ${type}`);
            if (!isEvent(e)) return;
            const event = mapEvent(e, action);
            for (const stream of subjects) {
                stream.next(event);
            }
        };
        const fn = (e: Event) => handler(e as EN);

        target.addEventListener(type, fn);
        return () => target.removeEventListener(type, fn);
    });

    const dispose = (): void => {
        for (const remove of listeners) {
            remove();
        }
    };

    return { dispose };
}

export interface WithPositionInputEvent extends PRXEvent {
    x: number;
    y: number;
}


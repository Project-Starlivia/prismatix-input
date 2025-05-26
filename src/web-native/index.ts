import type { DefaultAction, PRXInputEvent } from "../events";
import type { MultiSubject } from "../subject";
import { multiableToArray } from "../utils";


export interface WithPositionInputEvent extends PRXInputEvent {
    x: number;
    y: number;
}

export const isEventBySetUndef = <T>(set: Set<T> | undefined, value: T): boolean => {
    if (!set) return true;
    return set.has(value);
}

export function nativeInputBase<T extends PRXInputEvent, ET extends string, EN extends Event, A extends string = DefaultAction>(
    input: MultiSubject<T>,
    target: EventTarget,
    events: ET[],
    actionMap: Record<ET, A>,
    isEvent: (e: EN) => boolean,
    mapEvent: (e: EN, action: A) => T
) {
    const _subjects = multiableToArray(input);
    
    const listeners = events.map(type => {
        const handler = (e: EN) => {
            const action = actionMap[type];
            if (!action) throw new Error(`No action for event type: ${type}`);
            if (!isEvent(e)) return;
            const event = mapEvent(e, action);
            for (const stream of _subjects) {
                stream.next(event);
            }
        }
        const fn = (e: Event) => handler(e as EN);
        
        target.addEventListener(type, fn);
        return () => target.removeEventListener(type, fn);
    });

    const dispose = () => {
        for (const remove of listeners) {
            remove();
        }
    }

    return { dispose };
}

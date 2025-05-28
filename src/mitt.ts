import type { Emitter, EventType } from "mitt";
import type { Subject } from "./subject";
import type { PRXInputEvent } from "./events";
import type { Multiable } from "./utils";
import { multiableToArray } from "./utils";

export function createSubject<E extends Record<EventType, T>, T extends PRXInputEvent = E[keyof E]>(
  emitter: Emitter<E>,
  key: keyof E
): Subject<T> {
    const subscribers: { cb: (v: E[keyof E]) => void }[] = [];
    const subscribe = (cb: (v: E[keyof E]) => void) => {
        const listener = { cb };
        subscribers.push(listener);
        emitter.on(key, cb);

        const unsubscribe = () => {
            const index = subscribers.indexOf(listener);
            if (index !== -1) {
                subscribers.splice(index, 1);
                emitter.off(key, cb);
            }
        };

        return { unsubscribe };
    };

    const next = (v: E[typeof key]) => emitter.emit(key, v);
    const dispose = () => {
        for (const { cb } of subscribers) {
            emitter.off(key, cb);
        }
        subscribers.length = 0;
    };

    return { subscribe, next, dispose };
}

export function createSubjects<
    E extends Record<EventType, T>,
    T extends PRXInputEvent,
>(
    emitter: Emitter<E>,
    keys: Multiable<keyof E>,
) {
    const _keys = multiableToArray(keys);
    const _subjects = _keys.reduce((acc, key) => {
        acc[key] = createSubject(emitter, key);
        return acc;
    }, {} as Record<keyof E, Subject<T>>);

    return _subjects as { [K in keyof E]: Subject<E[K]> };
}

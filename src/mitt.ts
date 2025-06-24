import mitt, { Emitter, EventType } from "mitt";
import type { Subject } from "./subject";
import type { PRXInputEvent } from "./events";

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

export function createAllSubjects<
    E extends Record<EventType, T>,
    T extends PRXInputEvent = E[keyof E]
>(
    emitter?: Emitter<E>,
): { [K in keyof E]: Subject<E[K]> } & { emitter: Emitter<E> } {
    if(!emitter) emitter = mitt<E>();

    const subjects = {} as { [K in keyof E]: Subject<E[K]> };

    const keys = Object.keys(emitter) as (keyof E)[];

    for (const key of keys) {
        subjects[key] = createSubject<E, T>(emitter, key) as Subject<E[typeof key]>;
    }

    return { ...subjects, emitter };
}

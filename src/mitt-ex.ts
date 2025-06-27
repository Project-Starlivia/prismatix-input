import { Emitter, EventType } from "mitt";

import type { PRXEvent, PRXSubject } from "./types";

export function createSubject<E extends Record<EventType, T>, T extends PRXEvent = E[keyof E]>(
  emitter: Emitter<E>,
  key: keyof E
): PRXSubject<E[typeof key]> {
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

    return { subscribe, next, dispose } as PRXSubject<E[typeof key]>;
}

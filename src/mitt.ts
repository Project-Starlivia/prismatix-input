import type { Emitter, EventType } from "mitt";
import type { Subject } from "./subject";
import type { PRXInputEvent } from "./events";

export function createSubject<E extends Record<EventType, T>, T extends PRXInputEvent<string, string> = E[keyof E]>(
  emitter: Emitter<E>,
  type: keyof E
): Subject<T> {
    const subscribers: { cb: (v: E[keyof E]) => void }[] = [];
    const subscribe = (cb: (v: E[keyof E]) => void) => {
        const listener = { cb };
        subscribers.push(listener);
        emitter.on(type, cb);

        const unsubscribe = () => {
            const index = subscribers.indexOf(listener);
            if (index !== -1) {
                subscribers.splice(index, 1);
                emitter.off(type, cb);
            }
        };

        return { unsubscribe };
    };

    const next = (v: E[typeof type]) => emitter.emit(type, v);
    const dispose = () => {
        for (const { cb } of subscribers) {
            emitter.off(type, cb);
        }
        subscribers.length = 0;
    };

    return { subscribe, next, dispose };
}

export function createAllSubjects<
    E extends Record<EventType, T>,
    T extends PRXInputEvent<string, string>,
>(
    emitter: Emitter<E>,
) {
    const _subjects = {} as Record<keyof E, Subject<T>>;
    for(const type in emitter.all){
        _subjects[type as keyof E] = createSubject(emitter, type);
    }
    return Array.from(Object.entries(_subjects)).map(([key, subject]) => {
        return [key, subject];
    }) as  { [K in keyof E]: Subject<E[K]> };
}

import type { Emitter, EventType } from "mitt";
import mitt from "mitt";

import type { Subject } from "./subject";
import type { InputEmitter, PRXInputEvent } from "./events";
import type { GetEvent, GetOption,  LogStore } from "./log-store";
import { createLogStore as createBaseLogStore } from "./log-store";

export function createSubject<
  E extends Record<EventType, T>, T extends PRXInputEvent
>(
  emitter: Emitter<E>,
  type: keyof E
): Subject<E[keyof E]> {
    const subscribers = new Set<(v: E[keyof E]) => void>();

    const subscribe = (cb: (v: E[keyof E]) => void) => {
        subscribers.add(cb);
        emitter.on(type, cb);
        const unsubscribe = () => {
            subscribers.delete(cb);
            emitter.off(type, cb);
        }

        return {
            unsubscribe
        };
    }
    const next = (v: E[typeof type]) => {
        emitter.emit(type, v);
    };
    const dispose = () => {
        for (const cb of subscribers) {
            emitter.off(type, cb);
        }
        subscribers.clear();
    };
    return { subscribe, next, dispose };
}
  
type AcceptableKeys<E, T> = {
  [K in keyof E]: T extends E[K] ? K : never
}[keyof E];
export function createLogStore<
    E extends Record<EventType, T> & { global: T },
    T extends PRXInputEvent = E[keyof E]
>(emitter?: Emitter<E>)
    {
    const _emitter = emitter || mitt<E>();
    
    const _subjects = new Map<keyof E, Subject<T>>();
    const _globalSubject = createSubject<E, T>(_emitter, "global") as Subject<T>;
    _subjects.set("global", _globalSubject);
    const _store = createBaseLogStore(_globalSubject);
    const getOrCreateSubject = <K2 extends keyof E>(type: K2): Subject<T> => {
        let subject = _subjects.get(type) as Subject<T> | undefined;
        if (!subject) {
            subject = createSubject<E, T>(_emitter, type) as Subject<T>;
            _subjects.set(type, subject);
        }
        return subject;
    };

    const addEmitter = <
        C extends InputEmitter<O, CT>,
        O extends object = GetOption<C>,
        CT extends T = GetEvent<C>
    >
        (creator: C, props: { actions: Exclude<AcceptableKeys<E, CT>, "global">[], option?: O }) => {
            const localSubjects = props.actions.map(getOrCreateSubject) as Subject<CT>[];
            _store.addEmitter<C, O, CT>(creator, localSubjects, props.option);
            return { ...api, ...subjectsObject() }
        };
    
    const dispose = () => {
        for (const subject of _subjects.values()) {
            subject.dispose();
        }
        _subjects.clear();
        _emitter.all.clear();
    }
    const subjectsObject = () => Object.fromEntries(
        Array.from(_subjects.entries()).map(([key, subject]) => {
            return [key, subject];
        })
    ) as { [K in keyof E]: Subject<E[K]> };
    const api = { ..._store, ...subjectsObject(), addEmitter, dispose };
    return api;
}

type UnionOfProps<E, K extends keyof E = Exclude<keyof E, 'global'>> = E[K];

export type WithGlobal<E extends Record<string, PRXInputEvent>> =
  Omit<E, 'global'> & {
    global: UnionOfProps<E>;
  };
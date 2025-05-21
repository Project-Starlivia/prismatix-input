import type { Emitter, EventType } from "mitt";
import mitt from "mitt";
import type { InputEmitter, PRXInputEvent, Subject } from "./types";
import { createLogStore, type LogStore } from "./log-store";
import type { EmptyObject } from "./util";

export function createSubject<E extends Record<EventType, T>, T extends PRXInputEvent = PRXInputEvent>(emitter: Emitter<E>, type: keyof E): Subject<T> {
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

export type MittLogStore<
  E extends Record<string, PRXInputEvent> & { global: PRXInputEvent }
> = LogStore<E[keyof E]> & {
  [K in keyof E]: Subject<E[K]>;
} & {
  addEmitterMit: <
    O extends object = EmptyObject,
    T extends PRXInputEvent = PRXInputEvent,
    A extends AcceptableKeys<E, T> = AcceptableKeys<E, T>
  >(
    creator: InputEmitter<O, T>,
    props: { actions: Exclude<A, "global">[]; option?: O }
  ) => MittLogStore<E>;
}

type AcceptableKeys<E, T> = {
  [K in keyof E]: T extends E[K] ? K : never
}[keyof E];
export function createStore<
    E extends Record<string, PRXInputEvent> & {global: PRXInputEvent}>(emitter?: Emitter<E>
    )
    : MittLogStore<E>
    {
    const _emitter = emitter || mitt<E>();
    const _globalSubject = createSubject<E, E['global']>(_emitter, "global");
    const _store = createLogStore<E['global']>(_globalSubject);
    const _subjects = new Map<keyof E, Subject<PRXInputEvent>>();
    _subjects.set("global", _globalSubject);
    
    const getOrCreateSubject = (type: keyof E): Subject<PRXInputEvent> => {
        if (!_subjects.has(type)) {
            const _globalSubject = createSubject<E, PRXInputEvent>(_emitter, "global");

            _subjects.set(type, createSubject(_emitter, type));
        }
        return _subjects.get(type) as Subject<E[keyof E]>;
    };

    const addEmitterMit = <O extends object = EmptyObject, T extends PRXInputEvent = PRXInputEvent, A extends AcceptableKeys<E, T> = AcceptableKeys<E, T>>
        (creator: InputEmitter<O, T>, props: { actions: Exclude<A, "global">[], option?: O }) => {
            const localSubjects = props.actions.map(getOrCreateSubject) as Subject<T>[];
            _store.addEmitter<O, T>(creator, localSubjects, props.option);
            return api;
        };
    
    const dispose = () => {
        for (const subject of _subjects.values()) {
            subject.dispose();
        }
        _subjects.clear();
        _emitter.all.clear();
    }
    const subjectsObject = Object.fromEntries(
    Array.from(_subjects.entries())
    ) as { [K in keyof E]: Subject<E[K]> };

    const api = { ..._store, ...subjectsObject, addEmitterMit, dispose };
    return api;
}
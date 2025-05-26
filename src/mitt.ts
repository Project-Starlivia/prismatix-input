import type { Emitter, EventType } from "mitt";
import mitt from "mitt";

import type { Subject } from "./subject";
import type {InputEmitter, InputMiddleware, PRXInputEvent} from "./events";
import { createLogStore as createBaseLogStore } from "./log-store";
import { type Multiable, multiableToArray } from './utils';

export function createSubject<
  E extends Record<EventType, T>, T extends PRXInputEvent
>(
  emitter: Emitter<E>,
  type: keyof E
): Subject<E[keyof E]> {
    const subscribers = new Set<(v: E[keyof E]) => void>();
    let listenerAttached = false;

    const subscribe = (cb: (v: E[keyof E]) => void) => {
        subscribers.add(cb);
        if (!listenerAttached) {
            emitter.on(type, emitToAll);
            listenerAttached = true;
        }

        const unsubscribe = () => {
            subscribers.delete(cb);
            if (subscribers.size === 0 && listenerAttached) {
                emitter.off(type, emitToAll);
                listenerAttached = false;
            }
        };

        return { unsubscribe };
    };

    const emitToAll = (v: E[keyof E]) => {
        for (const cb of subscribers) cb(v);
    };

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

export function createLogStore<
    E extends Record<EventType, T> & { global: T },
    T extends PRXInputEvent = E[keyof E]
>(emitter?: Emitter<E>)
    {
    const _emitter = emitter || mitt<E>();
    
    const _subjects = new Map<keyof E, Subject<T>>();
    const _globalSubject = createSubject<E, T>(_emitter, "global") as Subject<T>;
    _subjects.set("global", _globalSubject);
    const { addEmitter: _addEmitter, addMiddleware: _addMiddleware, ..._store  } = createBaseLogStore(_globalSubject);
    const getOrCreateSubject = <K2 extends keyof E>(type: K2): Subject<T> => {
        return _subjects.get(type) ?? createAndCacheSubject(type);
    };
    const createAndCacheSubject = (type: keyof E): Subject<T> => {
        const subject = createSubject<E, T>(_emitter, type) as Subject<T>;
        _subjects.set(type, subject);
        return subject;
    };
    const addEmitter = <
        K extends Exclude<keyof E, "global">,
        O extends object
    >
        (creator: InputEmitter<O, E[K]>, props: { output: Multiable<K>, options?: O }) => {
            const _output = multiableToArray(props.output);
            const localSubjects = _output.map(getOrCreateSubject) as Subject<E[K]>[];
            _addEmitter(creator, localSubjects, props.options);
            return { ...api, ...subjectsObject() }
        };

    const addMiddleware = <
        K extends Exclude<keyof E, "global">,
        O extends object
    >
    (creator: InputMiddleware<O, E[K], E[K]>, props: { input: Multiable<K>, output: Multiable<K>, options?: O }) => {
        const _input = multiableToArray(props.input);
        const _output = multiableToArray(props.output);
        const inputSubjects = _input.map(getOrCreateSubject) as Subject<E[K]>[];
        const outputSubjects = _output.map(getOrCreateSubject) as Subject<E[K]>[];
        _addMiddleware(creator, inputSubjects, outputSubjects, props.options);
        return { ...api, ...subjectsObject() }
    }
    
    const dispose = () => {
        for (const subject of _subjects.values()) {
            subject.dispose();
        }
        _subjects.clear();
    }
    
    const subjectsObject = () => Object.fromEntries(
        Array.from(_subjects.entries()).map(([key, subject]) => {
            return [key, subject];
        })
    ) as { [K in keyof E]: Subject<E[K]> };
    const api = { ..._store, ...subjectsObject(), addEmitter, addMiddleware, dispose };
    return api;
}

export type WithGlobal<T> = T & {
  global: T[keyof T];
};
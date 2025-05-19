import type { Emitter, EventType } from "mitt";
import mitt from "mitt";
import type { InputActionGenerics, PRXInputEmitter, PRXInputEvent, Subject } from "./types";
import { createPRXLogStore } from "./log-store";
import type { EmptyObject } from "./util";

export function createSubject<K extends keyof T, T extends Record<EventType, unknown>>(emitter: Emitter<T>, type: K): Subject<T[K]> {
    const subscribers = new Set<(v: T[K]) => void>();

    const subscribe = (cb: (v: T[K]) => void) => {
        subscribers.add(cb);
        emitter.on(type, cb);
        const unsubscribe = () => {
            subscribers.delete(cb);
            emitter.off(type, cb);
        }

        return {
            unsubscribe,
            handler: (next: (v: T[K]) => void) => {
                return{
                    unsubscribe
                }
            },
        };
    }
    const next = (v: T[typeof type]) => {
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

type WithGlobal<T> = T & { global: PRXInputEvent };
export function createStore<  E extends WithGlobal<Record<EventType, PRXInputEvent>>, G extends InputActionGenerics = InputActionGenerics>(emitter?: Emitter<E>){
    const _emitter = emitter || mitt<E>();
    const _globalSubject = createSubject(_emitter, "global");
    const _store = createPRXLogStore<G>(_globalSubject);
      const _subjects = new Map<keyof E, Subject<E[keyof E]>>();
    _subjects.set("global", _globalSubject);

    const addEmitter = <O extends object = EmptyObject>
        (creator: PRXInputEmitter<G, O>, props: { actions: Exclude<keyof E, "global">[], option?: O }) => {
            const localSubjects = props.actions.map((action) => {
                return _subjects.get(action) || createSubject(_emitter, action);
            });
            _store.addEmitter(creator, localSubjects, props.option);
            return { ..._store, ...subjectsObject, addEmitter, dispose };
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
    return { ..._store, ...subjectsObject, addEmitter, dispose };
}
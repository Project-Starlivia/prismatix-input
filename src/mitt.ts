import type { Emitter, EventType } from "mitt";
import mitt from "mitt";

import type { Subject } from "./subject";
import type { InputEmitterCreator, InputMiddlewareCreator, PRXInputEvent} from "./events";
import { createLogStore as createBaseLogStore } from "./log-store";
import { type Multiable, multiableToArray } from './utils';

export function createSubject<E extends Record<EventType, T>, T extends PRXInputEvent<string, string> = E[keyof E]>(
  emitter: Emitter<E>,
  type: keyof E
): Subject<E[keyof E]> {
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

export function createLogStore<
    E extends Record<EventType, T> & { global: T },
    T extends PRXInputEvent = E[keyof E]
>(emitter?: Emitter<E>) {
    const _emitter = emitter || mitt<E>();
    
    const _subjects = new Map<keyof E, Subject<T>>();
    const _globalSubject = createSubject<E, T>(_emitter, "global") as Subject<T>;
    _subjects.set("global", _globalSubject);

    const { addEmitter: _addEmitter, addMiddleware: _addMiddleware, dispose: _dispose, ..._store  } = createBaseLogStore(_globalSubject);

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
        (creator: InputEmitterCreator<O, E[K]>, props: { emitterId?: string, output?: Multiable<K>, options?: O }) => {
            const { emitterId, output, options  } = props;
            const _output = output ? multiableToArray(output) : [] as K[];
            const outputSubjects = _output.map(getOrCreateSubject) as Subject<E[K]>[];
            _addEmitter(creator, { emitterId, output: outputSubjects, options} );
            return { ...api, subject: subjectsObject() }
        };

    const addMiddleware = <
        KI extends keyof E,
        KO extends Exclude<keyof E, "global">,
        O extends object
    >
    (creator: InputMiddlewareCreator<O, E[KI], E[KO]>, props: { middlewareId?: string, input: Multiable<KI>, output?: Multiable<KO>, options?: O }) => {
        const { middlewareId, input, output, options  } = props;
        const _input = multiableToArray(input);
        const _output = output ? multiableToArray(output) : [] as KO[];
        const inputSubjects = _input.map(getOrCreateSubject) as Subject<E[KI]>[];
        const outputSubjects = _output.map(getOrCreateSubject) as Subject<E[KO]>[];
        _addMiddleware(creator, { middlewareId, input: inputSubjects, output: outputSubjects, options});
        return { ...api, subject: subjectsObject() }
    }
    
    const dispose = () => {
        for (const subject of _subjects.values()) {
            subject.dispose();
        }
        _dispose();
    }
    
    const subjectsObject = () => Object.fromEntries(
        Array.from(_subjects.entries()).map(([key, subject]) => {
            return [key, subject];
        })
    ) as { [K in keyof E]: Subject<E[K]> };
    const api = { ..._store, addEmitter, addMiddleware, subject: subjectsObject(), dispose };
    return api;
}

export type WithGlobal<T> = T & {
  global: T[keyof T];
};

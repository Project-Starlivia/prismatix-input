import type { InputEmitter, PRXInputEvent, MultiSubject, Subject } from "./types";
import { multiableToArray, type EmptyObject } from "./utils";


export type GetOption<T> = T extends InputEmitter<infer O, PRXInputEvent> ? O : never;
export type GetEvent<T> = T extends InputEmitter<object, infer E> ? E : never;

export interface LogStore<T extends PRXInputEvent = PRXInputEvent> {
	log: T[];
	clear: () => void;
	addEmitter: <
		C extends InputEmitter<O, T>,
		O extends object = GetOption<C>,
		T extends PRXInputEvent = GetEvent<C>>(
		creator: C,
		subjects: Subject<T>[],
  		option?: O
	) => LogStore<T>;
	dispose: () => void;
}

export function createLogStore<T extends PRXInputEvent = PRXInputEvent>(
	globalSubject: Subject<T>,
): LogStore<T> {
	const log: T[] = [];
	const clear = () => {
		log.length = 0;
	};
	const addEmitter = <C extends InputEmitter<O, E>, O extends object = GetOption<C>, E extends PRXInputEvent = GetEvent<C>>
		(creator: InputEmitter<O, E>, s: MultiSubject<E>, option?: O) => {
			const _subjects = [...multiableToArray(s), globalSubject] as MultiSubject<E>;
			creator(_subjects, option);
			return api;
		};
	const sub = globalSubject.subscribe((v) => {
		log.push(v);
	});
	const dispose = () => {
		sub.unsubscribe();
	};
	const api  = { log, clear, addEmitter, dispose} as LogStore<T>;
	return api;
}

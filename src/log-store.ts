import type { InputEmitter, PRXInputEvent, MultiSubject, Subject } from "./types";
import { multiableToArray, type EmptyObject } from "./util";

export interface LogStore<T extends PRXInputEvent = PRXInputEvent> {
	log: T[];
	clear: () => void;
	addEmitter: <O extends object = EmptyObject, E extends PRXInputEvent = PRXInputEvent>
		(creator: InputEmitter<O, E>, subject: MultiSubject<E>, option?: O)
		 => LogStore<T>;
	dispose: () => void;
}

export function createLogStore<T extends PRXInputEvent = PRXInputEvent>(
	globalSubject: Subject<T>,
): LogStore<T> {
	const log: T[] = [];
	const clear = () => {
		log.length = 0;
	};
	const addEmitter = <O extends object = EmptyObject, E extends PRXInputEvent = PRXInputEvent>
		(creator: InputEmitter<O, E>, s: MultiSubject<E>, option?: O) => {
			const _subjects = [...multiableToArray(s), globalSubject] as MultiSubject<E>;
			creator(_subjects, option);
			return { log, clear, addEmitter, dispose };
		};
	const sub = globalSubject.subscribe((v) => {
		log.push(v);
	});
	const dispose = () => {
		sub.unsubscribe();
	};
	return { log, clear, addEmitter, dispose };
}

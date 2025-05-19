import type { PRXMultiSubject, PRXInputEmitter, PRXInputEvent, InputActionGenerics, Subject } from "./types";
import { multiableToArray, type EmptyObject } from "./util";

export interface PRXLogStore<G extends InputActionGenerics = InputActionGenerics> {
	log: PRXInputEvent[];
	clear: () => void;
	addEmitter:  <O extends object = EmptyObject>(creator: PRXInputEmitter<G, O>, subject: PRXMultiSubject<G>, option?: O) => PRXLogStore<G>;
	dispose: () => void;
}

export function createPRXLogStore<G extends InputActionGenerics = InputActionGenerics>(
	globalSubject: Subject<PRXInputEvent<G>>,
): PRXLogStore<G> {
	const log: PRXInputEvent<G>[] = [];
	const clear = () => {
		log.length = 0;
	};
	const addEmitter = <O extends object = EmptyObject>
		(creator: PRXInputEmitter<G, O>, s: PRXMultiSubject<G>, option?: O) => {
			const _subjects = [...multiableToArray(s), globalSubject];
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

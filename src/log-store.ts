import type {InputEmitter, InputMiddleware, PRXInputEvent} from "./events";
import type { MultiSubject, Subject } from "./subject";
import { multiableToArray } from "./utils";


export type GetOption<T> = T extends InputEmitter<infer O, PRXInputEvent> ? O : never;
export type GetEvent<T> = T extends InputEmitter<object, infer E> ? E : never;

export interface LogStore<T extends PRXInputEvent = PRXInputEvent> {
	log: T[];
	clear: () => void;
	addEmitter: <
		C extends InputEmitter<O, T>,
		O extends object = GetOption<C>,
		T extends PRXInputEvent = GetEvent<C>
	>(
		creator: C,
		s: MultiSubject<T>,
		option?: O
	) => LogStore<T>;
	addMiddleware: <
		C extends InputMiddleware<Opt, I, O>,
		Opt extends object = GetOption<C>,
		I extends PRXInputEvent = GetEvent<C>,
		O extends PRXInputEvent = GetEvent<C>
	>(
		creator: C,
		s: MultiSubject<I>,
		o: MultiSubject<O>,
		option?: Opt
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
		(creator: InputEmitter<O, E>, inputSubject: MultiSubject<E>, option?: O) => {
			const _subjects = [...multiableToArray(inputSubject), globalSubject] as MultiSubject<E>;
			creator(_subjects, option);
			return api;
		};
	const addMiddleware = <C extends InputMiddleware<Opt, I, O>, Opt extends object = GetOption<C>, I extends PRXInputEvent = GetEvent<C>, O extends PRXInputEvent = GetEvent<C>>
		(creator: InputMiddleware<Opt, I, O>, inputSubject: MultiSubject<I>, outputSubject: MultiSubject<O>, option?: Opt) => {
		const _subjects = [...multiableToArray(outputSubject), globalSubject] as MultiSubject<O>;
			creator(inputSubject, _subjects, option);
			return api;
	}
	const sub = globalSubject.subscribe((v) => {
		log.push(v);
	});
	const dispose = () => {
		sub.unsubscribe();
	};
	const api  = { log, clear, addEmitter, addMiddleware, dispose } as LogStore<T>;
	return api;
}

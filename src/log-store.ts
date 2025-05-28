import type {InputEmitter, InputEmitterCreator, InputMiddleware, InputMiddlewareCreator, PRXInputEvent} from "./events";
import type { MultiSubject, Subject } from "./subject";
import { multiableToArray } from "./utils";


export type GetOption<T> = T extends InputEmitterCreator<infer O> ? O : never;
export type GetEvent<T> = T extends InputEmitterCreator<object, infer E> ? E : never;

export interface LogStore<
	T extends PRXInputEvent<string, string> = PRXInputEvent
> {
	log: T[];
	clear: () => void;
	addEmitter: <
		C extends InputEmitterCreator<O, T>,
		O extends object = GetOption<C>,
		T extends PRXInputEvent<string, string> = GetEvent<C>
	>(
		creator: C,
		props: {
			emitterId?: string,
			output?: MultiSubject<T>,
			options?: O
		}
	) => LogStore<T>;
	removeEmitter: (emitterId: string) => void;
	emitter: Record<string, InputEmitter>;
	addMiddleware: <
		C extends InputMiddlewareCreator<Opt, I, O>,
		Opt extends object = GetOption<C>,
		I extends PRXInputEvent<string, string> = GetEvent<C>,
		O extends PRXInputEvent<string, string> = GetEvent<C>
	>(
		creator: C,
		props: {
			middlewareId?: string,
			input: MultiSubject<I>,
			output?: MultiSubject<O>,
			options?: Opt
		}
	) => LogStore<T>;
	removeMiddleware: (middlewareId: string) => void;
	middleware: Record<string, InputMiddleware>;
	dispose: () => void;
}

export function createLogStore<
	T extends PRXInputEvent<string, string> = PRXInputEvent
>(
	globalSubject: Subject<T>,
): LogStore<T> {
	const log: T[] = [];
	const clear = () => {
		log.length = 0;
	};

	const _creator: Record<string, number> = {};
	const addCreator = (name: string): string => {
		_creator[name] = _creator[name] ? _creator[name] + 1 : 0;
		return `${name}${_creator[name] ? _creator[name] : ""}`;
	}

	const _emitter: Record<string, InputEmitter> = {};
	const addEmitter = <
		C extends InputEmitterCreator<O, E, IE>,
		O extends object = GetOption<C>,
		E extends PRXInputEvent<string, string> = GetEvent<C>,
		IE extends InputEmitter = InputEmitter
	>(
		creator: C,
		props: {
			emitterId?: string,
			output?: MultiSubject<E>,
			options?: O
		}) => {
			const { emitterId, output, options } = props;
			const _subjects = [...multiableToArray(output), globalSubject] as MultiSubject<E>;
			const _creatorId = addCreator(creator.name);
			const _emitterId = emitterId ?? _creatorId;
			_middleware[_emitterId] = creator(_subjects, options) as IE;
			return  {
				...api,
				middleware: _middleware as typeof _middleware & IE,
			};

		};
	const removeEmitter = (emitterId: string) => {
		const e = _emitter[emitterId];
		if (e) {
			e.dispose();
			delete _emitter[emitterId];
		}
	}

	const _middleware: Record<string, InputMiddleware> = {};
	const addMiddleware = <
		C extends InputMiddlewareCreator<Opt, I, O, IM>,
		Opt extends object = GetOption<C>,
		I extends PRXInputEvent<string, string> = GetEvent<C>,
		O extends PRXInputEvent<string, string> = GetEvent<C>,
		IM extends InputMiddleware = InputMiddleware
	>(
		creator: C,
		props: {
			middlewareId?: string,
			input: MultiSubject<I>,
			output?: MultiSubject<O>,
			options?: Opt
		}) => {
			const { middlewareId, input, output, options } = props;
			const _subjects = [...multiableToArray(output), globalSubject] as MultiSubject<O>;
			const _creatorId = addCreator(creator.name);
			const _middlewareId = middlewareId ?? _creatorId;
			_middleware[_middlewareId] = creator(input, _subjects, options) as IM;
			return  {
				...api,
				middleware: _middleware as typeof _middleware & IM,
			};	}
	const removeMiddleware = (middlewareId: string) => {
		const m = _middleware[middlewareId];
		if (m) {
			m.dispose();
			delete _middleware[middlewareId];
		}
	}

	const globalSubscription = globalSubject.subscribe((v) => {
		log.push(v);
	});
	const dispose = () => {
		globalSubscription.unsubscribe();
		for (const emitter of Object.values(_emitter)) {
			emitter.dispose();
		}
		for (const middleware of Object.values(_middleware)) {
			middleware.dispose();
		}
		log.length = 0;
	};
	const api  = { log, clear, addEmitter, removeEmitter, emitter: _emitter, addMiddleware, removeMiddleware, middleware: _middleware, dispose } as LogStore<T>;
	return api;
}

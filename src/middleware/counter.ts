import {InputMiddleware, InputMiddlewareCreator, PRXInputEvent} from "../events";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

export type CounterInputOptions<T extends PRXInputEvent = PRXInputEvent> = {
    defaultCount?: number;
    counterHandler?: (event: T, counter: number) => number;
}

export interface CounterInputEvent extends PRXInputEvent {
    count: number;
}

export interface CounterMiddleware extends InputMiddleware {
    get: () => number;
    reset: () => void;
    set: (value: number) => void;
}

export const counterMiddleware: InputMiddlewareCreator<
    CounterInputOptions,
    PRXInputEvent,
    CounterInputEvent
> = <T extends PRXInputEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<CounterInputEvent>,
    options?: CounterInputOptions
): CounterMiddleware => {
    const { defaultCount, counterHandler } = options || {};
    let count = defaultCount || 0;
    const counterHandlerFn = counterHandler || ((e, c) => c + 1);

    const middleware = middlewareBase(input, output, (event) => {
        count = counterHandlerFn(event, count);
        return {
            ...event,
            count
        } as CounterInputEvent;
    }, options);

    return {
        ...middleware,
        get: () => count,
        reset: (): void => { count = defaultCount || 0; },
        set: (value: number): void => { count = value; },
    };
};

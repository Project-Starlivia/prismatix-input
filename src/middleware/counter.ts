import type { PRXEvent, MultiSubject } from "~/types";

import { middlewareBase, InputMiddlewareCreator, PRXMiddleware } from ".";

export type CounterInputOptions<T extends PRXEvent = PRXEvent> = {
    defaultCount?: number;
    counterHandler?: (event: T, counter: number) => number;
}

export interface CounterInputEvent extends PRXEvent {
    count: number;
}

export interface CounterMiddleware extends PRXMiddleware {
    get: () => number;
    reset: () => void;
    set: (value: number) => void;
}

export const createCounterMiddleware: InputMiddlewareCreator<
    CounterInputOptions,
    PRXEvent,
    CounterInputEvent
> = <T extends PRXEvent>(
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

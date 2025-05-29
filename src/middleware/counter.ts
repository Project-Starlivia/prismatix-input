import {InputMiddlewareCreator, PRXInputEvent} from "../events";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

export type CounterInputOptions<T extends PRXInputEvent = PRXInputEvent> = {
    defaultCount?: number;
    counterHandler?: (event: T, counter: number) => number;
}

export interface CounterInputEvent extends PRXInputEvent {
    count: number;
}

export const counterMiddleware: InputMiddlewareCreator<
    CounterInputOptions,
    PRXInputEvent,
    CounterInputEvent
> = <T extends PRXInputEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<CounterInputEvent>,
    options?: CounterInputOptions
) => {
    const { defaultCount, counterHandler } = options || {};
    let count = defaultCount || 0;
    const _counterHandler = counterHandler || ((e, c) => c++);

    const middleware = middlewareBase(input, output, (event) => {
        count = _counterHandler(event, count);
        return {
            ...event,
            count
        } as CounterInputEvent;
    }, options);
    return {
        ...middleware,
        get: () => count,
        reset: () => count = defaultCount || 0,
        set: (value: number) => count = value,
    }
};

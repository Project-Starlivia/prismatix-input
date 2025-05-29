import {InputMiddlewareCreator, PRXInputEvent} from "../events";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

export type CounterInputOptions = {
    defaultCount?: number;
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
    const { defaultCount } = options || {};
    let count = defaultCount || 0;

    const middleware = middlewareBase(input, output, (event) => {
        count++;
        return {
            ...event,
            count: count
        };
    }, options);
    return {
        ...middleware,
        get: () => count,
        reset: () => count = defaultCount || 0,
        set: (value: number) => count = value,
    }
};

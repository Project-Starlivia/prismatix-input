import {InputMiddlewareCreator, PRXInputEvent} from "../events";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

export type CountUpInputOptions = {
    defaultCount?: number;
}

export interface CountUpInputEvent extends PRXInputEvent {
    count: number;
}

export const countUpMiddleware: InputMiddlewareCreator<
    CountUpInputOptions,
    PRXInputEvent,
    CountUpInputEvent
> = <T extends PRXInputEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<CountUpInputEvent>,
    options?: CountUpInputOptions
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

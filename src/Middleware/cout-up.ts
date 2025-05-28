import {InputMiddlewareCreator, PRXInputEvent} from "../events";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

export type CountUpInputOptions = {
    defaultCount?: number;
}

export type CountUpInputEvent<T extends PRXInputEvent<string, string> = PRXInputEvent> = T & {
    count: number;
}

export const countUpInput: InputMiddlewareCreator<
    CountUpInputOptions,
    PRXInputEvent,
    CountUpInputEvent<PRXInputEvent>
> = <T extends PRXInputEvent<string, string>>(
    input: MultiSubject<T>,
    output: MultiSubject<CountUpInputEvent<T>>,
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
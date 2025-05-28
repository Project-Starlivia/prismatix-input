import {InputMiddlewareCreator, PRXInputEvent} from "../events";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

export type RepeatInputOptions = {
    maxInterval?: number;
}

export type RepeatInputEvent<T extends PRXInputEvent<string, string> = PRXInputEvent> = T & {
    repeatCount: number;
}


export const repeatInput: InputMiddlewareCreator<
    RepeatInputOptions,
    PRXInputEvent,
    RepeatInputEvent<PRXInputEvent>
> = <T extends PRXInputEvent<string, string>>(
    input: MultiSubject<T>,
    output: MultiSubject<RepeatInputEvent<T>>,
    options?: RepeatInputOptions
) => {
    const { maxInterval } = options || {};
    const _maxInterval = maxInterval || 100;

    const activeRepeats = new Map<string, {
        lastTime: number,
        repeatCount: number
    }>();

    return middlewareBase(input, output, (event) => {
        const repeat = activeRepeats.get(event.key);
        const now = event.time;
        if(repeat) {
            const interval = now - repeat.lastTime;
            if(interval < _maxInterval) {
                repeat.repeatCount++;
                repeat.lastTime = now;
                activeRepeats.set(event.key, repeat);
                return {
                    ...event,
                    repeatCount: repeat.repeatCount
                }
            }
        }
        activeRepeats.set(event.key, {
            lastTime: now,
            repeatCount: 0
        });
        return event;
    })
};
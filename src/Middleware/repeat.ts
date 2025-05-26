import {InputMiddleware, PRXInputEvent} from "../events";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

export type RepeatInputOptions = {
    maxInterval?: number;
}

export type WithRepeatInputEvent<T extends PRXInputEvent> = T & {
    repeatCount: number;
}


export const repeatBaseInput: InputMiddleware<
    RepeatInputOptions,
    PRXInputEvent,
    WithRepeatInputEvent<PRXInputEvent>
> = <T extends PRXInputEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<WithRepeatInputEvent<T>>,
    options?: RepeatInputOptions
) => {
    const { maxInterval } = options || {};
    const _maxInterval = maxInterval || 1;

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
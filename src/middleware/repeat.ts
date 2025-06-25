import type { PRXEvent, MultiSubject } from "~/types";

import { middlewareBase, InputMiddlewareCreator } from ".";

export interface RepeatInputOptions {
    maxInterval?: number;
}

export interface RepeatInputEvent extends PRXEvent {
    repeatCount: number;
}


export const createRepeatMiddleware: InputMiddlewareCreator<
    RepeatInputOptions,
    PRXEvent,
    RepeatInputEvent
> = <T extends PRXEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<RepeatInputEvent>,
    options?: RepeatInputOptions
) => {
    const { maxInterval } = options || {};
    const maxInt = maxInterval || 100;

    const activeRepeats = new Map<string, {
        lastTime: number;
        repeatCount: number;
    }>();

    return middlewareBase(input, output, (event) => {
        const repeat = activeRepeats.get(event.key);
        const now = event.time;
        if (repeat) {
            const interval = now - repeat.lastTime;
            if (interval < maxInt) {
                repeat.repeatCount++;
                repeat.lastTime = now;
                activeRepeats.set(event.key, repeat);
                return {
                    ...event,
                    repeatCount: repeat.repeatCount
                } as RepeatInputEvent;
            }
        }
        activeRepeats.set(event.key, {
            lastTime: now,
            repeatCount: 0
        });
        return {
            ...event,
            repeatCount: 0
        } as RepeatInputEvent;
    }, options);
};

﻿import type { PRXEvent, MultiSubject } from "~/types";
import {Multiable, multiableToArray} from "~/utils";

import { middlewareBase, InputMiddlewareCreator } from ".";

export type DurationAction = "duration";
export interface DurationInputEvent extends PRXEvent {
    duration: number;
}

export interface DurationInputOptions {
    minDuration?: number;
    maxDuration?: number;
}
export interface MultiDurationInputOptions extends DurationInputOptions {
    startAction?: Multiable<string>;
    endAction?: Multiable<string>;
}

const durationBaseInput = <T extends PRXEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<DurationInputEvent>,
    isStart: (e: T) => boolean,
    isEnd: (e: T) => boolean,
    options?: DurationInputOptions
) => {
    const { minDuration, maxDuration } = options || {};
    const minDur = minDuration || 0;
    const maxDur = maxDuration || Infinity;

    const filter = (e: T, duration: number) => duration >= minDur && duration <= maxDur;

    const startedKeys = new Map<string, number>();

    const processEvent = (event: T): DurationInputEvent | null => {
        if (isStart(event)) {
            startedKeys.set(event.key, event.time);
            return null;
        } else if (isEnd(event)) {
            const startTime = startedKeys.get(event.key);
            if (startTime === undefined) return null;

            const endTime = event.time;
            const duration = endTime - startTime;

            startedKeys.delete(event.key);

            if (!filter(event, duration)) return null;
            return {
                ...event,
                action: "duration",
                duration
            } as DurationInputEvent;
        }
        return null;
    };

    return middlewareBase<
        T,
        DurationInputEvent,
        DurationInputOptions
    >(input, output, processEvent, options || {});
};

export const createStartToEndDurationMiddleware: InputMiddlewareCreator<
    DurationInputOptions,
    PRXEvent,
    DurationInputEvent
> = <T extends PRXEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<DurationInputEvent>,
    options?: DurationInputOptions
) => {
    return durationBaseInput(input, output, (e) => e.action === 'start', (e) => e.action === 'end', options);
};

export const createMultiDurationMiddleware: InputMiddlewareCreator<
    DurationInputOptions,
    PRXEvent,
    DurationInputEvent
> = <T extends PRXEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<DurationInputEvent>,
    options?: MultiDurationInputOptions
) => {
    const { startAction, endAction } = options || {};
    const startActions = new Set(startAction ? multiableToArray(startAction) : ["start"]);
    const endActions = new Set(endAction ? multiableToArray(endAction) : ["end"]);

    return durationBaseInput(
        input, 
        output, 
        (e) => startActions.has(e.action), 
        (e) => endActions.has(e.action), 
        options
    );
};

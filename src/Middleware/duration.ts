import {DefaultAction, InputMiddleware, PRXInputEvent} from "../events";
import {Multiable, multiableToArray} from "../utils";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

type WithDurationInputEvent<T extends PRXInputEvent> = T & {
    duration: number;
}

export type DurationInputOptions = {
    minDuration?: number;
    maxDuration?: number;
}
export type MultiDurationInputOptions = DurationInputOptions & {
    startAction?: Multiable<string>;
    endAction?: Multiable<string>;
}

const durationBaseInput = <T extends PRXInputEvent, A extends string = DefaultAction>(
    input: MultiSubject<T>,
    output: MultiSubject<WithDurationInputEvent<T>>,
    isStart: (key: A) => boolean,
    isEnd: (key: A) => boolean,
    options?: DurationInputOptions
) => {
    const { minDuration, maxDuration } = options || {};
    const _minDuration = minDuration || 0;
    const _maxDuration = maxDuration || Infinity;


    const filter = (e: T, duration: number) => duration >= _minDuration && duration <= _maxDuration;

    // Create a closure to maintain state across events
    const startedKeys = new Map<string, number>();

    const processEvent = (event: T): WithDurationInputEvent<T> | null => {
        if(isStart(event.key as A)) {
            startedKeys.set(event.key, event.time);
            return null;
        } else if(isEnd(event.key as A)) {
            const startTime = startedKeys.get(event.key);
            if(startTime == undefined) return null;

            const endTime = event.time;
            const duration = endTime - startTime;

            startedKeys.delete(event.key);

            if(!filter(event, duration)) return null;

            return {
                ...event,
                duration
            } as WithDurationInputEvent<T>;
        }
        return null;
    };

    return middlewareBase(input, output, processEvent, options || {});
}

export const startToEndDurationInput: InputMiddleware<
    DurationInputOptions,
    PRXInputEvent,
    WithDurationInputEvent<PRXInputEvent>
> = (
    input: MultiSubject<PRXInputEvent>,
    output: MultiSubject<WithDurationInputEvent<PRXInputEvent>>,
    options?: DurationInputOptions
) => {
    return durationBaseInput(input, output, (key) => key == 'start', (key) => key == 'end', options);
}
export const multiDurationInput:
    InputMiddleware<
        DurationInputOptions,
        PRXInputEvent,
        WithDurationInputEvent<PRXInputEvent>
    > = <T extends PRXInputEvent, A extends string = DefaultAction>
(
    input: MultiSubject<T>,
    output: MultiSubject<WithDurationInputEvent<T>>,
    options?: MultiDurationInputOptions
) => {
    const { startAction, endAction } = options || {};
    const _startActions = new Set(startAction ? multiableToArray(startAction): ["start"]);
    const _endActions = new Set(endAction ? multiableToArray(endAction): ["end"]);

    return durationBaseInput<T, A>(input, output, (key) => _startActions.has(key), (key) => _endActions.has(key), options);
};

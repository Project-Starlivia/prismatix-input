import {DefaultAction, InputMiddleware, PRXInputEvent} from "../events";
import {Multiable, multiableToArray} from "../utils";
import {MultiSubject} from "../subject";
import { middlewareBase } from "./index";

export type DurationAction = "duration";
export type DurationInputEvent<
    T extends PRXInputEvent<string, DurationAction> = PRXInputEvent<string, DurationAction>
> = T & {
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

const durationBaseInput = <T extends PRXInputEvent<string, string>>(
    input: MultiSubject<T>,
    output: MultiSubject<DurationInputEvent>,
    isStart: (e: T) => boolean,
    isEnd: (e: T) => boolean,
    options?: DurationInputOptions
) => {
    const { minDuration, maxDuration } = options || {};
    const _minDuration = minDuration || 0;
    const _maxDuration = maxDuration || Infinity;

    const filter = (e: T, duration: number) => duration >= _minDuration && duration <= _maxDuration;

    const startedKeys = new Map<string, number>();

    const processEvent = (event: T): DurationInputEvent | null => {
        if(isStart(event)) {
            startedKeys.set(event.key, event.time);
            return null;
        } else if(isEnd(event)) {
            const startTime = startedKeys.get(event.key);
            if(startTime == undefined) return null;

            const endTime = event.time;
            const duration = endTime - startTime;

            startedKeys.delete(event.key);

            if(!filter(event, duration)) return null;
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
}

export const startToEndDurationInput: InputMiddleware<
    DurationInputOptions,
    PRXInputEvent<string, string>,
    DurationInputEvent
> = <T extends PRXInputEvent<string, string>>(
    input: MultiSubject<T>,
    output: MultiSubject<DurationInputEvent>,
    options?: DurationInputOptions
) => durationBaseInput(input, output, (e) => e.action == 'start', (e) => e.action == 'end', options);
export const multiDurationInput:
    InputMiddleware<
        DurationInputOptions,
        PRXInputEvent<string, string>,
        DurationInputEvent
    > = <T extends PRXInputEvent<string, string>>
(
    input: MultiSubject<T>,
    output: MultiSubject<DurationInputEvent>,
    options?: MultiDurationInputOptions
) => {
    const { startAction, endAction } = options || {};
    const _startActions = new Set(startAction ? multiableToArray(startAction): ["start"]);
    const _endActions = new Set(endAction ? multiableToArray(endAction): ["end"]);

    return durationBaseInput(input, output, (e) => _startActions.has(e.action), (e) => _endActions.has(e.action), options);
};

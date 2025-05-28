import type {DefaultAction, PRXInputEvent} from "../events";
import type { MultiSubject } from "../subject";
import { multiableToArray } from "../utils";

export function middlewareBase<
    I extends PRXInputEvent = PRXInputEvent,
    O extends PRXInputEvent = PRXInputEvent,
    Opt extends object = {},
>(
    input: MultiSubject<I>,
    output: MultiSubject<O>,
    processEvent: (event: I, options: Opt) => O | null,
    options: Opt = {} as Opt
) {
    const _input = multiableToArray(input);
    const _output = multiableToArray(output);

    const unsubscribes = _input.map(inputSubject => 
        inputSubject.subscribe(event => {
            const processedEvent = processEvent(event, options);
            if (processedEvent) {
                for (const outputSubject of _output) {
                    outputSubject.next(processedEvent);
                }
            }
        })
    );

    const dispose = () => {
        for (const unsubscribe of unsubscribes) {
            unsubscribe.unsubscribe();
        }
    };

    return { dispose };
}

export * from './duration';
export * from './repeat';
export * from './cout-up';

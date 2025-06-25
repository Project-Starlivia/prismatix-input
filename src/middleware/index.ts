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
    options: Opt = {} as Opt,
) {
    const inputSubjects = multiableToArray(input);
    const outputSubjects = multiableToArray(output);

    const unsubscribes = inputSubjects.map(inputSubject => 
        inputSubject.subscribe(event => {
            const processedEvent = processEvent(event, options);
            if (processedEvent) {
                for (const outputSubject of outputSubjects) {
                    outputSubject.next(processedEvent);
                }
            }
        })
    );

    const dispose = (): void => {
        for (const unsubscribe of unsubscribes) {
            unsubscribe.unsubscribe();
        }
    };

    return { dispose };
}

export * from './duration';
export * from './repeat';
export * from './counter';
export * from './keycode-position';

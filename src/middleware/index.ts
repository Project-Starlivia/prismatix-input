import type { MultiSubject, PRXEvent, Disposable } from "~/types";
import { multiableToArray, EmptyObject } from "~/utils";

export interface PRXMiddleware extends Disposable {}

export type InputMiddlewareCreator<
    Opt extends object = EmptyObject,
    I extends PRXEvent = PRXEvent,
    O extends PRXEvent = PRXEvent,
    IM extends PRXMiddleware = PRXMiddleware
> = (
  input: MultiSubject<I>,
  output: MultiSubject<O>,
  options?: Opt
) => IM;



export function middlewareBase<
    I extends PRXEvent = PRXEvent,
    O extends PRXEvent = PRXEvent,
    Opt extends object = {},
>(
    input: MultiSubject<I>,
    output: MultiSubject<O>,
    processEvent: (event: I, options: Opt) => O | null,
    options: Opt = {} as Opt,
): PRXMiddleware {
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

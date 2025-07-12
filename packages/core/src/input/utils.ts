import type {DefaultAction, PRXEvent, MultiSubject, PRXSubject} from "../types";
import { multiableToArray } from "../utils";
import type { PRXInput } from "./types";

export const isEventBySetUndef = <T>(set: Set<T> | undefined, value: T): boolean => {
    if (!set) return true;
    return set.has(value);
}

export class NativeInputBase<T extends PRXEvent, ET extends string, EN extends Event, A extends string = DefaultAction> implements PRXInput {
    private subjects: PRXSubject<T>[];
    private listeners: (() => void)[];

    constructor(
        input: MultiSubject<T>,
        target: EventTarget,
        events: readonly ET[],
        actionMap: Record<ET, A>,
        isEvent: (e: EN) => boolean,
        mapEvent: (e: EN, action: A) => T,
    ) {
        this.subjects = multiableToArray(input) as PRXSubject<T>[];

        this.listeners = events.map(type => {
            const handler = (e: EN) => {
                const action = actionMap[type];
                if (!action) throw new Error(`No action for event type: ${type}`);
                if (!isEvent(e)) return;
                const event = mapEvent(e, action);
                for (const stream of this.subjects) {
                    stream.next(event);
                }
            };
            const fn = (e: Event) => handler(e as EN);

            target.addEventListener(type, fn);
            return () => target.removeEventListener(type, fn);
        });
    }

    dispose(): void {
        for (const remove of this.listeners) {
            remove();
        }
    }
}

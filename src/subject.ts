import type { Multiable } from "./utils";

export interface Subject<T> {
    subscribe(callback: (value: T) => void): Subscription;
    next(value: T): void;
    dispose(): void;
}

export interface Subscription {
    unsubscribe(): void;
}

export type MultiSubject<T> = Multiable<Subject<T>>;

import type { Multiable } from "./utils";

export interface Subject<T> {
    subscribe(cb: (v: T) => void): Subscription;
    next(v: T): void;
    dispose(): void;
}
export interface Subscription {
  unsubscribe(): void;
}
export type MultiSubject<T> =Multiable<Subject<T>>;

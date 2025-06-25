import type { EmptyObject, Multiable } from "./utils";

export type DefaultAction = "start" | "hold" | "move" | "end";

export interface PRXEvent<
  K extends string = string,
  A extends string = DefaultAction,
> {
  readonly key: K;
  readonly action: A;
  readonly time: number;
}

export interface Disposable {
  dispose(): void;
}

export interface PRXSubject<T> {
    subscribe(callback: (value: T) => void): Subscription;
    next(value: T): void;
    dispose(): void;
}

export interface Subscription {
    unsubscribe(): void;
}

export type MultiSubject<T> = Multiable<PRXSubject<T>>;

import type { EmptyObject, Multiable } from "./util";

export interface Subject<T> {
    subscribe(cb: (v: T) => void): Subscription;
    next(v: T): void;
    dispose(): void;
}
export interface Subscription {
  unsubscribe(): void;
}
export type MultiSubject<T extends PRXInputEvent = PRXInputEvent> =Multiable<Subject<T>>;

export type DefaultAction = "start" | "hold" | "end";
export type PRXInputEvent<
  K extends string = string,
  A extends string = DefaultAction,
> = {
  key: K;
  action: A
  time: number;
};

export type InputEmitter<O extends object = EmptyObject, T extends PRXInputEvent = PRXInputEvent> = (
  s: MultiSubject<T>,
  o?: O
) => { dispose: () => void };

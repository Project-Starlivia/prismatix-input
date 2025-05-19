import type { EmptyObject, Multiable } from "./util";

export interface Subject<T> {
    subscribe(cb: (v: T) => void): Subscription<T>;
    next(v: T): void;
    dispose(): void;
}
export interface Subscription<T> {
  unsubscribe(): void;
}
export type PRXMultiSubject<T extends InputActionGenerics = InputActionGenerics> =Multiable<Subject<PRXInputEvent<T>>>;

export type DefaultAction = "start" | "hold" | "up";
export type InputActionGenerics<K extends string = string, A extends string = DefaultAction, P extends Record<string, string | number | boolean | undefined | never> = Record<string, never>> = {
  K: K;
  A: A;
  P: P;
};
export type PRXInputEvent<
  G extends InputActionGenerics = InputActionGenerics
> = {
  key: G['K'];
  action: G['A'];
  time: number;
} & G['P'];

export type PRXInputEmitter<G extends InputActionGenerics, O extends object = EmptyObject> = (
  s: PRXMultiSubject<G>,
  o?: O
) => { dispose: () => void };

import type { MultiSubject } from "./subject";
import type { EmptyObject } from "./utils";

export type DefaultAction = "start" | "hold" | "move" | "end";
export type PRXInputEvent<
  K extends string = string,
  A extends string = DefaultAction,
> = {
  key: K;
  action: A
  time: number;
};

export interface Disposable {
  dispose: () => void;
}
export interface InputEmitter extends Disposable {}
export interface InputMiddleware extends Disposable {}
export type InputEmitterCreator<
    O extends object = EmptyObject,
    T extends PRXInputEvent<string, string> = PRXInputEvent,
    IE extends InputMiddleware = InputMiddleware,
> = (
  input: MultiSubject<T>,
  options?: O
) => IE;

export type InputMiddlewareCreator<
    Opt extends object = EmptyObject,
    I extends PRXInputEvent<string, string> = PRXInputEvent,
    O extends PRXInputEvent<string, string> = PRXInputEvent,
    IM extends InputMiddleware = InputMiddleware
> = (
  input: MultiSubject<I>,
  output: MultiSubject<O>,
  options?: Opt
) => IM;

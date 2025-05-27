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

export type InputEmitter<
    O extends object = EmptyObject,
    T extends PRXInputEvent<string, string> = PRXInputEvent,
> = (
  input: MultiSubject<T>,
  options?: O
) => { dispose: () => void };

export type InputMiddleware<
    Opt extends object = EmptyObject,
    I extends PRXInputEvent<string, string> = PRXInputEvent,
    O extends PRXInputEvent<string, string> = PRXInputEvent
> = (
  input: MultiSubject<I>,
  output: MultiSubject<O>,
  options?: Opt
) => { dispose: () => void };

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

export type InputEmitter<O extends object = EmptyObject, T extends PRXInputEvent = PRXInputEvent> = (
  s: MultiSubject<T>,
  o?: O
) => { dispose: () => void };

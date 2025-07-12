import type { PRXDisposable, PRXEvent } from "../types";
export interface PRXInput extends PRXDisposable {
}
export interface InputEventPosition extends PRXEvent {
    x: number;
    y: number;
}

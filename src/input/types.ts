import {EmptyObject} from "~/utils";
import type {PRXDisposable, PRXEvent, MultiSubject} from "~/types";

export interface PRXInput extends PRXDisposable {}

export interface InputEventPosition extends PRXEvent {
    x: number;
    y: number;
}
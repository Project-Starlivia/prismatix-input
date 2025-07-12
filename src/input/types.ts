import {EmptyObject} from "~/utils";
import type {Disposable, PRXEvent, MultiSubject} from "~/types";

export interface PRXInput extends Disposable {}

export type PRXInputCreator<
    O extends object = EmptyObject,
    T extends PRXEvent = PRXEvent,
    IE extends PRXInput = PRXInput,
> = (
    input: MultiSubject<T>,
    options?: O
) => IE;

export interface WithPositionInputEvent extends PRXEvent {
    x: number;
    y: number;
}
import { disposeEmitNodes } from "typescript";
import type { InputActionGenerics, PRXMultiSubject, PRXInputEvent } from "../types";
import { multiableToArray } from "../util";

type MouseEventType = "mousedown" | "mouseup";

export type MouseInputOptions = {
    target?: HTMLElement | Document | Window
    buttons?: number[] | undefined
    types?: MouseEventType[] | MouseEventType | undefined,
}


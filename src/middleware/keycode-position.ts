import type { InputMiddlewareCreator } from "../events";
import type { MultiSubject } from "../subject";
import { middlewareBase } from "./index";
import {WithPositionInputEvent} from "../web-native";
import {KeyboardInputEvent} from "../web-native/keyboard";
import {getUsageIdFromKeyCode} from "../keymap/key-mappings";
import {PositionUtils} from "../keymap/position-mappings";

export interface KeycodePositionOptions {
    scaleTarget?: EventTarget | undefined;
}

export const createKeycodePositionMiddleware: InputMiddlewareCreator<
    KeycodePositionOptions,
    KeyboardInputEvent,
    WithPositionInputEvent
> = <T extends KeyboardInputEvent>(
    input: MultiSubject<T>,
    output: MultiSubject<WithPositionInputEvent>,
    options?: KeycodePositionOptions
) => {
    const {scaleTarget} = options || {};

    const processEvent = (event: T): WithPositionInputEvent | null => {
        // Get usage ID from key code
        const usageId = getUsageIdFromKeyCode(event.code);
        if (!usageId) return null;
        const position = PositionUtils.getPosition(usageId);
        if (!position) return null;

        return {
            ...event,
            x: position.x,
            y: position.y,
        }
    };

    return middlewareBase<T, WithPositionInputEvent, KeycodePositionOptions>(
        input,
        output,
        processEvent,
        options || {}
    );
};
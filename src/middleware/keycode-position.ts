import type { MultiSubject } from "~/types";
import { PositionUtils } from "~/key-map/position-mappings";
import { getUsageIdFromKeyCode } from "~/key-map/key-mappings";
import type { KeyboardInputEvent } from "~/input/keyboard";
import type { WithPositionInputEvent } from "~/input";

import { middlewareBase, InputMiddlewareCreator } from ".";

export interface KeycodePositionOptions {
    scaleTarget?: Element | null;
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
    const {scaleTarget} = options || { scaleTarget: document.body };

    const processEvent = (event: T): WithPositionInputEvent | null => {
        // Get usage ID from key code
        const usageId = getUsageIdFromKeyCode(event.code);
        if (!usageId) return null;
        const position = PositionUtils.getPosition(usageId);
        if (!position) return null;
        return {
            ...event,
            x: position.x * (scaleTarget?.clientWidth || 0),
            y: position.y * (scaleTarget?.clientHeight || 0),
        }
    };

    return middlewareBase<T, WithPositionInputEvent, KeycodePositionOptions>(
        input,
        output,
        processEvent,
        options || {}
    );
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { multiableToArray } from "../utils";
import { isEventBySetUndef, NativeInputBase } from "./utils";
var inputTypeAction = {
    'pointerdown': 'start',
    'pointerup': 'end',
    'pointermove': 'move',
    'pointerenter': 'start',
    'pointerleave': 'end',
    'pointerover': 'start',
    'pointerout': 'end',
    'pointercancel': 'end',
};
var PointerInputBase = /** @class */ (function (_super) {
    __extends(PointerInputBase, _super);
    function PointerInputBase(input, mapEvent, options) {
        var _a = options || {}, target = _a.target, events = _a.events, button = _a.button, buttons = _a.buttons, pointerType = _a.pointerType, pointerId = _a.pointerId;
        var _target = target || document;
        var _events = events ?
            multiableToArray(events) :
            ['pointerdown', 'pointerup', 'pointermove', 'pointerenter', 'pointerleave', 'pointerover', 'pointerout', 'pointercancel'];
        var _button = button ? new Set(multiableToArray(button)) : undefined;
        var _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
        var _pointerType = pointerType ? new Set(multiableToArray(pointerType)) : undefined;
        var _pointerId = pointerId ? new Set(multiableToArray(pointerId)) : undefined;
        var isExec = function (e) {
            return isEventBySetUndef(_button, e.button) &&
                isEventBySetUndef(_buttons, e.buttons) &&
                isEventBySetUndef(_pointerType, e.pointerType) &&
                isEventBySetUndef(_pointerId, e.pointerId);
        };
        return _super.call(this, input, _target, _events, inputTypeAction, isExec, mapEvent) || this;
    }
    return PointerInputBase;
}(NativeInputBase));
export { PointerInputBase };
var PointerInput = /** @class */ (function (_super) {
    __extends(PointerInput, _super);
    function PointerInput(input, options) {
        return _super.call(this, input, function (e, action) { return ({
            key: e.pointerType,
            action: action,
            time: e.timeStamp,
        }); }, options) || this;
    }
    return PointerInput;
}(PointerInputBase));
export { PointerInput };
var PointerInputWithPosition = /** @class */ (function (_super) {
    __extends(PointerInputWithPosition, _super);
    function PointerInputWithPosition(input, options) {
        return _super.call(this, input, function (e, action) { return ({
            key: e.pointerType,
            action: action,
            time: e.timeStamp,
            x: e.offsetX,
            y: e.offsetY,
        }); }, options) || this;
    }
    return PointerInputWithPosition;
}(PointerInputBase));
export { PointerInputWithPosition };
var PointerInputFull = /** @class */ (function (_super) {
    __extends(PointerInputFull, _super);
    function PointerInputFull(input, options) {
        return _super.call(this, input, function (e, action) { return (__assign({ key: e.pointerType, action: action, time: e.timeStamp }, e)); }, options) || this;
    }
    return PointerInputFull;
}(PointerInputBase));
export { PointerInputFull };

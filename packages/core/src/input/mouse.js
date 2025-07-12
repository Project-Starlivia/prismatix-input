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
    "mousedown": "start",
    "mouseup": "end",
    "mousemove": "move",
    "click": "start",
    "dblclick": "start",
    "contextmenu": "start",
    "mouseenter": "start",
    "mouseleave": "end",
    "mouseover": "start",
    "mouseout": "end",
};
var MouseInputBase = /** @class */ (function (_super) {
    __extends(MouseInputBase, _super);
    function MouseInputBase(input, mapEvent, options) {
        var _a = options || {}, target = _a.target, events = _a.events, filters = _a.filters;
        var _b = filters || {}, button = _b.button, buttons = _b.buttons;
        var _target = target || document;
        var _events = events ?
            multiableToArray(events) :
            ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove"];
        var _button = button ? new Set(multiableToArray(button)) : undefined;
        var _buttons = buttons ? new Set(multiableToArray(buttons)) : undefined;
        var isExec = function (e) { return isEventBySetUndef(_button, e.button) && isEventBySetUndef(_buttons, e.buttons); };
        return _super.call(this, input, _target, _events, inputTypeAction, isExec, mapEvent) || this;
    }
    return MouseInputBase;
}(NativeInputBase));
export { MouseInputBase };
var MouseInput = /** @class */ (function (_super) {
    __extends(MouseInput, _super);
    function MouseInput(input, options) {
        return _super.call(this, input, function (e, action) { return ({
            key: e.button.toString(),
            action: action,
            time: e.timeStamp,
        }); }, options) || this;
    }
    return MouseInput;
}(MouseInputBase));
export { MouseInput };
var MouseInputButtons = /** @class */ (function (_super) {
    __extends(MouseInputButtons, _super);
    function MouseInputButtons(input, options) {
        return _super.call(this, input, function (e, action) { return ({
            key: e.button.toString(),
            action: action,
            time: e.timeStamp,
            buttons: e.buttons
        }); }, options) || this;
    }
    return MouseInputButtons;
}(MouseInputBase));
export { MouseInputButtons };
var MouseInputPosition = /** @class */ (function (_super) {
    __extends(MouseInputPosition, _super);
    function MouseInputPosition(input, options) {
        return _super.call(this, input, function (e, action) { return ({
            key: e.button.toString(),
            action: action,
            time: e.timeStamp,
            x: e.x,
            y: e.y
        }); }, options) || this;
    }
    return MouseInputPosition;
}(MouseInputBase));
export { MouseInputPosition };
var MouseInputFull = /** @class */ (function (_super) {
    __extends(MouseInputFull, _super);
    function MouseInputFull(input, options) {
        return _super.call(this, input, function (e, action) { return (__assign({ key: e.button.toString(), time: e.timeStamp, action: action }, e)); }, options) || this;
    }
    return MouseInputFull;
}(MouseInputBase));
export { MouseInputFull };

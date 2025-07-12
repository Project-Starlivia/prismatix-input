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
import { UtilKeyCodeToUsageIdMap } from "../key-map/code-usage";
import { UtilUsageIdToPositionMap } from "../key-map/usage-position";
import { multiableToArray } from "../utils";
import { isEventBySetUndef } from "./utils";
var KeyboardInputBase = /** @class */ (function () {
    function KeyboardInputBase(input, mapEvent, options) {
        var _this = this;
        this.keyFilter = function (key) { return isEventBySetUndef(_this.keySet, key); };
        this.codeFilter = function (code) { return isEventBySetUndef(_this.codeSet, code); };
        this.hasEvent = function (name) { return _this.eventSet.has(name); };
        this.onKeyboardEvent = function (e, action) {
            var event = _this.mapEvent(e, action);
            for (var _i = 0, _a = _this.subjects; _i < _a.length; _i++) {
                var stream = _a[_i];
                stream.next(event);
            }
        };
        this.onKeydownEvent = function (e) {
            var keyboardEvent = e;
            if (!_this.keyFilter(keyboardEvent.key))
                return;
            if (!_this.codeFilter(keyboardEvent.code))
                return;
            var repeat = keyboardEvent.repeat;
            if (_this.hasEvent("keydown"))
                _this.onKeyboardEvent(keyboardEvent, 'hold');
            if (repeat ? _this.hasEvent("keydown-repeat") : _this.hasEvent("keydown-norepeat")) {
                _this.onKeyboardEvent(keyboardEvent, repeat ? 'hold' : 'start');
            }
        };
        this.onKeyupEvent = function (e) {
            var keyboardEvent = e;
            if (!_this.keyFilter(keyboardEvent.key))
                return;
            if (!_this.codeFilter(keyboardEvent.code))
                return;
            _this.onKeyboardEvent(keyboardEvent, 'end');
        };
        this.subjects = multiableToArray(input);
        var _a = options || {}, target = _a.target, code = _a.code, key = _a.key, events = _a.events;
        this.eventTarget = target || document;
        this.keySet = key ? new Set(multiableToArray(key)) : undefined;
        this.codeSet = code ? new Set(multiableToArray(code)) : undefined;
        this.eventSet = new Set(events
            ? Array.isArray(events) ? events : [events]
            : ["keydown", "keydown-norepeat", "keydown-repeat", "keyup"]);
        this.hasKeydown =
            this.eventSet.has("keydown") ||
                this.eventSet.has("keydown-norepeat") ||
                this.eventSet.has("keydown-repeat");
        this.mapEvent = mapEvent;
        this.init();
    }
    KeyboardInputBase.prototype.init = function () {
        if (this.hasKeydown) {
            this.eventTarget.addEventListener("keydown", this.onKeydownEvent);
        }
        if (this.eventSet.has("keyup")) {
            this.eventTarget.addEventListener("keyup", this.onKeyupEvent);
        }
    };
    KeyboardInputBase.prototype.dispose = function () {
        if (this.hasKeydown) {
            this.eventTarget.removeEventListener("keydown", this.onKeydownEvent);
        }
        if (this.eventSet.has("keyup")) {
            this.eventTarget.removeEventListener("keyup", this.onKeyupEvent);
        }
    };
    return KeyboardInputBase;
}());
export { KeyboardInputBase };
var KeyboardInput = /** @class */ (function (_super) {
    __extends(KeyboardInput, _super);
    function KeyboardInput(input, options) {
        return _super.call(this, input, function (e, action) { return ({
            key: e.key,
            action: action,
            time: e.timeStamp,
            code: e.code,
        }); }, options) || this;
    }
    return KeyboardInput;
}(KeyboardInputBase));
export { KeyboardInput };
var KeyboardInputCode = /** @class */ (function (_super) {
    __extends(KeyboardInputCode, _super);
    function KeyboardInputCode(input, options) {
        return _super.call(this, input, function (e, action) { return ({
            key: e.code,
            action: action,
            time: e.timeStamp,
        }); }, options) || this;
    }
    return KeyboardInputCode;
}(KeyboardInputBase));
export { KeyboardInputCode };
var KeyboardInputFull = /** @class */ (function (_super) {
    __extends(KeyboardInputFull, _super);
    function KeyboardInputFull(input, options) {
        return _super.call(this, input, function (e, action) { return (__assign({ action: action, time: e.timeStamp }, e)); }, options) || this;
    }
    return KeyboardInputFull;
}(KeyboardInputBase));
export { KeyboardInputFull };
var KeyboardInputWithKeyMap = /** @class */ (function (_super) {
    __extends(KeyboardInputWithKeyMap, _super);
    function KeyboardInputWithKeyMap(input, options) {
        var _a;
        var _this = _super.call(this, input, function (e, action) {
            var _a, _b;
            // Get usage ID from key code using the provided keyCodeMap
            var usageId = _this.keyCodeMap[e.code];
            // Get position from usage ID using the provided positionMap
            var position = _this.positionMap[usageId];
            // Default position if not found in key map
            var x = (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : _this.defaultPosition;
            var y = (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : _this.defaultPosition;
            return {
                key: e.key,
                action: action,
                time: e.timeStamp,
                x: x,
                y: y,
            };
        }, options) || this;
        // Use constructor parameters first, then fall back to options, then defaults
        _this.keyCodeMap = (options === null || options === void 0 ? void 0 : options.keyCodeMap) || UtilKeyCodeToUsageIdMap;
        _this.positionMap = (options === null || options === void 0 ? void 0 : options.positionMap) || UtilUsageIdToPositionMap;
        _this.defaultPosition = (_a = options === null || options === void 0 ? void 0 : options.defaultPosition) !== null && _a !== void 0 ? _a : NaN;
        return _this;
    }
    return KeyboardInputWithKeyMap;
}(KeyboardInputBase));
export { KeyboardInputWithKeyMap };

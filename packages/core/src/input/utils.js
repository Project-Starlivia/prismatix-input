import { multiableToArray } from "../utils";
export var isEventBySetUndef = function (set, value) {
    if (!set)
        return true;
    return set.has(value);
};
var NativeInputBase = /** @class */ (function () {
    function NativeInputBase(input, target, events, actionMap, isEvent, mapEvent) {
        var _this = this;
        this.subjects = multiableToArray(input);
        this.listeners = events.map(function (type) {
            var handler = function (e) {
                var action = actionMap[type];
                if (!action)
                    throw new Error("No action for event type: ".concat(type));
                if (!isEvent(e))
                    return;
                var event = mapEvent(e, action);
                for (var _i = 0, _a = _this.subjects; _i < _a.length; _i++) {
                    var stream = _a[_i];
                    stream.next(event);
                }
            };
            var fn = function (e) { return handler(e); };
            target.addEventListener(type, fn);
            return function () { return target.removeEventListener(type, fn); };
        });
    }
    NativeInputBase.prototype.dispose = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var remove = _a[_i];
            remove();
        }
    };
    return NativeInputBase;
}());
export { NativeInputBase };

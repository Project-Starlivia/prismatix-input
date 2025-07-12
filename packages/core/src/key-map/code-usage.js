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
/**
 * Special/Error keys mapping
 */
export var SpecialKeysMap = {
    "Unidentified": "07_03",
};
/**
 * Letters mapping
 */
export var LettersMap = {
    "KeyA": "07_04",
    "KeyB": "07_05",
    "KeyC": "07_06",
    "KeyD": "07_07",
    "KeyE": "07_08",
    "KeyF": "07_09",
    "KeyG": "07_0A",
    "KeyH": "07_0B",
    "KeyI": "07_0C",
    "KeyJ": "07_0D",
    "KeyK": "07_0E",
    "KeyL": "07_0F",
    "KeyM": "07_10",
    "KeyN": "07_11",
    "KeyO": "07_12",
    "KeyP": "07_13",
    "KeyQ": "07_14",
    "KeyR": "07_15",
    "KeyS": "07_16",
    "KeyT": "07_17",
    "KeyU": "07_18",
    "KeyV": "07_19",
    "KeyW": "07_1A",
    "KeyX": "07_1B",
    "KeyY": "07_1C",
    "KeyZ": "07_1D",
};
/**
 * Numbers mapping
 */
export var DigitsMap = {
    "Digit1": "07_1E",
    "Digit2": "07_1F",
    "Digit3": "07_20",
    "Digit4": "07_21",
    "Digit5": "07_22",
    "Digit6": "07_23",
    "Digit7": "07_24",
    "Digit8": "07_25",
    "Digit9": "07_26",
    "Digit0": "07_27",
};
/**
 * Special control keys mapping
 */
export var SpecialControlKeysMap = {
    "Enter": "07_28",
    "Escape": "07_29",
    "Backspace": "07_2A",
    "Tab": "07_2B",
    "Space": "07_2C",
    "CapsLock": "07_39",
};
/**
 * Punctuation and special characters mapping
 */
export var PunctuationMap = {
    "Minus": "07_2D",
    "Equal": "07_2E",
    "BracketLeft": "07_2F",
    "BracketRight": "07_30",
    "Backslash": "07_31",
    "Semicolon": "07_33",
    "Quote": "07_34",
    "Backquote": "07_35",
    "Comma": "07_36",
    "Period": "07_37",
    "Slash": "07_38",
};
/**
 * Function keys mapping
 */
export var FunctionKeysMap = {
    "F1": "07_3A",
    "F2": "07_3B",
    "F3": "07_3C",
    "F4": "07_3D",
    "F5": "07_3E",
    "F6": "07_3F",
    "F7": "07_40",
    "F8": "07_41",
    "F9": "07_42",
    "F10": "07_43",
    "F11": "07_44",
    "F12": "07_45",
    "F13": "07_68",
};
/**
 * Navigation keys mapping
 */
export var NavigationKeysMap = {
    "PrintScreen": "07_46",
    "ScrollLock": "07_47",
    "Pause": "07_48",
    "Insert": "07_49",
    "Home": "07_4A",
    "PageUp": "07_4B",
    "Delete": "07_4C",
    "End": "07_4D",
    "PageDown": "07_4E",
};
/**
 * Arrow keys mapping
 */
export var ArrowKeysMap = {
    "ArrowRight": "07_4F",
    "ArrowLeft": "07_50",
    "ArrowDown": "07_51",
    "ArrowUp": "07_52",
};
/**
 * Numpad keys mapping
 */
export var NumpadKeysMap = {
    "NumpadMultiply": "07_53",
    "NumpadDivide": "07_54",
    "NumpadDecimal": "07_55",
    "NumpadSubtract": "07_56",
    "NumpadAdd": "07_57",
    "NumpadEnter": "07_58",
    "Numpad1": "07_59",
    "Numpad2": "07_5A",
    "Numpad3": "07_5B",
    "Numpad4": "07_5C",
    "Numpad5": "07_5D",
    "Numpad6": "07_5E",
    "Numpad7": "07_5F",
    "Numpad8": "07_60",
    "Numpad9": "07_61",
    "Numpad0": "07_62",
    "NumpadEqual": "07_67",
};
/**
 * Modifier keys mapping
 */
export var ModifierKeysMap = {
    "ControlLeft": "07_E0",
    "ShiftLeft": "07_E1",
    "AltLeft": "07_E2",
    "MetaLeft": "07_E3",
    "ControlRight": "07_E4",
    "ShiftRight": "07_E5",
    "AltRight": "07_E6",
    "MetaRight": "07_E7",
};
/**
 * International and special keys mapping
 */
export var InternationalKeysMap = {
    "IntlRo": "07_87",
    "KanaMode": "07_88",
    "IntlBackslash": "07_89",
    "Convert": "07_8A",
    "NonConvert": "07_8B",
    "Lang1": "07_90",
    "Lang2": "07_91",
};
/**
 * Maps JavaScript KeyboardEvent.code values to HID Usage IDs
 * This is the primary mapping used for keyboard input processing
 */
export var UtilKeyCodeToUsageIdMap = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, SpecialKeysMap), LettersMap), DigitsMap), SpecialControlKeysMap), PunctuationMap), FunctionKeysMap), NavigationKeysMap), ArrowKeysMap), NumpadKeysMap), ModifierKeysMap), InternationalKeysMap);

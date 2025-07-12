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
 * Function keys row positions (F1-F12, Escape)
 */
export var FunctionRowPositions = {
    "07_29": { x: 0.033, y: 0.083 }, // Escape
    "07_3A": { x: 0.166, y: 0.083 }, // F1
    "07_3B": { x: 0.233, y: 0.083 }, // F2
    "07_3C": { x: 0.3, y: 0.083 }, // F3
    "07_3D": { x: 0.366, y: 0.083 }, // F4
    "07_3E": { x: 0.433, y: 0.083 }, // F5
    "07_3F": { x: 0.5, y: 0.083 }, // F6
    "07_40": { x: 0.566, y: 0.083 }, // F7
    "07_41": { x: 0.633, y: 0.083 }, // F8
    "07_42": { x: 0.7, y: 0.083 }, // F9
    "07_43": { x: 0.766, y: 0.083 }, // F10
    "07_44": { x: 0.833, y: 0.083 }, // F11
    "07_45": { x: 0.9, y: 0.083 }, // F12
};
/**
 * Number row positions (1-0, special characters)
 */
export var NumberRowPositions = {
    "07_35": { x: 0.033, y: 0.25 }, // Backquote
    "07_1E": { x: 0.100, y: 0.25 }, // Digit1
    "07_1F": { x: 0.166, y: 0.25 }, // Digit2
    "07_20": { x: 0.233, y: 0.25 }, // Digit3
    "07_21": { x: 0.3, y: 0.25 }, // Digit4
    "07_22": { x: 0.366, y: 0.25 }, // Digit5
    "07_23": { x: 0.433, y: 0.25 }, // Digit6
    "07_24": { x: 0.5, y: 0.25 }, // Digit7
    "07_25": { x: 0.566, y: 0.25 }, // Digit8
    "07_26": { x: 0.633, y: 0.25 }, // Digit9
    "07_27": { x: 0.7, y: 0.25 }, // Digit0
    "07_2D": { x: 0.766, y: 0.25 }, // Minus
    "07_2E": { x: 0.833, y: 0.25 }, // Equal
    "07_89": { x: 0.9, y: 0.25 }, // IntlBackslash
    "07_2A": { x: 0.966, y: 0.25 }, // Backspace
};
/**
 * QWERTY row positions (Tab, Q-P, brackets, backslash)
 */
export var QwertyRowPositions = {
    "07_2B": { x: 0.049, y: 0.416 }, // Tab
    "07_14": { x: 0.133, y: 0.416 }, // KeyQ
    "07_1A": { x: 0.200, y: 0.416 }, // KeyW
    "07_08": { x: 0.266, y: 0.416 }, // KeyE
    "07_15": { x: 0.333, y: 0.416 }, // KeyR
    "07_17": { x: 0.400, y: 0.416 }, // KeyT
    "07_1C": { x: 0.466, y: 0.416 }, // KeyY
    "07_18": { x: 0.533, y: 0.416 }, // KeyU
    "07_0C": { x: 0.600, y: 0.416 }, // KeyI
    "07_12": { x: 0.666, y: 0.416 }, // KeyO
    "07_13": { x: 0.733, y: 0.416 }, // KeyP
    "07_2F": { x: 0.800, y: 0.416 }, // BracketLeft
    "07_30": { x: 0.866, y: 0.416 }, // BracketRight
    "07_31": { x: 0.951, y: 0.416 }, // Backslash
};
/**
 * ASDF row positions (CapsLock, A-L, semicolon, quote, Enter)
 */
export var AsdfRowPositions = {
    "07_39": { x: 0.065, y: 0.583 }, // CapsLock
    "07_04": { x: 0.149, y: 0.583 }, // KeyA
    "07_16": { x: 0.215, y: 0.583 }, // KeyS
    "07_07": { x: 0.281, y: 0.583 }, // KeyD
    "07_09": { x: 0.347, y: 0.583 }, // KeyF
    "07_0A": { x: 0.413, y: 0.583 }, // KeyG
    "07_0B": { x: 0.479, y: 0.583 }, // KeyH
    "07_0D": { x: 0.545, y: 0.583 }, // KeyJ
    "07_0E": { x: 0.611, y: 0.583 }, // KeyK
    "07_0F": { x: 0.677, y: 0.583 }, // KeyL
    "07_33": { x: 0.743, y: 0.583 }, // Semicolon
    "07_34": { x: 0.809, y: 0.583 }, // Quote
    "07_32": { x: 0.875, y: 0.583 }, // NonUSHash
    "07_28": { x: 0.954, y: 0.583 }, // Enter
};
/**
 * ZXCV row positions (Shift, Z-M, comma, period, slash, Shift)
 */
export var ZxcvRowPositions = {
    "07_E1": { x: 0.041, y: 0.75 }, // ShiftLeft
    "07_64": { x: 0.107, y: 0.75 }, // NonUSBackslash
    "07_1D": { x: 0.173, y: 0.75 }, // KeyZ
    "07_1B": { x: 0.239, y: 0.75 }, // KeyX
    "07_06": { x: 0.305, y: 0.75 }, // KeyC
    "07_19": { x: 0.371, y: 0.75 }, // KeyV
    "07_05": { x: 0.437, y: 0.75 }, // KeyB
    "07_11": { x: 0.503, y: 0.75 }, // KeyN
    "07_10": { x: 0.569, y: 0.75 }, // KeyM
    "07_36": { x: 0.635, y: 0.75 }, // Comma
    "07_37": { x: 0.701, y: 0.75 }, // Period
    "07_38": { x: 0.767, y: 0.75 }, // Slash
    "07_87": { x: 0.833, y: 0.75 }, // IntlRo
    "07_E5": { x: 0.916, y: 0.75 }, // ShiftRight
};
/**
 * Bottom row positions (Ctrl, Alt, Space, etc.)
 */
export var BottomRowPositions = {
    "07_E0": { x: 0.033, y: 0.916 }, // ControlLeft
    "07_E2": { x: 0.100, y: 0.916 }, // AltLeft
    "07_8B": { x: 0.174, y: 0.916 }, // NonConvert
    "07_2C": { x: 0.395, y: 0.916 }, // Space
    "07_8A": { x: 0.616, y: 0.916 }, // Convert
    "07_88": { x: 0.691, y: 0.916 }, // KanaMode
    "07_E6": { x: 0.766, y: 0.916 }, // AltRight
    "07_E7": { x: 0.833, y: 0.916 }, // MetaRight
    "07_65": { x: 0.9, y: 0.916 }, // Application
    "07_E4": { x: 0.966, y: 0.916 }, // ControlRight
};
/**
 * Standard QWERTY keyboard layout positions
 * Coordinates are normalized (0.0 to 1.0) for responsive layouts
 */
export var UtilUsageIdToPositionMap = __assign(__assign(__assign(__assign(__assign(__assign({}, FunctionRowPositions), NumberRowPositions), QwertyRowPositions), AsdfRowPositions), ZxcvRowPositions), BottomRowPositions);

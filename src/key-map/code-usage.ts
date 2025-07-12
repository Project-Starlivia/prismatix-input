// Key Code to Usage ID Mappings - Extracted from keycode.ts for better maintainability
import type { KeyCodeMap, UsageID } from './types';

/**
 * Special/Error keys mapping
 */
export const SpecialKeysMap: KeyCodeMap = {
  "Unidentified": "07_03",
} as const;

/**
 * Letters mapping
 */
export const LettersMap: KeyCodeMap = {
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
} as const;

/**
 * Numbers mapping
 */
export const DigitsMap: KeyCodeMap = {
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
} as const;

/**
 * Special control keys mapping
 */
export const SpecialControlKeysMap: KeyCodeMap = {
  "Enter": "07_28",
  "Escape": "07_29",
  "Backspace": "07_2A",
  "Tab": "07_2B",
  "Space": "07_2C",
  "CapsLock": "07_39",
} as const;

/**
 * Punctuation and special characters mapping
 */
export const PunctuationMap: KeyCodeMap = {
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
} as const;

/**
 * Function keys mapping
 */
export  const FunctionKeysMap: KeyCodeMap = {
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
} as const;

/**
 * Navigation keys mapping
 */
export const NavigationKeysMap: KeyCodeMap = {
  "PrintScreen": "07_46",
  "ScrollLock": "07_47",
  "Pause": "07_48",
  "Insert": "07_49",
  "Home": "07_4A",
  "PageUp": "07_4B",
  "Delete": "07_4C",
  "End": "07_4D",
  "PageDown": "07_4E",
} as const;

/**
 * Arrow keys mapping
 */
export const ArrowKeysMap: KeyCodeMap = {
  "ArrowRight": "07_4F",
  "ArrowLeft": "07_50",
  "ArrowDown": "07_51",
  "ArrowUp": "07_52",
} as const;

/**
 * Numpad keys mapping
 */
export const NumpadKeysMap: KeyCodeMap = {
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
} as const;

/**
 * Modifier keys mapping
 */
export const ModifierKeysMap: KeyCodeMap = {
  "ControlLeft": "07_E0",
  "ShiftLeft": "07_E1",
  "AltLeft": "07_E2",
  "MetaLeft": "07_E3",
  "ControlRight": "07_E4",
  "ShiftRight": "07_E5",
  "AltRight": "07_E6",
  "MetaRight": "07_E7",
} as const;

/**
 * International and special keys mapping
 */
export const InternationalKeysMap: KeyCodeMap = {
  "IntlRo": "07_87",
  "KanaMode": "07_88",
  "IntlBackslash": "07_89",
  "Convert": "07_8A",
  "NonConvert": "07_8B",
  "Lang1": "07_90",
  "Lang2": "07_91",
} as const;

/**
 * Maps JavaScript KeyboardEvent.code values to HID Usage IDs
 * This is the primary mapping used for keyboard input processing
 */
export const UtilKeyCodeToUsageIdMap: KeyCodeMap = {
  ...SpecialKeysMap,
  ...LettersMap,
  ...DigitsMap,
  ...SpecialControlKeysMap,
  ...PunctuationMap,
  ...FunctionKeysMap,
  ...NavigationKeysMap,
  ...ArrowKeysMap,
  ...NumpadKeysMap,
  ...ModifierKeysMap,
  ...InternationalKeysMap,
} as const;

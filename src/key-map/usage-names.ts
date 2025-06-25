// HID Usage Names - Extracted from keycode.ts for better maintainability
import type { UsageID, UsageNameMap } from './types';

/**
 * Keyboard/Keypad Page (0x07) Usage Names
 * Most commonly used for keyboard input
 */
export const KeyboardUsageNames: Partial<UsageNameMap> = {
  // Special keys (0x00-0x03)
  "07_00": "No event indicated",
  "07_01": "ErrorRollOver",
  "07_02": "POSTFail", 
  "07_03": "ErrorUndefined",

  // Letters (0x04-0x1D)
  "07_04": "a and A",
  "07_05": "b and B",
  "07_06": "c and C",
  "07_07": "d and D",
  "07_08": "e and E",
  "07_09": "f and F",
  "07_0A": "g and G",
  "07_0B": "h and H",
  "07_0C": "i and I",
  "07_0D": "j and J",
  "07_0E": "k and K",
  "07_0F": "l and L",
  "07_10": "m and M",
  "07_11": "n and N",
  "07_12": "o and O",
  "07_13": "p and P",
  "07_14": "q and Q",
  "07_15": "r and R",
  "07_16": "s and S",
  "07_17": "t and T",
  "07_18": "u and U",
  "07_19": "v and V",
  "07_1A": "w and W",
  "07_1B": "x and X",
  "07_1C": "y and Y",
  "07_1D": "z and Z",

  // Numbers (0x1E-0x27)
  "07_1E": "1 and !",
  "07_1F": "2 and @",
  "07_20": "3 and #",
  "07_21": "4 and $",
  "07_22": "5 and %",
  "07_23": "6 and ^",
  "07_24": "7 and &",
  "07_25": "8 and *",
  "07_26": "9 and (",
  "07_27": "0 and )",

  // Special characters and keys
  "07_28": "Return (ENTER)",
  "07_29": "ESCAPE",
  "07_2A": "DELETE (Backspace)",
  "07_2B": "Tab",
  "07_2C": "Spacebar",
  "07_2D": "- and (underscore)",
  "07_2E": "= and +",
  "07_2F": "[ and {",
  "07_30": "] and }",
  "07_31": "\\ and |",
  "07_32": "Non-US # and ~",
  "07_33": "; and :",
  "07_34": "' and \"",
  "07_35": "` and ~",
  "07_36": ", and <",
  "07_37": ". and >",
  "07_38": "/ and ?",
  "07_39": "Caps Lock",

  // Function keys (0x3A-0x45)
  "07_3A": "F1",
  "07_3B": "F2",
  "07_3C": "F3",
  "07_3D": "F4",
  "07_3E": "F5",
  "07_3F": "F6",
  "07_40": "F7",
  "07_41": "F8",
  "07_42": "F9",
  "07_43": "F10",
  "07_44": "F11",
  "07_45": "F12",

  // Navigation and special keys
  "07_46": "PrintScreen",
  "07_47": "Scroll Lock",
  "07_48": "Pause",
  "07_49": "Insert",
  "07_4A": "Home",
  "07_4B": "PageUp",
  "07_4C": "Delete Forward",
  "07_4D": "End",
  "07_4E": "PageDown",
  "07_4F": "RightArrow",
  "07_50": "LeftArrow",
  "07_51": "DownArrow",
  "07_52": "UpArrow",

  // Keypad (0x53-0x63)
  "07_53": "Keypad Num Lock and Clear",
  "07_54": "Keypad /",
  "07_55": "Keypad *",
  "07_56": "Keypad -",
  "07_57": "Keypad +",
  "07_58": "Keypad ENTER",
  "07_59": "Keypad 1 and End",
  "07_5A": "Keypad 2 and Down Arrow",
  "07_5B": "Keypad 3 and PageDn",
  "07_5C": "Keypad 4 and Left Arrow",
  "07_5D": "Keypad 5",
  "07_5E": "Keypad 6 and Right Arrow",
  "07_5F": "Keypad 7 and Home",
  "07_60": "Keypad 8 and Up Arrow",
  "07_61": "Keypad 9 and PageUp",
  "07_62": "Keypad 0 and Insert",
  "07_63": "Keypad . and Delete",

  // Additional keys
  "07_64": "Non-US \\ and |",
  "07_65": "Application",
  "07_66": "Power",
  "07_67": "Keypad =",
  "07_68": "F13",
  "07_69": "F14",
  "07_6A": "F15",
  "07_6B": "F16",
  "07_6C": "F17",
  "07_6D": "F18",
  "07_6E": "F19",
  "07_6F": "F20",
  "07_70": "F21",
  "07_71": "F22",
  "07_72": "F23",
  "07_73": "F24",

  // Modifier keys (0xE0-0xE7)
  "07_E0": "LeftControl",
  "07_E1": "LeftShift",
  "07_E2": "LeftAlt",
  "07_E3": "Left GUI",
  "07_E4": "RightControl",
  "07_E5": "RightShift",
  "07_E6": "RightAlt",
  "07_E7": "Right GUI",

  // International keys
  "07_87": "International1",
  "07_88": "International2",
  "07_89": "International3",
  "07_8A": "International4",
  "07_8B": "International5",
  "07_8C": "International6",
  "07_8D": "International7",
  "07_8E": "International8",
  "07_8F": "International9"
} as const;

/**
 * Generic Desktop Page (0x01) Usage Names
 */
export const GenericDesktopUsageNames: Partial<UsageNameMap> = {
  "01_00": "Undefined",
  "01_01": "Pointer",
  "01_02": "Mouse",
  "01_03": "Reserved",
  "01_04": "Joystick",
  "01_05": "Game Pad",
  "01_06": "Keyboard",
  "01_07": "Keypad",
  "01_08": "Multi-axis Controller",
  "01_09": "Tablet PC System Controls",
  "01_0A": "Water Cooling Device",
  "01_0B": "Computer Chassis Device",
  "01_0C": "Wireless Radio Controls",
  "01_0D": "Portable Device Control",
  "01_0E": "System Multi-Axis Controller",
  "01_0F": "Spatial Controller",
  "01_10": "Assistive Control",
  "01_11": "Device Dock",
  "01_12": "Dockable Device",
  "01_13": "Call State Management Control",
  "01_30": "X",
  "01_31": "Y",
  "01_32": "Z",
  "01_33": "Rx",
  "01_34": "Ry",
  "01_35": "Rz",
  "01_36": "Slider",
  "01_37": "Dial",
  "01_38": "Wheel",
  "01_39": "Hat switch",
  "01_3A": "Counted Buffer",
  "01_3B": "Byte Count",
  "01_3C": "Motion Wakeup",
  "01_3D": "Start",
  "01_3E": "Select",
  "01_40": "Vx",
  "01_41": "Vy",
  "01_42": "Vz",
  "01_43": "Vbrx",
  "01_44": "Vbry",
  "01_45": "Vbrz",
  "01_46": "Vno",
  "01_47": "Feature Notification",
  "01_48": "Resolution Multiplier",
  "01_49": "Qx",
  "01_4A": "Qy",
  "01_4B": "Qz",
  "01_4C": "Qw"
} as const;

/**
 * Combined usage names map for all supported pages
 * This replaces the massive UsageName record from keycode.ts
 */
export const UsageName: UsageNameMap = {
  ...GenericDesktopUsageNames,
  ...KeyboardUsageNames,
  // Add other pages as needed
} as UsageNameMap;

/**
 * Optimized lookup function with caching
 */
const usageNameCache = new Map<UsageID, string>();

export function getUsageName(usageId: UsageID): string {
  if (usageNameCache.has(usageId)) {
    return usageNameCache.get(usageId)!;
  }
  
  const name = UsageName[usageId] || usageId;
  usageNameCache.set(usageId, name);
  return name;
}

/**
 * Get usage names for a specific page
 */
export function getPageUsageNames(pagePrefix: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [usageId, name] of Object.entries(UsageName)) {
    if (usageId.startsWith(pagePrefix)) {
      result[usageId] = name;
    }
  }
  return result;
}
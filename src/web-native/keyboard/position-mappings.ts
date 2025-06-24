// Keyboard Position Mappings - Extracted from keycode.ts for better maintainability
import type { UsageID, KeyPosition, PositionMap } from './types';

/**
 * Standard QWERTY keyboard layout positions
 * Coordinates are normalized (0.0 to 1.0) for responsive layouts
 */
export const KeyboardUsageIdMap: PositionMap = {
  // Special keys (0x00-0x03)
  "07_00": { x: 0.05, y: 0.05 },  // No event indicated
  "07_01": { x: 0.10, y: 0.05 },  // ErrorRollOver
  "07_02": { x: 0.15, y: 0.05 },  // POSTFail
  "07_03": { x: 0.20, y: 0.05 },  // ErrorUndefined

  // Letters - QWERTY layout
  // Top row (QWERTYUIOP)
  "07_14": { x: 0.15, y: 0.20 },  // q and Q
  "07_1A": { x: 0.20, y: 0.20 },  // w and W
  "07_08": { x: 0.25, y: 0.20 },  // e and E
  "07_15": { x: 0.30, y: 0.20 },  // r and R
  "07_17": { x: 0.35, y: 0.20 },  // t and T
  "07_1C": { x: 0.40, y: 0.20 },  // y and Y
  "07_18": { x: 0.45, y: 0.20 },  // u and U
  "07_0C": { x: 0.50, y: 0.20 },  // i and I
  "07_12": { x: 0.55, y: 0.20 },  // o and O
  "07_13": { x: 0.60, y: 0.20 },  // p and P

  // Middle row (ASDFGHJKL)
  "07_04": { x: 0.15, y: 0.30 },  // a and A
  "07_16": { x: 0.20, y: 0.30 },  // s and S
  "07_07": { x: 0.25, y: 0.30 },  // d and D
  "07_09": { x: 0.30, y: 0.30 },  // f and F
  "07_0A": { x: 0.35, y: 0.30 },  // g and G
  "07_0B": { x: 0.40, y: 0.30 },  // h and H
  "07_0D": { x: 0.45, y: 0.30 },  // j and J
  "07_0E": { x: 0.50, y: 0.30 },  // k and K
  "07_0F": { x: 0.55, y: 0.30 },  // l and L

  // Bottom row (ZXCVBNM)
  "07_1D": { x: 0.20, y: 0.40 },  // z and Z
  "07_1B": { x: 0.25, y: 0.40 },  // x and X
  "07_06": { x: 0.30, y: 0.40 },  // c and C
  "07_19": { x: 0.35, y: 0.40 },  // v and V
  "07_05": { x: 0.40, y: 0.40 },  // b and B
  "07_11": { x: 0.45, y: 0.40 },  // n and N
  "07_10": { x: 0.50, y: 0.40 },  // m and M

  // Number row (1234567890)
  "07_1E": { x: 0.15, y: 0.10 },  // 1 and !
  "07_1F": { x: 0.20, y: 0.10 },  // 2 and @
  "07_20": { x: 0.25, y: 0.10 },  // 3 and #
  "07_21": { x: 0.30, y: 0.10 },  // 4 and $
  "07_22": { x: 0.35, y: 0.10 },  // 5 and %
  "07_23": { x: 0.40, y: 0.10 },  // 6 and ^
  "07_24": { x: 0.45, y: 0.10 },  // 7 and &
  "07_25": { x: 0.50, y: 0.10 },  // 8 and *
  "07_26": { x: 0.55, y: 0.10 },  // 9 and (
  "07_27": { x: 0.60, y: 0.10 },  // 0 and )

  // Special characters
  "07_2D": { x: 0.65, y: 0.10 },  // - and _
  "07_2E": { x: 0.70, y: 0.10 },  // = and +
  "07_2F": { x: 0.65, y: 0.20 },  // [ and {
  "07_30": { x: 0.70, y: 0.20 },  // ] and }
  "07_31": { x: 0.75, y: 0.20 },  // \ and |
  "07_33": { x: 0.60, y: 0.30 },  // ; and :
  "07_34": { x: 0.65, y: 0.30 },  // ' and "
  "07_35": { x: 0.10, y: 0.10 },  // ` and ~
  "07_36": { x: 0.55, y: 0.40 },  // , and <
  "07_37": { x: 0.60, y: 0.40 },  // . and >
  "07_38": { x: 0.65, y: 0.40 },  // / and ?

  // Control keys
  "07_28": { x: 0.70, y: 0.30, width: 0.15 },  // Enter
  "07_29": { x: 0.05, y: 0.10 },  // Escape
  "07_2A": { x: 0.75, y: 0.10, width: 0.15 },  // Backspace
  "07_2B": { x: 0.10, y: 0.20, width: 0.10 },  // Tab
  "07_2C": { x: 0.25, y: 0.50, width: 0.30 },  // Space
  "07_39": { x: 0.10, y: 0.30, width: 0.10 },  // Caps Lock

  // Function keys (top row)
  "07_3A": { x: 0.15, y: 0.05 },  // F1
  "07_3B": { x: 0.20, y: 0.05 },  // F2
  "07_3C": { x: 0.25, y: 0.05 },  // F3
  "07_3D": { x: 0.30, y: 0.05 },  // F4
  "07_3E": { x: 0.35, y: 0.05 },  // F5
  "07_3F": { x: 0.40, y: 0.05 },  // F6
  "07_40": { x: 0.45, y: 0.05 },  // F7
  "07_41": { x: 0.50, y: 0.05 },  // F8
  "07_42": { x: 0.55, y: 0.05 },  // F9
  "07_43": { x: 0.60, y: 0.05 },  // F10
  "07_44": { x: 0.65, y: 0.05 },  // F11
  "07_45": { x: 0.70, y: 0.05 },  // F12

  // Navigation cluster
  "07_46": { x: 0.80, y: 0.05 },  // Print Screen
  "07_47": { x: 0.85, y: 0.05 },  // Scroll Lock
  "07_48": { x: 0.90, y: 0.05 },  // Pause
  "07_49": { x: 0.80, y: 0.15 },  // Insert
  "07_4A": { x: 0.85, y: 0.15 },  // Home
  "07_4B": { x: 0.90, y: 0.15 },  // Page Up
  "07_4C": { x: 0.80, y: 0.20 },  // Delete
  "07_4D": { x: 0.85, y: 0.20 },  // End
  "07_4E": { x: 0.90, y: 0.20 },  // Page Down

  // Arrow keys
  "07_52": { x: 0.85, y: 0.45 },  // Up Arrow
  "07_50": { x: 0.80, y: 0.50 },  // Left Arrow
  "07_51": { x: 0.85, y: 0.50 },  // Down Arrow
  "07_4F": { x: 0.90, y: 0.50 },  // Right Arrow

  // Numpad
  "07_53": { x: 0.95, y: 0.15 },  // Num Lock
  "07_54": { x: 1.00, y: 0.15 },  // Keypad /
  "07_55": { x: 1.05, y: 0.15 },  // Keypad *
  "07_56": { x: 1.10, y: 0.15 },  // Keypad -
  "07_5F": { x: 0.95, y: 0.20 },  // Keypad 7
  "07_60": { x: 1.00, y: 0.20 },  // Keypad 8
  "07_61": { x: 1.05, y: 0.20 },  // Keypad 9
  "07_57": { x: 1.10, y: 0.20, height: 0.10 },  // Keypad +
  "07_5C": { x: 0.95, y: 0.25 },  // Keypad 4
  "07_5D": { x: 1.00, y: 0.25 },  // Keypad 5
  "07_5E": { x: 1.05, y: 0.25 },  // Keypad 6
  "07_59": { x: 0.95, y: 0.30 },  // Keypad 1
  "07_5A": { x: 1.00, y: 0.30 },  // Keypad 2
  "07_5B": { x: 1.05, y: 0.30 },  // Keypad 3
  "07_58": { x: 1.10, y: 0.30, height: 0.10 },  // Keypad Enter
  "07_62": { x: 0.95, y: 0.35, width: 0.10 },  // Keypad 0
  "07_63": { x: 1.05, y: 0.35 },  // Keypad .

  // Modifier keys
  "07_E0": { x: 0.05, y: 0.50, width: 0.10 },  // Left Control
  "07_E1": { x: 0.05, y: 0.40, width: 0.15 },  // Left Shift
  "07_E2": { x: 0.15, y: 0.50 },  // Left Alt
  "07_E3": { x: 0.20, y: 0.50 },  // Left GUI (Windows key)
  "07_E4": { x: 0.65, y: 0.50, width: 0.10 },  // Right Control
  "07_E5": { x: 0.70, y: 0.40, width: 0.15 },  // Right Shift
  "07_E6": { x: 0.60, y: 0.50 },  // Right Alt
  "07_E7": { x: 0.55, y: 0.50 },  // Right GUI (Windows key)

  // Additional keys
  "07_67": { x: 1.10, y: 0.25 },  // Keypad =
  "07_68": { x: 0.75, y: 0.05 },  // F13
  "07_89": { x: 0.75, y: 0.30 },  // International3 (Yen)
} as const;

/**
 * Alternative compact layout for smaller screens
 */
export const CompactKeyboardLayout: PositionMap = {
  // Simplified layout with reduced spacing
  // Letters arranged in a more compact grid
  "07_14": { x: 0.1, y: 0.2 },   // Q
  "07_1A": { x: 0.15, y: 0.2 },  // W
  "07_08": { x: 0.2, y: 0.2 },   // E
  "07_15": { x: 0.25, y: 0.2 },  // R
  "07_17": { x: 0.3, y: 0.2 },   // T
  "07_1C": { x: 0.35, y: 0.2 },  // Y
  "07_18": { x: 0.4, y: 0.2 },   // U
  "07_0C": { x: 0.45, y: 0.2 },  // I
  "07_12": { x: 0.5, y: 0.2 },   // O
  "07_13": { x: 0.55, y: 0.2 },  // P

  "07_04": { x: 0.1, y: 0.3 },   // A
  "07_16": { x: 0.15, y: 0.3 },  // S
  "07_07": { x: 0.2, y: 0.3 },   // D
  "07_09": { x: 0.25, y: 0.3 },  // F
  "07_0A": { x: 0.3, y: 0.3 },   // G
  "07_0B": { x: 0.35, y: 0.3 },  // H
  "07_0D": { x: 0.4, y: 0.3 },   // J
  "07_0E": { x: 0.45, y: 0.3 },  // K
  "07_0F": { x: 0.5, y: 0.3 },   // L

  "07_1D": { x: 0.15, y: 0.4 },  // Z
  "07_1B": { x: 0.2, y: 0.4 },   // X
  "07_06": { x: 0.25, y: 0.4 },  // C
  "07_19": { x: 0.3, y: 0.4 },   // V
  "07_05": { x: 0.35, y: 0.4 },  // B
  "07_11": { x: 0.4, y: 0.4 },   // N
  "07_10": { x: 0.45, y: 0.4 },  // M

  "07_2C": { x: 0.2, y: 0.5, width: 0.3 },  // Space
} as const;

/**
 * Utility functions for working with keyboard positions
 */
export const PositionUtils = {
  /**
   * Get position for a usage ID with fallback
   */
  getPosition(usageId: UsageID, layout: PositionMap = KeyboardUsageIdMap): KeyPosition | undefined {
    return layout[usageId];
  },

  /**
   * Scale positions for different screen sizes
   */
  scalePosition(position: KeyPosition, scaleX: number, scaleY: number): KeyPosition {
    return {
      x: position.x * scaleX,
      y: position.y * scaleY,
      width: position.width ? position.width * scaleX : undefined,
      height: position.height ? position.height * scaleY : undefined
    };
  },

  /**
   * Get all positions for a specific row
   */
  getRowPositions(y: number, tolerance: number = 0.05, layout: PositionMap = KeyboardUsageIdMap): Array<[UsageID, KeyPosition]> {
    return Object.entries(layout)
      .filter(([_, pos]) => pos && Math.abs(pos.y - y) <= tolerance)
      .map(([usageId, pos]) => [usageId as UsageID, pos!]);
  },

  /**
   * Find the closest key to a given position
   */
  findClosestKey(x: number, y: number, layout: PositionMap = KeyboardUsageIdMap): [UsageID, KeyPosition] | undefined {
    let closest: [UsageID, KeyPosition] | undefined;
    let minDistance = Infinity;

    for (const [usageId, position] of Object.entries(layout)) {
      if (!position) continue;
      const distance = Math.sqrt(Math.pow(position.x - x, 2) + Math.pow(position.y - y, 2));
      if (distance < minDistance) {
        minDistance = distance;
        closest = [usageId as UsageID, position];
      }
    }

    return closest;
  },

  /**
   * Check if a position is within key bounds
   */
  isWithinKey(x: number, y: number, position: KeyPosition, tolerance: number = 0.02): boolean {
    const width = position.width || 0.04; // Default key width
    const height = position.height || 0.04; // Default key height

    return x >= position.x - tolerance &&
           x <= position.x + width + tolerance &&
           y >= position.y - tolerance &&
           y <= position.y + height + tolerance;
  }
};

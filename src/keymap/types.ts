// HID Usage ID Types - Simplified and more maintainable

/**
 * HID Usage Page identifiers
 */
export const enum UsagePage {
  GENERIC_DESKTOP = 0x01,
  SIMULATION_CONTROLS = 0x02,
  VR_CONTROLS = 0x03,
  SPORT_CONTROLS = 0x04,
  GAME_CONTROLS = 0x05,
  GENERIC_DEVICE_CONTROLS = 0x06,
  KEYBOARD_KEYPAD = 0x07,
  LED = 0x08,
  BUTTON = 0x09,
  ORDINAL = 0x0A,
  TELEPHONY = 0x0B,
  CONSUMER = 0x0C,
  DIGITIZERS = 0x0D,
  HAPTICS = 0x0E,
  PHYSICAL_INPUT_DEVICE = 0x0F,
  UNICODE = 0x10,
  EYE_HEAD_TRACKER = 0x12,
  AUXILIARY_DISPLAY = 0x14,
  SENSORS = 0x20,
  MEDICAL_INSTRUMENT = 0x40,
  BRAILLE_DISPLAY = 0x41,
  LIGHTING_ILLUMINATION = 0x59,
  MONITOR = 0x80,
  MONITOR_ENUMERATED = 0x81,
  VESA_VIRTUAL_CONTROLS = 0x82,
  POWER = 0x84,
  BATTERY_SYSTEM = 0x85,
  BARCODE_SCANNER = 0x8C,
  SCALES = 0x8D,
  MAGNETIC_STRIPE_READER = 0x8E,
  CAMERA_CONTROL = 0x90,
  ARCADE = 0x91
}

/**
 * Core HID Usage ID type - using string literal pattern
 */
export type UsageID = `${string}_${string}`;

/**
 * Keyboard-specific usage IDs (Page 0x07)
 */
export type KeyboardUsageID = `07_${string}`;

/**
 * Position data for keyboard layout
 */
export interface KeyPosition {
  readonly x: number;
  readonly y: number;
  readonly width?: number;
  readonly height?: number;
}

/**
 * Key information combining usage, name, and position
 */
export interface KeyInfo {
  readonly usageId: UsageID;
  readonly name: string;
  readonly position?: KeyPosition;
  readonly keyCode?: string;
}

/**
 * Optimized lookup maps using readonly for better performance
 */
export type UsageNameMap = Readonly<Record<UsageID, string>>;
export type KeyCodeMap = Readonly<Record<string, UsageID>>;
export type PositionMap = Readonly<Partial<Record<UsageID, KeyPosition>>>;

/**
 * Utility functions for working with Usage IDs
 */
export const UsageIDUtils = {
  /**
   * Create a usage ID from page and usage values
   */
  create(page: number, usage: number): UsageID {
    const pageHex = page.toString(16).toUpperCase().padStart(2, '0');
    const usageHex = usage.toString(16).toUpperCase().padStart(2, '0');
    return `${pageHex}_${usageHex}` as UsageID;
  },

  /**
   * Parse a usage ID into page and usage components
   */
  parse(usageId: UsageID): { page: number; usage: number } {
    const [pageStr, usageStr] = usageId.split('_');
    return {
      page: parseInt(pageStr, 16),
      usage: parseInt(usageStr, 16)
    };
  },

  /**
   * Check if a usage ID belongs to a specific page
   */
  isFromPage(usageId: UsageID, page: UsagePage): boolean {
    const pageHex = page.toString(16).toUpperCase().padStart(2, '0');
    return usageId.startsWith(pageHex);
  }
};
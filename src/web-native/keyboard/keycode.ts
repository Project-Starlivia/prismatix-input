// Refactored Keyboard Module - Now modular and maintainable
// 
// This file has been completely refactored from a 175KB monolith to improve:
// - Code organization and maintainability
// - Performance through caching and optimized data structures
// - Type safety and developer experience
// - Modularity for easier testing and extension

// Import everything first
import type { UsageID, KeyboardUsageID, KeyPosition, KeyInfo, UsageNameMap, KeyCodeMap, PositionMap } from './types';
import { UsagePage, UsageIDUtils } from './types';
import { UsageName, KeyboardUsageNames, GenericDesktopUsageNames, getUsageName, getPageUsageNames } from './usage-names';
import { KeyCodeToUsageIdMap, UsageIdToKeyCodeMap, getUsageIdFromKeyCode, getKeyCodeFromUsageId, isKeyCodeMapped, hasKeyCode, getAllKeyCodes, getAllMappedUsageIds, KeyCategories } from './key-mappings';
import { KeyboardUsageIdMap, CompactKeyboardLayout, PositionUtils } from './position-mappings';

// Re-export types from the new modular structure
export type {
  UsageID,
  KeyboardUsageID,
  KeyPosition,
  KeyInfo,
  UsageNameMap,
  KeyCodeMap,
  PositionMap
} from './types';

export {
  UsagePage,
  UsageIDUtils
} from './types';

// Re-export usage names with backward compatibility
export {
  UsageName,
  KeyboardUsageNames,
  GenericDesktopUsageNames,
  getUsageName,
  getPageUsageNames
} from './usage-names';

// Re-export key mappings with backward compatibility
export {
  KeyCodeToUsageIdMap,
  UsageIdToKeyCodeMap,
  getUsageIdFromKeyCode,
  getKeyCodeFromUsageId,
  isKeyCodeMapped,
  hasKeyCode,
  getAllKeyCodes,
  getAllMappedUsageIds,
  KeyCategories
} from './key-mappings';

// Re-export position mappings with backward compatibility
export {
  KeyboardUsageIdMap,
  CompactKeyboardLayout,
  PositionUtils
} from './position-mappings';

// Legacy compatibility - deprecated, use the new modular exports instead
/** @deprecated Use KeyCodeToUsageIdMap instead */
export const KeyCodeToUsageId = KeyCodeToUsageIdMap;

/** @deprecated Use getUsageName function instead */
export const getUsageNameLegacy = getUsageName;

/** @deprecated Use PositionUtils.getPosition instead */
export const getKeyPosition = PositionUtils.getPosition;

// Performance optimizations and utilities
export const KeyboardUtils = {
  /**
   * Batch lookup for multiple key codes
   */
  getUsageIdsFromKeyCodes(keyCodes: string[]): Array<{ keyCode: string; usageId: UsageID | undefined }> {
    return keyCodes.map(keyCode => ({
      keyCode,
      usageId: getUsageIdFromKeyCode(keyCode)
    }));
  },

  /**
   * Get all keys in a specific category
   */
  getKeysByCategory(category: keyof typeof KeyCategories): string[] {
    return KeyCategories[category] as string[];
  },

  /**
   * Check if a usage ID is a keyboard key
   */
  isKeyboardKey(usageId: UsageID): boolean {
    return usageId.startsWith('07_');
  },

  /**
   * Get keyboard layout information
   */
  getLayoutInfo() {
    const totalKeys = Object.keys(KeyboardUsageIdMap).length;
    const mappedKeyCodes = Object.keys(KeyCodeToUsageIdMap).length;
    const coverage = (mappedKeyCodes / totalKeys) * 100;

    return {
      totalKeys,
      mappedKeyCodes,
      coverage: Math.round(coverage * 100) / 100
    };
  },

  /**
   * Validate usage ID format
   */
  isValidUsageId(usageId: string): usageId is UsageID {
    return /^[0-9A-F]{2}_[0-9A-F]{2}$/.test(usageId);
  }
};

// Export everything for comprehensive access
export * from './types';
export * from './usage-names';
export * from './key-mappings';
export * from './position-mappings';

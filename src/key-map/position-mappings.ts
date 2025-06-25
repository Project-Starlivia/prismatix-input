// Keyboard Position Mappings - Extracted from keycode.ts for better maintainability
import type { UsageID, KeyPosition, PositionMap } from './types';

/**
 * Standard QWERTY keyboard layout positions
 * Coordinates are normalized (0.0 to 1.0) for responsive layouts
 */
export const KeyboardUsageIdMap: PositionMap = {
  // esc f1~f12
  "07_29": { x: 0.033, y: 0.083 },
  "07_3A": { x: 0.166, y: 0.083 },
  "07_3B": { x: 0.233, y: 0.083 },
  "07_3C": { x: 0.3, y: 0.083 },
  "07_3D": { x: 0.366, y: 0.083 },
  "07_3E": { x: 0.433, y: 0.083 },
  "07_3F": { x: 0.5, y: 0.083 },
  "07_40": { x: 0.566, y: 0.083 },
  "07_41": { x: 0.633, y: 0.083 },
  "07_42": { x: 0.7, y: 0.083 },
  "07_43": { x: 0.766, y: 0.083 },
  "07_44": { x: 0.833, y: 0.083 },
  "07_45": { x: 0.9, y: 0.083 },
  // ` 1~0 - = jpy bsp
  "07_35": { x: 0.033, y: 0.25 },
  "07_1E": { x: 0.100, y: 0.25 },
  "07_1F": { x: 0.166, y: 0.25 },
  "07_20": { x: 0.233, y: 0.25 },
  "07_21": { x: 0.3, y: 0.25 },
  "07_22": { x: 0.366, y: 0.25 },
  "07_23": { x: 0.433, y: 0.25 },
  "07_24": { x: 0.5, y: 0.25 },
  "07_25": { x: 0.566, y: 0.25 },
  "07_26": { x: 0.633, y: 0.25 },
  "07_27": { x: 0.7, y: 0.25 },
  "07_2D": { x: 0.766, y: 0.25 },
  "07_2E": { x: 0.833, y: 0.25 },
  "07_89": { x: 0.9, y: 0.25 },
  "07_2A": { x: 0.966, y: 0.25 },
  // tab qwe...
  "07_2B": { x: 0.049, y: 0.416 },
  "07_14": { x: 0.133, y: 0.416 },
  "07_1A": { x: 0.200, y: 0.416 },
  "07_08": { x: 0.266, y: 0.416 },
  "07_15": { x: 0.333, y: 0.416 },
  "07_17": { x: 0.400, y: 0.416 },
  "07_1C": { x: 0.466, y: 0.416 },
  "07_18": { x: 0.533, y: 0.416 },
  "07_0C": { x: 0.600, y: 0.416 },
  "07_12": { x: 0.666, y: 0.416 },
  "07_13": { x: 0.733, y: 0.416 },
  "07_2F": { x: 0.800, y: 0.416 },
  "07_30": { x: 0.866, y: 0.416 },
  "07_31": { x: 0.951, y: 0.416 },
  // caps a s ...
  "07_39": { x: 0.065, y: 0.583 },
  "07_04": { x: 0.149, y: 0.583 },
  "07_16": { x: 0.215, y: 0.583 },
  "07_07": { x: 0.281, y: 0.583 },
  "07_09": { x: 0.347, y: 0.583 },
  "07_0A": { x: 0.413, y: 0.583 },
  "07_0B": { x: 0.479, y: 0.583 },
  "07_0D": { x: 0.545, y: 0.583 },
  "07_0E": { x: 0.611, y: 0.583 },
  "07_0F": { x: 0.677, y: 0.583 },
  "07_33": { x: 0.743, y: 0.583 },
  "07_34": { x: 0.809, y: 0.583 },
  "07_32": { x: 0.875, y: 0.583 },
  "07_28": { x: 0.954, y: 0.583 },
  // shift < z ...
  "07_E1": { x: 0.041, y: 0.75 },
  "07_64": { x: 0.107, y: 0.75 },
  "07_1D": { x: 0.173, y: 0.75 },
  "07_1B": { x: 0.239, y: 0.75 },
  "07_06": { x: 0.305, y: 0.75 },
  "07_19": { x: 0.371, y: 0.75 },
  "07_05": { x: 0.437, y: 0.75 },
  "07_11": { x: 0.503, y: 0.75 },
  "07_10": { x: 0.569, y: 0.75 },
  "07_36": { x: 0.635, y: 0.75 },
  "07_37": { x: 0.701, y: 0.75 },
  "07_38": { x: 0.767, y: 0.75 },
  "07_87": { x: 0.833, y: 0.75 },
  "07_E5": { x: 0.916, y: 0.75 },
  // ctl gui alt..
  "07_E0": { x: 0.033, y: 0.916 },
  "07_E2": { x: 0.100, y: 0.916 },
  "07_8B": { x: 0.174, y: 0.916 },
  "07_2C": { x: 0.395, y: 0.916 },
  "07_8A": { x: 0.616, y: 0.916 },
  "07_88": { x: 0.691, y: 0.916 },
  "07_E6": { x: 0.766, y: 0.916 },
  "07_E7": { x: 0.833, y: 0.916 },
  "07_65": { x: 0.9, y: 0.916 },
  "07_E4": { x: 0.966, y: 0.916 },
}

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

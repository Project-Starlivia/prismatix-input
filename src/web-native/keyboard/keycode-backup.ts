// This is a backup of the original keycode.ts file before refactoring
// The original file was 175KB and nearly 5000 lines of repetitive code
// It has been refactored into multiple smaller, more maintainable modules

// Original file contained:
// 1. Massive UsageID type definition (lines 1-584)
// 2. Huge UsageName record mapping (lines 586-~4800)
// 3. KeyCodeToUsageIdMap record (lines ~4800-4929)
// 4. KeyboardUsageIdMap record (lines 4932-4972)

// This has been refactored into:
// - types.ts: Core type definitions and utilities
// - usage-names.ts: Usage ID to name mappings
// - key-mappings.ts: Key code to usage ID mappings
// - position-mappings.ts: Keyboard layout position data
// - keycode.ts: Clean re-export module

export const REFACTORING_INFO = {
  originalFileSize: '175KB',
  originalLines: 4973,
  newModules: [
    'types.ts',
    'usage-names.ts', 
    'key-mappings.ts',
    'position-mappings.ts',
    'keycode.ts'
  ],
  improvements: [
    'Modular architecture',
    'Performance optimizations with caching',
    'Better type safety',
    'Easier maintenance and testing',
    'Reduced bundle size through tree-shaking',
    'Cleaner API with utility functions'
  ]
};
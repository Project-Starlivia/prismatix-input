# Prismatix Input

A simple library for unified and extensible web input handling.

## Features

- **Unified Input Handling**: Handle keyboard, mouse, and pointer inputs consistently
- **Framework Integration**: Seamless integration with mitt and rxjs
- **TypeScript Support**: Full TypeScript support with type definitions
- **Key Mapping**: Convert keyboard inputs to screen positions with keyMap support
- **Flexible Filtering**: Filter events by various criteria
- **Lightweight**: Modular design allows you to install only what you need

## Playground

[Try samples on CodeSandbox](https://codesandbox.io/s/prismatix-input-playground)

## Installation

```bash
# Full package
npm install @starlivia/prismatix-input

# Or with your preferred package manager
yarn add @starlivia/prismatix-input
pnpm add @starlivia/prismatix-input
bun add @starlivia/prismatix-input
```

### Modular Installation

```bash
# Core + mitt
npm install @starlivia/prismatix-input-core @starlivia/prismatix-input-mitt

# Core + rxjs
npm install @starlivia/prismatix-input-core @starlivia/prismatix-input-rxjs

# Core only
npm install @starlivia/prismatix-input-core
```

## Quick Start

### Basic Usage

```typescript
import { createSubject } from '@starlivia/prismatix-input-rxjs';
import { KeyboardInput } from '@starlivia/prismatix-input-core/input/keyboard';
import { PointerInput } from '@starlivia/prismatix-input-core/input/pointer';

const inputSubject = createSubject();
new KeyboardInput(inputSubject);
new PointerInput(inputSubject);

inputSubject.subscribe(event => {
    console.log(event); // { key, action, time }
});
```

### Target Specific Elements

```typescript
import { createSubject } from '@starlivia/prismatix-input-rxjs';
import { KeyboardInput } from '@starlivia/prismatix-input-core/input/keyboard';

const keyboard = createSubject();
const canvas = document.getElementById('myCanvas');
new KeyboardInput(keyboard, { target: canvas });

keyboard.subscribe(event => console.log(event));
```

### Event Filtering

```typescript
import { MouseInput } from '@starlivia/prismatix-input-core/input/mouse';

const mouse = createSubject();
new MouseInput(mouse, {
    events: ['click', 'mousedown'],
    filters: {
        button: [0, 1] // Only left and middle mouse buttons
    }
});
```

## Input Types

### Keyboard Input

Handle keyboard events with various levels of detail.

#### `KeyboardInput`
Basic keyboard event handling.

```typescript
import { KeyboardInput } from '@starlivia/prismatix-input-core/input/keyboard';

new KeyboardInput(subject, {
    target?: EventTarget,           // Default: document
    events?: string[],              // Default: ['keydown', 'keyup']
    filters?: {
        key?: string[],             // Filter by key values
        code?: string[]             // Filter by key codes
    }
});
```

#### `KeyboardInputCode`
Keyboard input with key code information.

```typescript
import { KeyboardInputCode } from '@starlivia/prismatix-input-core/input/keyboard';

new KeyboardInputCode(subject, options);
// Events include: { key, action, time, code }
```

#### `KeyboardInputFull`
Complete keyboard event information.

```typescript
import { KeyboardInputFull } from '@starlivia/prismatix-input-core/input/keyboard';

new KeyboardInputFull(subject, options);
// Events include all KeyboardEvent properties
```

#### `KeyboardInputWithKeyMap`
Keyboard input with screen position mapping.

```typescript
import { KeyboardInputWithKeyMap } from '@starlivia/prismatix-input-core/input/keyboard';

new KeyboardInputWithKeyMap(subject, {
    ...options,
    keyMap?: {
        keyCodeMap?: KeyCodeMap,    // Custom key code mapping
        positionMap?: PositionMap,  // Custom position mapping
        defaultPosition?: number    // Default position value
    }
});
// Events include: { key, action, time, x?, y? }
```

### Mouse Input

Handle mouse events with different levels of detail.

#### `MouseInput`
Basic mouse event handling.

```typescript
import { MouseInput } from '@starlivia/prismatix-input-core/input/mouse';

new MouseInput(subject, {
    target?: EventTarget,           // Default: document
    events?: MouseEvent[],          // Default: all mouse events
    filters?: {
        button?: number[],          // Filter by mouse buttons
        buttons?: number[]          // Filter by button combinations
    }
});
```

**Available Events:**
- `click`, `dblclick`, `contextmenu`
- `mousedown`, `mouseup`
- `mousemove`
- `mouseenter`, `mouseleave`, `mouseover`, `mouseout`

#### `MouseInputButtons`
Mouse input with button state information.

```typescript
import { MouseInputButtons } from '@starlivia/prismatix-input-core/input/mouse';

new MouseInputButtons(subject, options);
// Events include: { key, action, time, buttons }
```

#### `MouseInputPosition`
Mouse input with position information.

```typescript
import { MouseInputPosition } from '@starlivia/prismatix-input-core/input/mouse';

new MouseInputPosition(subject, options);
// Events include: { key, action, time, x, y }
```

#### `MouseInputFull`
Complete mouse event information.

```typescript
import { MouseInputFull } from '@starlivia/prismatix-input-core/input/mouse';

new MouseInputFull(subject, options);
// Events include all MouseEvent properties
```

### Pointer Input

Handle pointer events for touch, pen, and mouse inputs.

#### `PointerInput`
Basic pointer event handling.

```typescript
import { PointerInput } from '@starlivia/prismatix-input-core/input/pointer';

new PointerInput(subject, {
    target?: EventTarget,           // Default: document
    events?: PointerEvent[],        // Default: all pointer events
    filters?: {
        pointerType?: string[],     // Filter by pointer type ('mouse', 'pen', 'touch')
        pointerId?: number[],       // Filter by pointer ID
        button?: number[],          // Filter by buttons
        buttons?: number[]          // Filter by button combinations
    }
});
```

**Available Events:**
- `pointerdown`, `pointerup`
- `pointermove`
- `pointerenter`, `pointerleave`, `pointerover`, `pointerout`
- `pointercancel`

#### `PointerInputWithPosition`
Pointer input with position information.

```typescript
import { PointerInputWithPosition } from '@starlivia/prismatix-input-core/input/pointer';

new PointerInputWithPosition(subject, options);
// Events include: { key, action, time, x, y }
```

#### `PointerInputFull`
Complete pointer event information.

```typescript
import { PointerInputFull } from '@starlivia/prismatix-input-core/input/pointer';

new PointerInputFull(subject, options);
// Events include all PointerEvent properties
```

## Event Structure

All input events follow a consistent structure:

```typescript
interface PRXEvent {
    key: string;        // Identifier (key name, button number, pointer type)
    action: string;     // 'start', 'hold', 'move', 'end'
    time: number;       // Event timestamp
}
```

## Integration

### With mitt

```typescript
import { createEmitter } from '@starlivia/prismatix-input-mitt';
import { KeyboardInput } from '@starlivia/prismatix-input-core/input/keyboard';

const emitter = createEmitter();
new KeyboardInput(emitter);

emitter.on('*', event => console.log(event));
```

### With RxJS

```typescript
import { createSubject } from '@starlivia/prismatix-input-rxjs';
import { KeyboardInput } from '@starlivia/prismatix-input-core/input/keyboard';

const subject = createSubject();
new KeyboardInput(subject);

subject.pipe(
    filter(event => event.action === 'start')
).subscribe(event => console.log(event));
```

## License

MIT

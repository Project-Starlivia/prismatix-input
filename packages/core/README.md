# @starlivia/prismatix-input-core

Core package for unified and extensible web input handling.

## Features

- **Unified Input Handling**: Handle keyboard, mouse, and pointer inputs consistently
- **TypeScript Support**: Full TypeScript support with type definitions
- **Key Mapping**: Convert keyboard inputs to screen positions with keyMap support
- **Flexible Filtering**: Filter events by various criteria
- **Lightweight**: Modular design with no external dependencies

## Installation

```bash
npm install @starlivia/prismatix-input-core
```

## Quick Start

```typescript
import { KeyboardInput } from '@starlivia/prismatix-input-core/input/keyboard';
import { MouseInput } from '@starlivia/prismatix-input-core/input/mouse';
import { PointerInput } from '@starlivia/prismatix-input-core/input/pointer';

// You'll need a subject implementation (mitt, rxjs, or custom)
// See @starlivia/prismatix-input-mitt or @starlivia/prismatix-input-rxjs
// Or create your own custom integration
```

## Input Types

- **Keyboard**: `KeyboardInput`, `KeyboardInputCode`, `KeyboardInputFull`, `KeyboardInputWithKeyMap`
- **Mouse**: `MouseInput`, `MouseInputButtons`, `MouseInputPosition`, `MouseInputFull`
- **Pointer**: `PointerInput`, `PointerInputWithPosition`, `PointerInputFull`

## Integration

This package requires a subject implementation. Use with:

- [@starlivia/prismatix-input-mitt](https://www.npmjs.com/package/@starlivia/prismatix-input-mitt) - mitt integration
- [@starlivia/prismatix-input-rxjs](https://www.npmjs.com/package/@starlivia/prismatix-input-rxjs) - RxJS integration

### Custom Integration

You can also create your own custom integration by implementing the required subject interface. This allows you to integrate with any event system or state management solution of your choice.

## Documentation

For complete documentation and examples, see [@starlivia/prismatix-input](https://www.npmjs.com/package/@starlivia/prismatix-input).

## License

MIT

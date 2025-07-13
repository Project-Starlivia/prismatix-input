# @starlivia/prismatix-input-mitt

mitt extension for [@starlivia/prismatix-input](https://www.npmjs.com/package/@starlivia/prismatix-input)

## Installation

```bash
npm install @starlivia/prismatix-input-mitt @starlivia/prismatix-input-core
```

## Usage

```typescript
import mitt from 'mitt';
import { createSubject } from '@starlivia/prismatix-input-mitt';
import { KeyboardInput } from '@starlivia/prismatix-input-core/input/keyboard';

const emitter = mitt();
const inputSubject = createSubject(emitter, 'input');

new KeyboardInput(inputSubject);

emitter.on('input', event => {
    console.log(event); // { key, action, time }
});
```

## API

### `createSubject<E, T>(emitter, key)`

Creates a PRXSubject from a mitt emitter for the specified event key.

**Parameters:**
- `emitter`: mitt emitter instance
- `key`: event key to listen to

**Returns:** PRXSubject compatible with @starlivia/prismatix-input

## Links

- [@starlivia/prismatix-input](https://www.npmjs.com/package/@starlivia/prismatix-input) - Main package
- [@starlivia/prismatix-input-core](https://www.npmjs.com/package/@starlivia/prismatix-input-core) - Core functionality
- [mitt](https://www.npmjs.com/package/mitt) - Tiny functional event emitter

## License

MIT

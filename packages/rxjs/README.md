# @prismatix-input/rxjs

RxJS extension for [prismatix-input](https://www.npmjs.com/package/prismatix-input)

## Installation

```bash
npm install @prismatix-input/rxjs @prismatix-input/core
```

## Usage

```typescript
import { createSubject } from '@prismatix-input/rxjs';
import { KeyboardInput } from '@prismatix-input/core/input/keyboard';
import { filter } from 'rxjs/operators';

const inputSubject = createSubject();
new KeyboardInput(inputSubject);

inputSubject.pipe(
    filter(event => event.action === 'start')
).subscribe(event => {
    console.log(event); // { key, action, time }
});
```

## API

### `createSubject<T>()`

Creates a PRXSubject using RxJS Subject.

**Returns:** PRXSubject compatible with prismatix-input

### `convertSubject<T>(subject)`

Converts an existing RxJS Subject to PRXSubject.

**Parameters:**
- `subject`: RxJS Subject instance

**Returns:** PRXSubject compatible with prismatix-input

## Links

- [prismatix-input](https://www.npmjs.com/package/prismatix-input) - Main package
- [@prismatix-input/core](https://www.npmjs.com/package/@prismatix-input/core) - Core functionality
- [RxJS](https://www.npmjs.com/package/rxjs) - Reactive Extensions for JavaScript

## License

MIT
# prismatix-input

[English](README_EN.md) | [日本語](README.md)

## Overview
A library for integrating and extending web input functionality.

I created this because I found it inconvenient while working. I've tried to make it as fast as possible, but performance will probably drop since it adds a pure layer. Extensibility is relatively high, but there are clear constraints.

The name comes from the image of collecting and dispersing input.

## Installation

```bash
# Install the main package (includes all integrations)
npm install @starlivia/prismatix-input

# Or install individual packages
npm install @starlivia/prismatix-input-core      # Core functionality
npm install @starlivia/prismatix-input-mitt      # Mitt integration
npm install @starlivia/prismatix-input-rxjs      # RxJS integration
```

## NPM Packages
- [`@starlivia/prismatix-input`](https://www.npmjs.com/package/@starlivia/prismatix-input) - Main package including all integrations
- [`@starlivia/prismatix-input-core`](https://www.npmjs.com/package/@starlivia/prismatix-input-core) - Core functionality
- [`@starlivia/prismatix-input-mitt`](https://www.npmjs.com/package/@starlivia/prismatix-input-mitt) - Mitt integration
- [`@starlivia/prismatix-input-rxjs`](https://www.npmjs.com/package/@starlivia/prismatix-input-rxjs) - RxJS integration

## Future Plans
- I might not update this for a while since I want to create other OSS projects...
- I'll do my best to respond to issues/pull requests if you submit them

If I were to extend this in the future:
- middleware
  - Click detection during action
  - Combos
- Integration with other messaging libraries
Something like that

### License
MIT

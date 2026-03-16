# Agent Guidelines for Treason Coup

This document provides guidance for agents working on this codebase.

## Project Overview

Treason Coup is a Node.js real-time game server using Express, Socket.IO, and Knockout.js for the frontend. Players compete in the game Coup/Reformation using influence cards.

## Build, Test, and Development Commands

### Running Tests

```bash
# Run all tests
npm test

# Run a single test file
npx mocha test/game-test.js

# Run tests matching a pattern
npx mocha --grep "challenge"

# Run tests in a specific file with grep filter
npx mocha test/challenge-test.js --grep "challenge"
```

### Development Notes

- No linting tool is configured (no ESLint, JSHint, etc.)
- No type checking is configured
- Tests use Mocha with `expect.js` assertions

## Code Style Guidelines

### General Principles

- Use `'use strict';` at the top of all JavaScript files
- Use 4 spaces for indentation (not tabs)
- Maximum line length: 120 characters (soft limit)
- No semicolons at end of statements (follows standard Node.js style)
- Use descriptive, full variable names

### Functions

```javascript
// Named functions for clarity and stack traces
function getPlayerById(id) {
    return players.find(p => p.id === id);
}

// Arrow functions for callbacks (when appropriate)
players.forEach(p => {
    p.reset();
});

// Avoid anonymous functions in callbacks when the function is non-trivial
```

### Control Flow

```javascript
// Prefer early returns
function processAction(action) {
    if (!action) {
        return null;
    }
    if (!action.type) {
        return null;
    }
    // Main logic here
}

// Use ternary for simple conditional assignments
var name = player.name || 'Anonymous';
```

### HTML/EJS Templates

- Use 4-space indentation in EJS files
- Data bindings in Knockout: `data-bind="text: value"`
- Use semantic HTML elements
- Keep logic in JavaScript, not in templates

### Testing

```javascript
var expect = require('expect.js');

describe('Feature', function() {
    var game;
    var player;

    beforeEach(function() {
        // Setup
    });

    it('should do something', function() {
        expect(result).to.be(expectedValue);
    });
});
```

### Common Patterns in This Codebase

- Game state is managed in `game.js` with a state machine
- Player actions flow through `player.command()`
- Tests use `TestPlayers` helper from `test-util/test-player.js`
- Use `nullDataAccess` for tests that don't need database
- Internal (test-only) methods prefixed with `_test_` (e.g., `game._test_setInfluence()`)

### What to Avoid

- Don't use `console.log` for debugging in production code
- Don't commit secrets or credentials
- Don't make breaking changes without discussion
- Don't add new dependencies
- Avoid modifying code that doesn't need modification

### Browser Code (web/ folder)

- Uses Knockout.js for data binding
- Wrap in IIFE: `(function() { ... })();`
- Use `let`/`const` for new code even if`var` is used in the existing code
- Access Node.js constants via `window.*` (served from server)

## File Structure

```
treasoncoup2/
├── game.js              # Main game logic and state machine
├── ai-player.js         # AI player implementation
├── game-tracker.js      # Game statistics tracking
├── server.js            # Express/Socket.IO server
├── version.js           # Version endpoint
├── web/
│   ├── client.js        # Browser-side game code
│   ├── shared.js        # Shared constants (actions, states)
│   └── partials/        # EJS templates
├── test/
│   ├── game-test.js     # Main game tests
│   ├── challenge-test.js
│   ├── history-test.js
│   ├── ai-test.js
│   └── null-data-access.js
├── test-util/           # Test helpers
└── public/              # Static assets
```

## Important Notes

- The game uses a state machine - changes often involve `setState()` and state transitions
- Challenge logic is complex - be careful when refactoring
- The `gameTracker` object tracks statistics - ensure it's called appropriately
- Frontend uses Knockout observables - modify observables with `()`, e.g., `player.cash()`

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a reactive recipes application built with React and TypeScript, using RxJS and React-RxJS for state management. The architecture follows functional programming principles and state machines for managing complex interactions.

## Development Commands

### Basic Commands

```bash
# Install dependencies
npm install

# Start development server (runs both JSON server and Vite)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Type checking
npm run typecheck

# Preview built application
npm run preview
```

### Development Server Details

- `npm run dev` runs both the JSON server (port 3000) and Vite dev server (port 5173) concurrently
- JSON server uses `db.json` as the data source (copied from `db-seed.json`)
- Main application available at http://localhost:5173
- API endpoints available at http://localhost:3000

## Architecture Overview

### State Management Pattern

The application uses a state machine-driven architecture with React-RxJS:

1. **State Machines**: Each feature defines its state using state machine concepts with TypeScript types
2. **Signals**: User interactions are captured as RxJS signals using `createSignal()`
3. **State Reducers**: State transitions are handled through reducer functions in `scan()` operators
4. **Hooks**: State is consumed via React hooks created with `bind()`

### Directory Structure

```
src/
├── components/          # Shared UI components
├── lib/                 # Utilities (mutation, result, errors)
├── theme/              # Theme state management
├── recipes/            # Recipe listing and search
├── favorites/          # Individual favorite operations
├── favorites-manager/  # Bulk favorite selection
```

### Key Architectural Concepts

#### State Management

- Each feature has a `state.ts` file implementing the state machine
- Features export signals (action creators) and hooks (state consumers)
- State machines are defined with TypeScript types representing states and transitions

#### Service Layer

- Services handle async operations and API calls
- Use `switchMap` to handle request/response cycles
- Services are consumed by state machines, not directly by components

#### Mutation Pattern

- Async mutations use the `useMutation` hook from `src/lib/mutation.ts`
- Mutations return `AsyncResult<T>` types with states: Idle, Loading, Error, Success
- Results are handled with type guards (`isLoading`, `isSuccess`, `isError`)

#### Component Organization

- Components are organized by feature in their respective directories
- Each feature exports its main component and supporting components
- Components primarily consume state via hooks, not observables directly

### Key Libraries

- **@react-rxjs/core**: Core React-RxJS bindings (`bind`, `state`)
- **@react-rxjs/utils**: Utilities (`createSignal`, `mergeWithKey`)
- **rxjs**: Observable operators (`scan`, `switchMap`, `startWith`, etc.)
- **zod**: Schema validation
- **react-error-boundary**: Error handling
- **json-server**: Mock API server

### Testing

No specific test framework is currently configured. Check README for any testing setup instructions.

## Development Patterns

### Creating New Features

1. Create feature directory with `components/`, `model.ts`, `state.ts`, `service.ts` (if needed)
2. Define state machine in `model.ts` with TypeScript types
3. Implement state management in `state.ts` using React-RxJS patterns
4. Create service functions in `service.ts` for async operations
5. Build components that consume state via exported hooks

### State Machine Implementation

- Define states as TypeScript union types
- Use `createSignal()` for user interactions
- Implement state transitions with `scan()` and reducer functions
- Export signals (actions) and hooks (state consumers)
- Keep observables private to the module

### Error Handling

- Use `AsyncResult<T>` types for async operations
- Handle errors with `errorFromUnknown` utility
- Implement error boundaries for component-level error handling

## Libraries and Frameworks

### React-RxJS Integration

- **Overview**: React-RxJS is a lightweight library that provides RxJS bindings for React, enabling reactive state management
- **Key Concepts**:
  - `createSignal()`: Creates action streams for user interactions
  - `bind()`: Converts observables to React hooks for seamless state consumption
  - `state()`: Creates stateful observables with initial values
  - Supports complex state management with RxJS operators
- **Getting Started with React-RxJS**:
  - Install via `npm install @react-rxjs/core @react-rxjs/utils`
  - Create signals for actions using `createSignal()`
  - Use `bind()` to create hooks that consume state
  - Leverage RxJS operators for state transformations
  - Example pattern: `const [useMyState, myState$] = state(initialState)`
- **Best Practices**:
  - Keep state logic in dedicated files (e.g., `state.ts`)
  - Use type-safe state machines
  - Prefer declarative state management over imperative updates
  - Separate concerns between state management, services, and components

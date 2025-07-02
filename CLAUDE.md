# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs json-server and vite concurrently)
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck
# or just
tsc

# Linting
npm run lint

# Preview production build
npm run preview

# Reset database to seed data
npm run create-db
```

The development server runs two processes:

- `json-server` on the default port (3000) for the REST API mock
- Vite dev server on port 5173 for the React app

## Architecture Overview

This is a React application built with **React-RxJS** that demonstrates reactive state management patterns using finite state machines as specifications. The architecture is organized around feature-based modules with a clear separation between state, services, and components.

### Core Technologies

- **React 19** with TypeScript
- **React-RxJS** (`@react-rxjs/core`, `@react-rxjs/utils`) for reactive state management
- **RxJS** for reactive programming primitives
- **Vite** for build tooling
- **json-server** for API mocking
- **Zod** for schema validation

### State Management Pattern

The application uses a finite state machine approach where:

1. **State machines are designed first** using Mermaid diagrams (see README.md examples)
2. **Each feature has its own state module** (`state.ts`) that implements the state machine
3. **State transitions are implemented as React-RxJS signals** using `createSignal()`
4. **Public APIs export hooks and observables**, keeping signal observables private
5. **Services parameterize operations with state** to create request/response flows

### Directory Structure

```
src/
├── lib/               # Shared utilities and abstractions
│   ├── mutation.ts    # useMutation hook for async operations
│   ├── result.ts      # AsyncResult type for handling async states
│   └── errors.ts      # Error handling utilities
├── theme/             # Theme switching (light/dark)
├── recipes/           # Recipe listing, searching, pagination
├── favorites/         # Individual favorite operations (add/remove)
├── favorites-manager/ # Bulk favorite selection and operations
└── components/        # Shared UI components
```

### Key Patterns

#### State Module Structure

Each feature module follows this pattern:

- `model.ts` - Types and pure functions
- `state.ts` - React-RxJS state implementation
- `service.ts` - API calls and external side effects
- `components/` - React components for the feature

#### Public API Conventions

State modules export their public API in one of two ways:

1. **Single export block** (see `src/favorites/state.ts:89-100`) - easier to see full API
2. **Export in-situ** (see `src/favorites-manager/state.ts`) - easier to see what's public per definition

#### Mutation Pattern

- Use `useMutation` hook from `src/lib/mutation.ts` for async operations
- Mutations return `AsyncResult<T>` with states: idle, loading, success, error
- Side effects around mutations can be composed by wrapping the mutation function

#### State Composition

- Derive new states from existing observables rather than raw signals
- Avoid ambiguity where single user interactions could be interpreted multiple ways
- Keep signal observables private, export only hooks and derived observables

### Testing & Quality

The project uses:

- ESLint with TypeScript rules
- React hooks and refresh plugins
- TypeScript strict mode

Run quality checks before committing:

```bash
npm run typecheck && npm run lint
```

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

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Build project
npm run build

# Lint code
npm run lint

# Type checking
npm run typecheck

# Preview built application
npm run preview
```

## Testing

### Framework

The project uses Vitest as the testing framework with the following setup:

- **Test runner**: Vitest
- **React testing**: @testing-library/react
- **DOM matchers**: @testing-library/jest-dom
- **User interactions**: @testing-library/user-event
- **Environment**: jsdom

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Coverage Thresholds

Tests must maintain minimum coverage of 80% for:

- Branches
- Functions
- Lines
- Statements

### Test File Conventions

- Test files should be named `*.test.ts` or `*.test.tsx`
- Place test files next to the code they test
- Use descriptive test names and group related tests in `describe` blocks

### Example Test Structure

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  it("should render with expected behavior", () => {
    render(<ComponentName />);
    expect(screen.getByText("Expected text")).toBeInTheDocument();
  });
});
```

### CI/CD

Tests run automatically on:

- Pull requests to main branch
- Pushes to main branch
- CI will fail if tests fail or coverage drops below thresholds

## Security

The devcontainer includes network restrictions allowing only essential domains:

- GitHub (for git operations)
- NPM registry (for package management)
- Anthropic APIs (for Claude Code functionality)
- Statsig (for telemetry)

## Notes for Claude Code

- The project uses TypeScript with React
- Follow existing code patterns and conventions
- Use the devcontainer for consistent development environment
- Network restrictions are in place for security
- Write tests for new features and bug fixes

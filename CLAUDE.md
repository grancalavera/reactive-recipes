# Claude Code Development Guide

## Project Overview
This is a reactive recipes application built with TypeScript and React. The project includes a devcontainer setup for consistent development environment.

## Development Environment

### Devcontainer Setup
The project includes a VS Code devcontainer configuration with:
- Node.js 24 runtime
- Essential development tools (git, npm, zsh)
- Security-focused firewall configuration
- Claude Code CLI pre-installed

### Getting Started
1. Open the project in VS Code
2. When prompted, reopen in devcontainer
3. The container will automatically:
   - Install required extensions
   - Set up git configuration
   - Configure shell environment (zsh with powerline)
   - Initialize network firewall restrictions

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build project
npm run build

# Run linting
npm run lint

# Type checking
npm run type-check
```

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
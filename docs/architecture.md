# Architecture

## Overview

The crawler is modular and heavily uses abstractions to be able to decouple the different components and make them reusable.

Data sources, as well as vector databases, are abstracted and can be easily replaced with different implementations.

## Monorepo Structure

The project is organized as a monorepo using pnpm workspaces to manage dependencies and enable code sharing between components.

### Shared Libraries
The monorepo includes shared packages for:
- **Common types/interfaces**: Shared TypeScript definitions and contracts
- **Shared utilities**: Common helper functions and utilities
- **API client libraries**: Reusable API clients for different services
- **Database adapters/abstractions**: Abstracted database interfaces and implementations

### Testing Strategy
- **Unit tests**: Each package contains its own unit tests
- **Integration tests**: Dedicated separate package for cross-service integration testing

## Components

### Front-end
A backoffice to manage the crawler, adding the data sources and inspecting the data.

### API
A fully comprehensive API to manage the crawler, adding the data sources and inspecting the data.

### Asynchronous jobs
A set of asynchronous jobs to search and collect the data from the configured data sources.

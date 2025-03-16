# Pokemon Explorer

## Overview

Pokemon Explorer is a React application that allows users to browse and interact with Pokemon data from the PokeAPI. The application is built using Vite, React, TypeScript, and Tailwind CSS.

## Tech Stack
- Frontend Framework: React 19 with TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- State Management: Zustand
- API Fetching: TanStack React Query
- Routing: React Router
- Testing: Vitest for unit tests, Playwright for E2E testing

## Key Features
- Pokemon list with infinite scrolling
- Pokemon detail views
- Ability to favorite Pokemon
- Audio playback of Pokemon cries
- Responsive design

## Project Structure
The project follows a component-based architecture with:

- Atoms: Basic UI components (Card, Chip, PokeBallLoader, etc.)
- Molecules: Compound components (AudioPlayer, Breadcrumb)
- Organisms: Complex components (Favorite, PokemonFavoriteDetail)
- Pages: Full page components (PokemonListPage, PokemonDetailPage, etc.)

## API Integration
The application fetches data from the PokeAPI (https://pokeapi.co/api/v2/) with:

- Infinite query for Pokemon list
- Individual queries for Pokemon details

## State Management
Zustand is used for global state management, particularly for:

- Tracking favorite Pokemon
- Maintaining scroll position
- Loading state management

## Programming Patterns & Best Practices

### React Patterns
- Atomic Design: Components are organized following the Atomic Design methodology
- Custom Hooks: Separation of business logic from UI components
- Compound Components: Used for complex UI elements with internal state
- Render Props: Implemented for flexible component rendering
- Lazy Loading: Components and routes are lazy-loaded for performance

### State Management
- Zustand Store Pattern: Modular stores with separate slices for different concerns
- Immutable State Updates: All state updates maintain immutability
- Selector Pattern: Used with Zustand for efficient component re-renders

### Data Fetching
React Query Patterns:
- Optimistic updates for favorites
- Query invalidation for data consistency
- Prefetching for improved UX
- Query caching to minimize API calls

## Styling
The project uses Tailwind CSS with custom Pokemon-related color extensions for type-specific styling.

## Routing
The application uses React Router with the following main routes:

/pokemon-explorer/ - Main Pokemon list
/pokemon-explorer/favorites-pokemon - Favorited Pokemon
/pokemon-explorer/pokemon-detail/:id - Individual Pokemon details

## Testing
- Unit tests with Vitest
- E2E tests with Playwright
- Mock data available in test directory


## Running the App

To run the app, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to: `http://localhost:5173/`
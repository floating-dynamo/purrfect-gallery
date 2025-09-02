# Purrfect Gallery

A small Next.js (App Router + TypeScript) demo that showcases cat images and breed information with a clean UI and helpful utilities for a smooth developer experience.

## Key implemented features

- Skeleton loaders for smooth UX while data is fetching.
- Direct URL navigation — pages and query-driven state are bookmarkable. Example: `/?page=2&order=ASC`.
- Cat listing with sorting, pagination and optional breed filter.
- Cat details page with: image, name, description, origin, temperament badges and trait ratings.
- Add / remove favourites (persisted via the API layer). Favourites list supports pagination.
- Compare two breeds side-by-side using a searchable combobox for selecting breeds.
- Used the shadcn UI library components (buttons, dropdowns, popovers, tooltips, cards, skeletons, etc.).
- Development-mode mock API that can be toggled via environment variable (`IS_MOCK_API`).

## UI & Pages overview

- Home (`/`) — paginated list of cat images, sorting dropdown, breed filter, and skeletons while loading.
- Cat details (`/cats/[catId]`) — detailed view for one image/breed including favourite toggle.
- Favourites (`/cats/favourites`) — list of saved favourites with pagination.
- Compare breeds (`/cats/compare-breeds`) — select two breeds and compare their attributes.

Shared components live under `src/components` and feature-specific components are under `src/features/cats/components`.

## API routes (server)

The backend routes are implemented inside the app using Hono and are mounted under `/api/cats`. Implemented endpoints include:

- GET `/api/cats` - list images (supports `page`, `limit`, `order`, `breedId` query params)
- GET `/api/cats/:id` - get details for a single cat/image
- GET `/api/cats/breeds` - list breeds
- GET `/api/cats/breeds/:breedId` - breed details
- GET `/api/cats/favourites` - list favourite cats (paginated)
- POST `/api/cats/favourites` - add a cat to favourites
- GET `/api/cats/favourites/:catId` - get favourite entry for a given cat id
- DELETE `/api/cats/favourites/:favouriteId` - remove a favourite by its id

The server entry point for the API is `src/app/api/[[...route]]/route.ts` which mounts `src/features/cats/server/route.ts`.

## Services

- `src/services/api` contains the API service abstraction. The real implementation uses TheCatAPI (configurable via env), and a mock implementation is provided for local development/testing.
- Switch between real and mock API with the `IS_MOCK_API` environment variable.

## Important files

- `src/features/cats/api` — hooks for fetching cats, breeds, favourites, toggling favourites, and the compare-breeds hook
- `src/features/cats/server/route.ts` — Hono routes for the cats API
- `src/services/api/mock-api-service.ts` — mock responses used when `IS_MOCK_API=true`

## Environment variables

Create a `.env.local` and set the variables below when using the real API implementation:

- `THE_CAT_API_BASE_URL` - base URL for TheCatAPI
- `THE_CAT_API_KEY` - API key for TheCatAPI
- `NEXT_PUBLIC_CATS_LIMIT_PER_PAGE` - optional: limit per page used in the UI (defaults to 15)
- `IS_MOCK_API` - set to `true` to use the included mock API service

## Local development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Hono (in-app API routes)
- Axios
- sonner (toasts)
- lucide-react (icons)


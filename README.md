# Purrfect Gallery

A Next.js project showcasing a gallery of cats with sorting, pagination, and detailed cat information.

## Features

- Browse a gallery of cats with pagination.
- Sort cats dynamically by different criteria (Random, Ascending and Descending).
- View detailed information about the cats with breed.
- Used shadcn ui for the ui components (button, dropdown, badge & skeleton) - `src\components\ui`.
- Responsive layout for mobile and desktop.
- Skeleton loaders for smooth UX while data is fetching.
- Direct URL navigation, you can go to any page or sorting order by updating the URL query parameters (`?page=2&order=ASC`).

## UI Components Overview

### Navbar

- Displays the app title and simple navigation link to Home.

### Cat List

- Fetches cat data from API using useFetchCats hook.
- Supports sorting, pagination, and skeleton loaders.

### CatDetailsCard

- Fetches cat details from API using useFetchCatDetails hook.
- Shows detailed information about a cat: name, description, origin, and temperament badges.

## Backend API Routes

- Entry point - `[...routes]/route.ts`
- Used Hono framework for the backend.
- The api endpoints for the cats are here - `src\features\cats\server\route.ts`.
- There are two endpoints: GET `/api/cats` and GET `/api/cats/:id`
- The API Service and controller are defined here - `src\services\api`

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`
with your browser to see the result.

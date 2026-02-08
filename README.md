# Food Ordering System

A full-stack food ordering application built with React, Express, and Prisma.

## Tech Stack

### Frontend

- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- React Query (server state)
- React Hook Form + Zod (form validation)
- React Router (routing)

### Backend

- Express + TypeScript
- Prisma ORM (SQLite)
- Zod (request validation)
- Helmet + CORS + Rate Limiting

### Shared

- Zod schemas (single source of truth for types)
- TypeScript types inferred from schemas

## Project Structure

```
├── packages/shared/     # Shared Zod schemas & TypeScript types
├── backend/             # Express API server
│   ├── prisma/          # Database schema & seed
│   └── src/
│       ├── features/    # Feature modules (products, orders, admin)
│       └── shared/      # Config, middleware, utils
└── frontend/            # React SPA
    └── src/
        ├── components/  # Shared UI components
        ├── features/    # Feature modules (products, orders, admin)
        ├── hooks/       # Shared hooks
        └── services/    # API client
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
pnpm install
```

### Database Setup

```bash
cd backend
npx prisma db push
npx tsx prisma/seed.ts
```

### Development

```bash
# Run both frontend and backend
pnpm dev

# Or run individually
pnpm dev:backend    # Express on http://localhost:3001
pnpm dev:frontend   # Vite on http://localhost:5173
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
ADMIN_TOKEN="admin"
CORS_ORIGIN="http://localhost:5173"
```

## Features

- **Product Catalog**: Browse available food items with images and prices
- **Shopping Cart**: Add/remove items with quantity controls, persisted in localStorage
- **Order Placement**: Two-step form (select products → enter details) with validation
- **Admin Dashboard**: Token-protected panel to view all orders with expandable details

## Architecture

The backend follows a **feature-based architecture** with dependency injection via a composition root:

- **Controller** → handles HTTP request/response
- **Service** → business logic (price calculation, validation)
- **Repository** → data access (Prisma queries)

Each feature is self-contained with its own routes, controllers, services, and repositories.

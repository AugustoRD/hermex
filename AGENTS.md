# AGENTS.md

This file provides guidance to Antigravity when working with code in this repository.

## Project Overview

Hermex is a vehicle rental platform (locadora de veículos) built as a pnpm monorepo with two apps:
- `apps/api` — NestJS + GraphQL + Prisma backend
- `apps/web` — Next.js 16 + Tailwind CSS frontend

## Commands

All commands are run from the **monorepo root** unless noted.

### Development
```bash
pnpm web:dev        # Next.js dev server (http://localhost:3000)
pnpm api:dev        # NestJS watch mode (http://localhost:3001/graphql)
pnpm dev            # Run both web and api in parallel
```

### Build
```bash
pnpm web:build
pnpm api:build
pnpm build
```

### Linting
```bash
# API
pnpm --filter @hermex/api lint

# Web
pnpm --filter @hermex/web lint
```

### Testing (API only)
```bash
pnpm --filter @hermex/api test              # run all tests
pnpm --filter @hermex/api test:watch        # watch mode
pnpm --filter @hermex/api test:e2e          # e2e tests
# Run a single test file:
pnpm --filter @hermex/api exec jest src/vehicles/vehicles.resolver.spec.ts
```

### Database
```bash
pnpm db:up          # start postgres container (docker-compose)
pnpm db:down        # stop container
pnpm db:migrate     # run prisma migrate dev
pnpm db:generate    # regenerate prisma client
pnpm db:studio      # open Prisma Studio
```

## Architecture

### API (`apps/api`) — NestJS code-first GraphQL

- **GraphQL schema** is auto-generated at `src/schema.gql` from TypeScript decorators (`autoSchemaFile`).
- **Prisma client** is generated into `src/generated/prisma/` (not the default location). Import from there, not from `@prisma/client`.
- **Module structure**: each domain (e.g. `vehicles`) has its own NestJS module with a resolver and model. `PrismaModule` is shared globally.
- CORS is configured to allow `http://localhost:3000` only.
- Port: `3001` (configurable via `PORT` env var).

### Web (`apps/web`) — Next.js App Router

- Uses **Next.js 16** (App Router). See `apps/web/AGENTS.md` — this version has breaking changes; check `node_modules/next/dist/docs/` before writing code.
- Components follow **Atomic Design**: `atoms`, `molecules`, `organisms`, `templates` — all exported via barrel `index.ts` files in each folder.
- **Auth**: `next-auth` v5 beta is wired up in `src/auth.ts`; providers are not yet configured (TODO).

### Database

PostgreSQL 16 via Docker. Connection string must be set in `apps/api/.env` as `DATABASE_URL`. The docker-compose credentials are:
- user: `hermex`, password: `hermex_secret`, db: `hermex_dev`, port: `5432`

### Important Rules

- **Always use `pnpm install`** (or `pnpm add`) to install Node.js dependencies. NEVER edit `package.json` directly.

### Adding a new domain (API)

Follow the `vehicles` pattern:
1. Add model to `prisma/schema.prisma`
2. Run `pnpm db:migrate` and `pnpm db:generate`
3. Use `nest generate` (from `apps/api`) to scaffold module, resolver, and service instead of creating files manually
4. Wire up `PrismaService` in the generated resolver and import the module in `AppModule`

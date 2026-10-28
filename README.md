# TypeScript Monorepo Boilerplate

A production-ready Turborepo monorepo template with conditional CI using `ci-diff-changed`, shared packages, and zero-dep utilities.

## Structure

```
ts-monorepo-boilerplate/
├── packages/
│   ├── api/          # Hono API with resilient fetch & env validation
│   ├── shared/       # Shared types & utilities
│   └── web/          # React + Vite frontend
├── turbo.json        # Turborepo config
└── .github/workflows/ci.yml  # Conditional CI with ci-diff-changed
```

## Features

- 🏗 **Turborepo** — Smart builds, caching, parallel execution
- 🔁 **Conditional CI** — Only builds/tests changed packages via `ci-diff-changed`
- 🔁 **Resilient fetch** — `fetch-retry-jitter` with circuit breaker & deduplication
- ✅ **Typed env** — `env-assert-typed` with inference, `coerce`, `refine`, `transform`
- 📦 **Shared package** — Types & utilities shared across API & web
- 🏗 **Turborepo** — Smart caching, parallel builds, remote cache ready

## Quick Start

```bash
# Use this template
gh repo create my-monorepo --public --template Yearnless/ts-monorepo-boilerplate --clone

cd my-monorepo
npm install
npm run dev
```

## Structure

```
packages/
├── api/          # Hono API (port 3000)
│   ├── src/
│   └── package.json
├── shared/       # Shared types & utilities
│   └── src/
└── web/          # React + Vite frontend (port 5173)
    ├── src/
    └── vite.config.ts
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all dev servers (via Turborepo) |
| `npm run build` | Build all packages |
| `npm run test` | Run all tests |
| `npm run typecheck` | TypeScript check all packages |
| `npm run lint` | Lint all packages |

## Conditional CI

The GitHub Actions workflow uses `ci-diff-changed` to only build/test packages that actually changed:

```yaml
- uses: Yearnless/ci-diff-changed@v1
  with:
    base-ref: origin/main
    pattern: 'packages/(api|shared|web)/'
```

This means pushing a change to `packages/api` only runs CI for `api`, not `web` or `shared`.

## Packages

| Package | Description | Dependencies |
|---------|-------------|--------------|
| `@monorepo/api` | Hono API server | `hono`, `fetch-retry-jitter`, `env-assert-typed` |
| `@monorepo/shared` | Shared types & utils | — |
| `@monorepo/web` | React + Vite frontend | `react`, `react-dom`, `@monorepo/shared` |

## License

MIT

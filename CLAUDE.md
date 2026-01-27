# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev          # Start dev server on http://localhost:3000
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript validation
```

No unit test framework is configured. CI runs lint and typecheck only.

## Architecture Overview

This is a **Nuxt 4 dashboard application** using Vue 3 Composition API with TypeScript.

### Tech Stack
- **UI:** Nuxt UI 4 + Tailwind CSS 4 (green primary, zinc neutral theme)
- **Data Tables:** TanStack Table Core for advanced filtering/sorting/pagination
- **Charts:** Unovis (@unovis/vue)
- **Utilities:** VueUse, date-fns, Zod for validation
- **Package Manager:** pnpm

### Directory Structure

```
app/
├── pages/           # File-based routing (index, settings/*)
├── components/      # Organized by feature (home/, settings/)
├── composables/     # useDashboard.ts - keyboard shortcuts
├── types/           # TypeScript interfaces (User, Extension, Stat, Sale, etc.)
└── utils/           # Helper functions

server/api/          # Nitro API routes returning mock data
```

### Key Patterns

**Server/Client Component Split:** Components that need client-side only rendering use `.client.vue` / `.server.vue` suffix pattern (see `HomeChart`).

**Shared Composables:** `useDashboard()` uses `createSharedComposable()` from VueUse for keyboard shortcuts.

**Data Fetching:** Uses `useFetch()` with lazy loading for API calls.

**Form Validation:** `UForm` with Zod schemas for validation, `useToast()` for feedback.

**Keyboard Shortcuts:** Defined in `useDashboard.ts` - g-h (home), g-s (settings).

### API Routes

All endpoints in `server/api/` return hardcoded mock data:
- `extensions.ts` - AIAL extensions (installed on enterprise workstations)

### Business Concepts

- **Entreprise:** The company/organization using the dashboard
- **Extensions AIAL:** Browser extensions installed on workstations that report data back to the dashboard (identified by GUID)

### ESLint Rules

- No dangling commas
- 1tbs brace style
- Max 3 attributes per line (singleline)
- Multiple template roots allowed

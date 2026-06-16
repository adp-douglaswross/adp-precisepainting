# Implementation Plan: Painting Operations Platform

_Updated: 2026-06-16T21:53:40Z_

## Architecture Summary

- Frontend: Next.js App Router routes (`/`, `/mobile`, `/hq`).
- Auth: existing Entra/Auth.js integration.
- Platform integration: existing EAI BFF proxy (`/api/eai/[[...rest]]`).
- UX spine: 4-step painter workflow + 4-step HQ workflow.

## Phases

1. Route shell and navigation.
2. Painter 4-step interactive flow with AI guidance panel.
3. HQ 4-step interactive flow with 50-painter board + actions.
4. Tests and pipeline artifact completion.
5. Validation and evidence capture.

## Data Model (UI-level in this increment)

- Painter step status state.
- HQ step status state.
- Painter status board records (50 rows).
- Event logs for actions (message/reassign/AI assist).

## Contracts and Boundaries

- Keep `src/app/**/route.ts` export rules unchanged.
- Keep auth and BFF layers intact; UI can evolve independently.
- No non-EAI primary stack introduced.

## Verification Plan

- Run lint, typecheck, tests, build.
- Route response checks for `/`, `/mobile`, `/hq`.
- Produce screenshots under `visuals/` when host supports browser dependencies.

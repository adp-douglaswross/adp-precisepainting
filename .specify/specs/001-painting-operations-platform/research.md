---
date: 2026-06-16T21:20:00Z
researcher: Copilot CLI
feature: 'Painting Operations Platform'
status: complete
---

# Research: Painting Operations Platform

## Feature Summary

Precise Painting needs one Entra-authenticated EAI-integrated app with two routes: a 4-step mobile workflow for painters and a 4-step HQ workflow for dispatch, visibility, payroll, and invoicing.

## Goal Ledger Seed

Reference: `.specify/specs/001-painting-operations-platform/goal-ledger.json`.

- G1: quote-to-approval cycle reduction.
- G2: workforce control and cleaner timesheet/payroll quality.
- G3: faster invoicing closeout.

## Structured Discovery Output

### Problem Statement

- **Problem**: field and HQ operations are fragmented across manual flows.
- **Current State Friction**: duplicate entry, poor live visibility, delayed closeout.
- **Desired EnterpriseAI Outcome**: one operational system with AI-guided execution at each step.

### Target Persona

- **Primary Persona**: painter (field) and HQ coordinator (office).
- **Skill Level**: mixed novice/intermediate operational users.
- **Top Needs**: speed, visibility, fewer errors.
- **Constraints**: mobile usability, dispatch responsiveness, auditable closeout.

### Value Proposition

- **Primary Value**: time savings and operational reliability.
- **Measurable Goal**: 40% faster quote cycle, 60% fewer correction loops, 80% same-day invoices.
- **EnterpriseAI-First Rationale**: existing EAI app template, BFF proxy, resource hooks, and auth stack already present.
- **EAI Platform/Azure Stack Fit**: EAI data/workflow/chat patterns + Azure-backed identity/runtime already in scaffold.

## Global Market Best Practices

Benchmarked operating patterns used by leading field-service products (e.g., ServiceTitan, Jobber, Housecall Pro, simPRO, Tradify):

1. One field capture flow with offline-tolerant step progression.
2. HQ board with live status, dispatch controls, and standardized action states.
3. Quote/variation and timesheet/payroll tied to the same job lifecycle.
4. AI used as assistive copilot (prefill, validation, next-best action), not silent automation.
5. Closeout package generation from completed field evidence and approved variations.

### 2026-06-18 competitor UI notes (requested refresh pass)

- **Jobber scheduling** highlights rapid job assignment, interactive map routing, and minimal-click crew scheduling.
- **Tradify features** highlight job dashboards with interactive maps and quick photo/video attachment to job records.
- **Implication for Precise Painting UI**: keep map and evidence capture visible at the point of action, and prefill known fields (address/contact/type/material context) so users mostly review instead of entering data from scratch.

## Codebase Analysis

### Where to Implement

| Component | Location | Purpose |
| --- | --- | --- |
| Home route switchboard | `src/app/home-client.tsx` | Route entry links |
| Painter UI | `src/app/mobile/page.tsx` | 4-step painter journey |
| HQ UI | `src/app/hq/page.tsx` | 4-step HQ journey + 50 painter board |
| API BFF | `src/app/api/eai/[[...rest]]/handler.ts` | EAI proxy integration boundary |
| Auth/session | `src/auth.ts`, `src/middleware.ts` | Entra-auth shell and guardrails |

### Integration Points

1. Existing BFF proxy for EAI-backed workflow/data integration.
2. Existing hooks (`useResources`, `useChat`) for next data binding iteration.
3. Existing Next.js App Router shell for route delivery.

## Recommended Architecture Direction

Build route-first interactive UI slices (`/mobile`, `/hq`) now, then wire persistent resource-backed state and messaging APIs in incremental tasks while preserving App Router and EAI BFF conventions.

## Constraints & Considerations

- Preserve `route.ts` guardrail (HTTP exports only).
- Keep Entra auth surface unchanged while adding business UI flows.
- Known baseline type issue existed in `storage-provisioning` imports and was corrected by exporting missing types.

## Recommendations

1. Keep 4-step flow as explicit UX spine for both routes.
2. Maintain 50-painter status board in HQ as core operational primitive.
3. Keep AI interactions explicit and user-controlled in every step.

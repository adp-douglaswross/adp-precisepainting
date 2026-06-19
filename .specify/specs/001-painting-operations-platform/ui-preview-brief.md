# UI Preview Brief: Painting Operations Platform

## MVP Preview Scope

- Route 1: `/mobile` (painter workflow, 4 steps)
- Route 2: `/hq` (HQ workflow, 4 steps + 50 painter board)
- Route 3: `/` landing with route navigation cards
- Branding: Precise Painting logo visible on both `/mobile` and `/hq`

## Must-Have Screens

1. Painter step workflow with AI help and action controls.
2. HQ step workflow with AI help and action controls.
3. HQ painter board with message/reassign buttons and status filtering.
4. In-route map visibility for field/HQ decisions.
5. In-route photo capture/review surfaces.

## AI Interaction Expectations

- Every step has explicit AI assist action.
- AI output provides guidance/prefill/validation hints.
- Human user remains decision authority on final actions.
- Prefill defaults should reduce required typing and only request data that is unknown.

## Validation Evidence

- Render checks for `/`, `/mobile`, `/hq`.
- Unit interaction tests for `/mobile` and `/hq`.
- Screenshot capture into `visuals/` when browser dependencies are available.

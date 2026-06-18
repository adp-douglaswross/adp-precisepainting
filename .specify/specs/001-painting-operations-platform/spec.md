---
id: "001-painting-operations-platform"
title: "Painting Operations Platform"
status: "in"
created: "2026-06-16"
updated: "2026-06-18"
priority: "medium"
assignee: "engineer-agent"
---

# Feature Specification: Painting Operations Platform

**Feature Branch**: `001-painting-operations-platform`  
**Created**: 2026-06-16  
**Status**: In progress
**Updated**: 2026-06-16T21:52:40Z

## Goal Ledger Alignment

| Goal ID | Outcome | Metric / Target | Linked Stories | Linked Requirements |
| --- | --- | --- | --- | --- |
| G1 | Reduce quote-to-approved-job cycle | -40% cycle time | US1, US2 | FR-001, FR-002, FR-003 |
| G2 | Improve workforce control quality | -60% corrections, -25% idle travel | US2 | FR-004, FR-005 |
| G3 | Accelerate closeout and billing | >=80% same-day invoices | US3 | FR-006, FR-007 |

## User Stories

### US1 (P1): Painter mobile execution
Painter completes all onsite work in a 4-step mobile workflow with AI help at each step.

### US2 (P1): HQ operations command
HQ manages dispatch, map visibility, messaging, and reassignment with a 50-painter board.

### US3 (P2): Financial closeout
HQ finalizes timesheets/payroll readiness and produces invoice-ready output.

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide `/mobile` with 4 explicit painter steps.
- **FR-002**: System MUST provide interactive controls (buttons/inputs) for each painter step.
- **FR-003**: System MUST provide AI assist guidance in each painter step.
- **FR-004**: System MUST provide `/hq` with 4 explicit HQ steps.
- **FR-005**: System MUST display 50 painter records with status filtering and actions.
- **FR-006**: System MUST provide HQ message/reassign actions.
- **FR-007**: System MUST provide closeout interactions for timesheet/payroll/invoice readiness.
- **FR-008**: System MUST preserve Entra-auth and EAI integration boundaries.

## Acceptance Criteria

- **SC-001**: `/mobile` renders and step state changes are interactive.
- **SC-002**: `/hq` renders and 50 painter entries are visible.
- **SC-003**: AI assistance is visible in all 8 workflow steps (4 painter + 4 HQ).
- **SC-004**: Message and reassign actions update HQ event log.
- **SC-005**: Lint, typecheck, tests, and build pass.

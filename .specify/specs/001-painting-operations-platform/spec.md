# Feature Specification: Painting Operations Platform

**Feature Branch**: `001-painting-operations-platform`  
**Created**: 2026-06-16  
**Status**: In progress

## Objective

Deliver a single EAI-integrated application with two role routes:

1. Painter mobile route (`/mobile`) with 4 steps.
2. HQ desktop/iPad route (`/hq`) with 4 steps.

Both routes include AI assistance at every step, Entra-authenticated user access, and operational flow continuity from quote through invoicing.

## User Workflows (4 steps each)

### Painter workflow (`/mobile`)

1. Receive & Start Job
2. Quote/Variation + Materials
3. Execute + Time/Expense Tracking
4. Complete & Submit Closeout

### HQ workflow (`/hq`)

1. Intake & Approve Jobs
2. Dispatch / Map / Message / Reassign
3. Monitor Progress + Timesheets/Payroll
4. Invoice + Analytics Closeout

## Core Requirements

- 50 painter statuses visible and actionable in HQ.
- Buttons/fields/step actions interactive in both routes.
- AI assist action present in each workflow step.
- Route navigation links available between `/`, `/mobile`, and `/hq`.
- Entra-based auth shell and EAI integration remain in place.

## Acceptance Criteria

- `/mobile` renders 4-step interactive painter process.
- `/hq` renders 4-step interactive HQ process with 50 painter board.
- Messaging and reassignment UI actions are available in HQ.
- AI assistance guidance is visible in each step on both routes.

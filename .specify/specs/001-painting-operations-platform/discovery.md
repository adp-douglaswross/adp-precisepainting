---
feature: 'painting-operations-platform'
created: '2026-06-16T14:05:45Z'
discoveredBy: Copilot + User
status: complete
---

# Business Discovery: Painting Operations Platform

## Problem Statement

**Pain Point**: Precise Painting needs one connected field-to-HQ operating system instead of fragmented, manual site and office workflows.
**Current State**: Quoting, variations, materials planning, dispatching, timesheets, payroll, invoicing, and messaging are spread across manual steps.
**Impact**: Slow quote-to-job flow, rework, poor visibility, delayed invoicing, and avoidable coordination errors.

## Target Users

### Primary Users

- **Persona**: Internal team members (painters in the field and HQ staff)
- **Technical Level**: Mixed operational users (mobile-first field users + office coordinators/admins)
- **Key Needs**: Fast in-field data capture, clear assignment/messaging, live operational visibility, accurate payroll and invoicing

## Value Proposition

**Primary Value**: Time savings by reducing site-to-office admin and rework.
**Quantified Goal**: Improve end-to-end operational velocity while also improving quality, travel efficiency, and billing speed.

## Success Metrics

| Metric | Target | Measurement |
| --- | --- | --- |
| Quote-to-approved-job cycle time | -40% | Median elapsed time from quote creation to approval |
| Timesheet/payroll corrections | -60% | Corrections per pay cycle |
| Painter idle travel time | -25% | GPS-derived non-productive travel intervals |
| Same-day invoice issuance | >=80% | Completed jobs invoiced within same business day |
| Variation handling | Included | Track variation request-to-approval turnaround and rework rate |

## Competitive Analysis

**Status**: Researched (requested). Global competitor and best-practice analysis will be delivered in `/1_gofer_research`.

## Discovery Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Problem Focus | Unified painter-to-HQ operations | Directly matches user-stated business pain and scope |
| User Target | Internal painters + HQ operations | Core users who execute and coordinate work |
| Value Metric | Multi-metric operating improvement | User asked for all major outcomes, including variations |

## Application Classification

| Field | Decision |
| --- | --- |
| Classification | Application delivery |
| Reason | Durable mobile + HQ product with workflows, messaging, geolocation, auth, payroll, and invoicing |
| Four-step AI journey required | Yes |

## AI-Readable Blocks Bridge

| Field | Decision |
| --- | --- |
| Profile Choice | Internal |
| Package Lane | internal-app |
| Coupling Status | source-platform-coupled |
| Public-Readiness Target | deferred |
| Block Porting Need | reuse |


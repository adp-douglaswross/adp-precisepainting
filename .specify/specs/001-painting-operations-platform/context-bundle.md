# Context Bundle — painting-operations-platform

## Scenario Summary

Precise Painting needs one EAI-integrated application for 50 painters and HQ operations, covering quote/variation capture, map/location visibility, paint/material planning against purchased stock, messaging, reassignment, timesheets, payroll readiness, and centralized invoicing.

Current priority is a UI refresh that feels production-grade and branded: use the client logo across workflow routes, keep map context visible, enable fast photo capture, and prefill likely inputs so users type less.

## Confirmed Scope Signals

- App delivery (not non-app analysis)
- Two role-specific UI routes:
  - Painter mobile route: `/mobile`
  - HQ desktop/iPad route: `/hq`
- Authentication: Microsoft Entra for all users
- Messaging: required between HQ and painters
- AI: embedded in every step with assistive recommendations, validation, and human override/audit controls
- Branding: client logo sourced from `https://www.precisepainting.com.au/`
- Process constraints:
  - Painter workflow: 4 steps or fewer
  - HQ workflow: 4 steps or fewer

## Competitive UI Findings (Requested)

- **Jobber**: emphasizes map-based routing, drag/drop scheduling, and low-friction booking flow.
- **Tradify**: emphasizes photo/video capture attached to jobs plus map and dashboard visibility.
- **Field-service pattern consensus** (including ServiceTitan/Housecall Pro/simPRO category patterns): quick capture first, then AI-assisted dispatch and closeout with minimal manual data entry.

### UX Direction Chosen

1. Keep the existing 4-step structure for both routes.
2. Surface map context directly in-route (no extra navigation).
3. Add photo capture/upload where work evidence is created.
4. Pre-populate quote/dispatch fields and expose AI suggestions as editable defaults.

## Discovery Decisions

- Feature name: `painting-operations-platform`
- Problem focus: unified field-to-HQ operating system
- Primary users: painters + HQ team members
- Primary value: time savings (with quality/cost/velocity metrics also included)
- Competitive research: requested (global best-practice analysis required)

## EAI Preflight Summary

- Gofer workspace scaffold bootstrapped and present
- EAI CLI present (`3.2.6`) and current
- Login/tenant ready (`precisepainting`, tenant-admin)
- EAI project markers present and `eai verify` passed
- Some advanced CLI capability commands are not advertised in this version and will be treated as gated

## Routing Decision

- Pipeline route: `/1_gofer_research`
- Auto-chain target: research → specify → plan → tasks → implement → validate
- Research priority: global comparator scan + EAI-first architecture and UI/UX-first outputs

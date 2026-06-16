---
feature: 'Painting Operations Platform'
created: 2026-06-16T21:20:00Z
status: supporting_context
recommendedScenario: 'dual-route-operations'
recommendedArchitecture: 'app-router-ui-plus-eai-bff'
selectedOption: 'accepted'
approvedBy: 'user-requested-autopilot'
approvedAt: '2026-06-16T21:20:00Z'
---

# Proposal Review: Painting Operations Platform

## What We Found

The fastest path is to deliver two explicit role routes in the existing Next.js + EAI scaffold, with AI-guided step execution and HQ visibility/control over 50 painters.

## Business Scenarios Considered

| Scenario | User Value | Delivery Trade-off | Recommendation |
| --- | --- | --- | --- |
| Single blended route | Lower navigation complexity | Role overload and poor tablet/desktop fit | Defer |
| Dual route (`/mobile` + `/hq`) | Clear role UX and faster adoption | Two route surfaces to maintain | Adopt |

## Recommended Business Scenario

Adopt dual-route operations with a strict 4-step process per role and explicit AI assistance in every step.

## Technology Architecture Recommendation

Use App Router pages for route UX and keep EAI integration behind existing BFF/auth boundaries.

## Key Decisions and Why

- Two routes were selected to match field vs office context.
- 50-painter board is first-class in HQ for dispatch and control.
- AI remains assistive with human action confirmation.

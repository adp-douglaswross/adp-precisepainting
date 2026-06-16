# Requirement → Code → Test Traceability

| Requirement ID | User Story | Code Evidence | Test Evidence | Status |
| --- | --- | --- | --- | --- |
| FR-001 | US1 | `src/app/mobile/page.tsx` (4-step painter workflow) | `src/app/mobile/page.test.tsx` | PASS |
| FR-002 | US1 | `src/app/mobile/page.tsx` (interactive step controls/inputs) | `src/app/mobile/page.test.tsx` | PASS |
| FR-003 | US1 | `src/app/mobile/page.tsx` (`Ask AI Copilot` + AI hints) | `src/app/mobile/page.test.tsx` | PASS |
| FR-004 | US2 | `src/app/hq/page.tsx` (4-step HQ workflow) | `src/app/hq/page.test.tsx` | PASS |
| FR-005 | US2 | `src/app/hq/page.tsx` (50 painter board + filter) | `src/app/hq/page.test.tsx` | PASS |
| FR-006 | US2 | `src/app/hq/page.tsx` (`Message` + `Reassign` actions) | `src/app/hq/page.test.tsx` | PASS |
| FR-007 | US3 | `src/app/hq/page.tsx` (closeout action step) | `src/app/hq/page.test.tsx` | PASS |
| FR-008 | US1/US2/US3 | `src/auth.ts`, `src/middleware.ts`, `src/app/api/eai/[[...rest]]/handler.ts` | Existing auth/proxy tests | PASS |
| SC-001 | US1 | `src/app/mobile/page.tsx` | `src/app/mobile/page.test.tsx` | PASS |
| SC-002 | US2 | `src/app/hq/page.tsx` | `src/app/hq/page.test.tsx` | PASS |
| SC-003 | US1/US2 | `src/app/mobile/page.tsx`, `src/app/hq/page.tsx` | `src/app/mobile/page.test.tsx`, `src/app/hq/page.test.tsx` | PASS |
| SC-004 | US2 | `src/app/hq/page.tsx` | `src/app/hq/page.test.tsx` | PASS |
| SC-005 | US3 | `src/app/mobile/page.tsx`, `src/app/hq/page.tsx` | CI check outputs (`lint`,`typecheck`,`test`,`build`) | PASS |

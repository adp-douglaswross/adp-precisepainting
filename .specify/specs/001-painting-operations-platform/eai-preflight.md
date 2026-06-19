| Field | Required Content |
| ----- | ---------------- |
| CLI install | `eai` available at version `3.2.6`; install not required |
| CLI release status | `eai update --check` reports upgrade available: `3.2.6 -> 3.2.9` (`upgrade_required`) |
| CLI capability source | `eai --describe` executed on 2026-06-18; command metadata available for tenant/auth/core flows |
| Login status | Login profile present, but token is expired (`run eai login`) |
| Tenant readiness | Active tenant remains `precisepainting` (`b82f5fe9-650c-0f63-37aa-6c6ec3c2ce2a`); tenant selection exists but auth refresh is required before remote operations |
| Template readiness | Repo is already initialized from EAI app template markers (`src/eai.config/object-types.ts`, `src/eai.config/register.ts`, `.env.example`, `.npmrc`, `package.json`) |
| Drift readiness | Gofer scaffold partially missing two required references: `.specify/references/platform/eai-repo-contract.md`, `.specify/references/platform/eai-error-catalog.yaml` |
| App enrollment | Existing initialized app context present; no new remote enrollment action taken during this stage |
| Block catalog readiness | Not evaluated in this pass due expired auth token |
| App stack policy | EAI Platform including app template first; Azure second; no non-EAI primary stack exception requested |
| Next action | Continue local UI delivery now; before tenant-aware EAI actions, refresh auth with `eai login` and repair missing Gofer reference files |

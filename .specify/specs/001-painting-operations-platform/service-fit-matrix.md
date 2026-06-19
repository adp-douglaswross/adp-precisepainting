# Service Fit Matrix

| Desired capability | Evidence source | Fit status | Direction |
| --- | --- | --- | --- |
| Route-level painter workflow UX | `src/app/mobile/page.tsx` | Accessible now | Keep in app route |
| Route-level HQ workflow UX | `src/app/hq/page.tsx` | Accessible now | Keep in app route |
| Job drill-in and job separation UX | Mobile/HQ page implementations and tests | Accessible now | Keep in app route |
| AI assist prompts and guidance | Mobile/HQ in-route AI hint surfaces | Accessible now | Keep in app route |
| EAI integration boundary | `src/app/api/eai/[[...rest]]/route.ts`, middleware/auth setup | Accessible now | Preserve boundary |
| Deployment/runtime substrate | EAI app template + Azure-aligned config | Accessible now | Continue EAI + Azure path |

No non-EAI primary runtime exception is introduced in this iteration.

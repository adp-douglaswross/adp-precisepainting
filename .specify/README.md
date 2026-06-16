# Gofer - Specification Directory

This folder contains project specifications for AI-driven feature development.

## Structure

- **memory/** - Constitution, decisions, and project principles
- **commands/** - Canonical Gofer command definitions
- **specs/** - Feature specifications
- **templates/** - Templates for specs, plans, tasks, and reviews
- **scripts/** - Helper scripts for workflow automation
- **logs/** - Runtime logs and diagnostics

## AI Terminal Commands

- Claude CLI: `/0_business_scenario`
- Codex CLI: ask Codex to use the relevant Gofer skill from `.agents/skills/`
- Gemini CLI: `/gofer:1_gofer_research`
- GitHub Copilot: prompts are in `.github/prompts`; CLI skills are in `.github/skills`

All artifacts are stored in `.specify/specs/{feature}/`.

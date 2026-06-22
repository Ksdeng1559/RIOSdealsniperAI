# Model Workspace Protocol (MWP)

## Purpose

Model Workspace Protocol is the repository execution method for DealSniperAI.

RIOS defines the business/intelligence architecture.

ICM defines the reasoning method.

MWP defines the workspace structure that lets one AI coding agent execute the build sequentially with human review gates.

```text
RIOS = What the system does
ICM  = How the system thinks
MWP  = How the build is organized
```

---

# Core Idea

Instead of requiring a complex multi-agent orchestration framework for a sequential build, MWP uses the filesystem as the orchestration layer.

Numbered folders represent stages.

Markdown files carry prompts, context, requirements, and handoff notes.

Local scripts handle mechanical work that does not require AI reasoning.

A single AI coding agent can then read the right files at the right moment and perform the correct role.

---

# DealSniperAI MWP Flow

```text
/workspaces
  /00_intake
  /01_research
  /02_context
  /03_signal_mapping
  /04_scoring
  /05_storage
  /06_api
  /07_workflows
  /08_dashboard
  /09_review
```

Each workspace should contain:

```text
README.md          Stage objective and instructions
context.md         Inputs and constraints
prompt.md          Role prompt for Claude Code / Codex
acceptance.md      Done criteria
handoff.md         Output summary for the next stage
```

---

# Human Review Gates

MWP assumes sequential progress with review points.

Required review gates:

1. After signal taxonomy changes.
2. After scoring model changes.
3. After database schema changes.
4. After API contract changes.
5. Before enabling any CRM or external communication workflow.

Phase 1 remains store-and-score only.

---

# What Belongs in Markdown

Use markdown for:

- Role instructions
- Product requirements
- Technical requirements
- Context summaries
- Prompt templates
- Acceptance criteria
- Handoff notes
- Human review notes

---

# What Belongs in Scripts

Use local scripts for mechanical work:

- JSON validation
- Sample payload tests
- SQL migration checks
- TypeScript unit tests
- Schema formatting
- n8n workflow export/import helpers
- Scoring regression checks

Do not use AI for mechanical tasks when a deterministic script can do the work.

---

# MWP Execution Rule

Claude Code / Codex should only operate inside the current numbered workspace unless explicitly instructed to update shared source files.

At the end of a stage, the agent must write a `handoff.md` summary that includes:

- What changed
- Files touched
- Tests run
- Open risks
- Next recommended step

---

# Relationship to RIOS and ICM

MWP does not replace RIOS or ICM.

It operationalizes them.

For every workspace:

```text
Research workspace → collect inputs
Context workspace → apply ICM
Signal workspace → structure intelligence
Scoring workspace → calculate API/DQS/VCS/ARI
Execution workspace → store, display, and route actions
```

---

# Final Statement

DealSniperAI should use MWP to reduce engineering overhead during sequential AI-assisted development.

The filesystem becomes the orchestration layer.

Markdown becomes the context carrier.

Scripts handle deterministic mechanics.

Claude Code / Codex performs the reasoning and implementation one stage at a time.

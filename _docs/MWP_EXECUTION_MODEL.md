# MWP Execution Model

# RIOS DealSniperAI

## Purpose

This document defines how Model Workspace Protocol is used to implement DealSniperAI with Claude Code or Codex.

MWP replaces unnecessary framework-level orchestration for this build with a filesystem-based execution structure.

The build is sequential.

A human can review each stage before the next stage begins.

---

# Architecture Relationship

```text
RIOS = Business intelligence architecture
ICM  = Reasoning method
MWP  = Build orchestration method
```

## Combined Flow

```text
RIOS: Research → Intelligence → Opportunity → Strategy → Execution
ICM:  Data → Context → Signal → Interpretation → Score → Action
MWP:  00_intake → 01_research → 02_context → 03_signal_mapping → 04_scoring → 05_storage → 06_api → 07_workflows → 08_dashboard → 09_review
```

---

# Why MWP Fits DealSniperAI

DealSniperAI does not need a heavy multi-agent framework for Phase 1.

Phase 1 is a sequential workflow:

```text
Define context
Map signals
Build scoring
Store records
Expose API
Display result
Review output
```

A single AI coding agent can perform these steps when the repository gives it the right context files at the right time.

---

# Workspace Standard

Each numbered workspace should contain:

```text
README.md
context.md
prompt.md
acceptance.md
handoff.md
```

## README.md

Defines the stage objective.

## context.md

Contains the relevant requirements, inputs, and constraints for that stage.

## prompt.md

Tells Claude Code / Codex what role to play.

## acceptance.md

Defines done criteria.

## handoff.md

Summarizes output for the next stage.

---

# Required Workspaces

```text
_workspaces/00_intake
_workspaces/01_research
_workspaces/02_context
_workspaces/03_signal_mapping
_workspaces/04_scoring
_workspaces/05_storage
_workspaces/06_api
_workspaces/07_workflows
_workspaces/08_dashboard
_workspaces/09_review
```

---

# Build Rules

1. Work one numbered workspace at a time.
2. Read that workspace's `README.md`, `context.md`, and `prompt.md` before coding.
3. Use deterministic scripts for mechanical work.
4. Use AI reasoning for interpretation, architecture, code generation, and review.
5. Write a `handoff.md` before moving to the next workspace.
6. Do not skip human review gates.
7. Do not enable external owner communication in Phase 1.

---

# Human Review Gates

Human review is required before:

- Changing scoring weights.
- Changing signal taxonomy.
- Changing database schema.
- Enabling CRM writeback.
- Creating owner-facing drafts.
- Sending any external communication.

---

# Recommended Local Scripts

Future scripts should live in:

```text
_scripts/
```

Suggested scripts:

```text
validate-payload.ts
run-score-sample.ts
check-schema.sql
export-n8n-workflow.ts
score-regression.ts
```

---

# Phase 1 MWP Success Definition

Phase 1 is complete when:

- The sample payload is ingested.
- Signals are mapped.
- API, DQS, VCS, and ARI are calculated.
- Scores are stored.
- A profile can be viewed.
- Review checklist passes.
- No external owner communication occurs.

---

# Final Statement

MWP makes DealSniperAI easier to build because it turns the repository into the orchestration system.

The AI agent does not need to remember the whole project at once.

It only needs to read the current workspace and produce the next verified artifact.

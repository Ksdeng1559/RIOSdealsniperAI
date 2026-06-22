# CLAUDE.md

## Project

RIOS DealSniperAI — Business Acquisition Intelligence Platform.

## Mission

Build a system that discovers local businesses, identifies acquisition signals, scores deal attractiveness, stores structured intelligence, and prepares reviewable owner-conversation drafts without automatically sending messages in Phase 1.

## Architecture Standard

All technical requirements are based on three connected methods:

```text
RIOS = Research → Intelligence → Opportunity → Strategy → Execution
ICM  = Data → Context → Signal → Interpretation → Score → Action
MWP  = Numbered filesystem workspaces with markdown context and review gates
```

RIOS defines the business intelligence architecture.

ICM defines the reasoning flow.

MWP defines the build execution method for Claude Code / Codex.

Claude Code must not build this as a simple scraper or static scoring tool. Every scoring path must preserve raw data, evidence, interpreted signal, confidence, and recommended action.

## Model Workspace Protocol Requirement

This repository uses Model Workspace Protocol for sequential AI-assisted development.

Claude Code / Codex must work through `_workspaces/` in numbered order unless Dennis explicitly says otherwise:

```text
00_intake
01_research
02_context
03_signal_mapping
04_scoring
05_storage
06_api
07_workflows
08_dashboard
09_review
```

Each workspace should be treated as the current execution context.

Before coding in a stage, read that workspace's files.

At the end of a stage, create or update `handoff.md` with:

- what changed
- files touched
- tests run
- open risks
- next recommended step

## Read Order

Claude Code must read these files before implementing:

1. `CLAUDE.md`
2. `README.md`
3. `IMPLEMENTATION_PLAN.md`
4. `_docs/TAD.md`
5. `_docs/PRODUCT_DEFINITION.md`
6. `_docs/TECHNICAL_REQUIREMENTS_RIOS.md`
7. `_docs/MWP_EXECUTION_MODEL.md`
8. `_context/rios-framework.md`
9. `_context/interpretive-contextual-method.md`
10. `_context/model-workspace-protocol.md`
11. `_context/deal-signals.md`
12. `_context/scoring-models.md`
13. `_workspaces/README.md`
14. `_workspaces/00_intake/README.md`
15. `_supabase/schema.sql`
16. `_api/fastapi-contract.md`
17. `_workflows/workflow-001-business-scored.md`
18. `_src/scoring/dealScoring.ts`
19. `_prompts/hermes-workers.md`
20. `_tests/payloads/business-scored.sample.json`
21. `_tests/ACCEPTANCE_CHECKLIST.md`

## Non-Negotiable Build Rules

- Use TypeScript strict mode for application code.
- Keep logic files under 350 lines.
- Use full debug logging for ingestion, scoring, and workflow handoffs.
- Do not send owner outreach automatically in Phase 1.
- Store evidence and confidence for every score.
- Store raw payloads for auditability.
- Store interpreted signals separately from raw data.
- Do not infer owner age as fact. Use age ranges only when evidence exists.
- Treat low digital readiness as value creation potential, not automatic acquisition quality.
- Strong reputation matters more than distress.
- Best targets are strong businesses with weak systems and likely succession/exit pressure.
- Never jump from raw data directly to recommended action.
- Always follow: Data → Context → Signal → Interpretation → Score → Action.
- Use deterministic scripts for mechanical tasks where possible.
- Use the filesystem workspace as the orchestration layer.

## Phase 1 Scope

Build only:

1. Supabase schema.
2. FastAPI ingest and score endpoints.
3. Scoring functions: `calculateAPI`, `calculateDQS`, `calculateVCS`, `classifyDeal`.
4. n8n webhook specification for `business.scored`.
5. Dashboard placeholders/routes.
6. Test payloads.

## Phase 1 Exclusions

Do not build yet:

- Automated email sending.
- Broker integrations.
- Payment/Stripe logic.
- Full marketplace.
- Aggressive acquisition outreach.

## Core Output

Every business should produce:

```json
{
  "business_id": "uuid",
  "api_score": 0,
  "dqs_score": 0,
  "vcs_score": 0,
  "ari_score": 0,
  "classification": "Watchlist | Warm Opportunity | Hot Acquisition Candidate | A+ Acquisition Candidate",
  "primary_signal": "string",
  "confidence": 0.0,
  "recommended_action": "string"
}
```

## Required Signal Shape

Every interpreted signal should follow this structure:

```json
{
  "signal_type": "succession",
  "signal_name": "owner_mentioned_in_reviews",
  "source": "google_reviews",
  "evidence": "Multiple reviews mention owner by name",
  "interpretation": "Customer trust may be tied to owner involvement",
  "severity": "HIGH",
  "confidence": 0.78
}
```

## Implementation Style

- Prefer simple, modular architecture.
- Create small utility functions for each score category.
- Validate inputs before scoring.
- Use typed interfaces.
- Store raw payloads for auditability.
- Make scoring weights configurable.
- Make score outputs explainable.
- Keep ICM logic visible in code comments and function names where possible.
- Keep MWP stage handoffs current.

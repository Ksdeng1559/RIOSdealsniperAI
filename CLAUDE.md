# CLAUDE.md

## Project

RIOS DealSniperAI — Business Acquisition Intelligence Platform.

## Mission

Build a system that discovers local businesses, identifies acquisition signals, scores deal attractiveness, stores structured intelligence, and prepares owner outreach without automatically sending messages in Phase 1.

## Read Order

Claude Code must read these files before implementing:

1. `CLAUDE.md`
2. `IMPLEMENTATION_PLAN.md`
3. `_docs/TAD.md`
4. `_context/rios-framework.md`
5. `_context/deal-signals.md`
6. `_context/scoring-models.md`
7. `_supabase/schema.sql`
8. `_api/fastapi-contract.md`
9. `_workflows/workflow-001-business-scored.md`
10. `_tests/payloads/business-scored.sample.json`

## Non-Negotiable Build Rules

- Use TypeScript strict mode for application code.
- Keep logic files under 350 lines.
- Use full debug logging for ingestion, scoring, and workflow handoffs.
- Do not send owner outreach automatically in Phase 1.
- Store evidence and confidence for every score.
- Do not infer owner age as fact. Use age ranges only when evidence exists.
- Treat low digital readiness as value creation potential, not automatic acquisition quality.
- Strong reputation matters more than distress.
- Best targets are strong businesses with weak systems and likely succession/exit pressure.

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

## Implementation Style

- Prefer simple, modular architecture.
- Create small utility functions for each score category.
- Validate inputs before scoring.
- Use typed interfaces.
- Store raw payloads for auditability.
- Make scoring weights configurable.

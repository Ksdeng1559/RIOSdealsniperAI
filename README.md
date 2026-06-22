# RIOS DealSniperAI

## Business Acquisition Intelligence Platform

RIOS DealSniperAI is the acquisition intelligence layer for LeadSniperAI. It converts public local-business signals into off-market acquisition intelligence using the RIOS framework:

```text
Research → Intelligence → Opportunity → Strategy → Execution
```

The platform identifies businesses that may be strong acquisition candidates before they appear on broker marketplaces.

---

# Claude Code / Codex Implementation Guide

This repository is structured so Claude Code, Codex, or another AI coding agent can turn the product architecture into working software with minimal ambiguity.

The goal is not to build a generic lead generation tool.

The goal is to build a system that answers:

```text
Which local businesses are likely acquisition candidates?
Which ones are worth pursuing?
Where can RIOS create value after acquisition?
What should Dennis do next?
```

---

# Start Here

Claude Code or Codex should read the files in this exact order:

```text
1. README.md
2. CLAUDE.md
3. IMPLEMENTATION_PLAN.md
4. _docs/TAD.md
5. _docs/PRODUCT_DEFINITION.md
6. _context/rios-framework.md
7. _context/deal-signals.md
8. _context/scoring-models.md
9. _supabase/schema.sql
10. _api/fastapi-contract.md
11. _workflows/workflow-001-business-scored.md
12. _src/scoring/dealScoring.ts
13. _prompts/hermes-workers.md
14. _tests/payloads/business-scored.sample.json
15. _tests/ACCEPTANCE_CHECKLIST.md
```

---

# Product Summary

DealSniperAI extends LeadSniperAI from:

```text
Who needs digital help?
```

into:

```text
Who may be ready for ownership transition?
Who is worth acquiring?
Who has strong reputation but weak systems?
```

The platform scores every business across four dimensions:

| Score | Name | Purpose |
|---|---|---|
| API | Acquisition Probability Index | Likelihood of owner transition within 3–5 years |
| DQS | Deal Quality Score | Whether the business is desirable to acquire |
| VCS | Value Creation Score | Upside from systems, automation, RevOps, and AI |
| ARI | AI Readiness Index | Digital/automation weakness inherited from LeadSniperAI |

---

# Core Architecture

```text
LeadSniperAI / Google Business Profile Discovery
        ↓
Business Scored Event
        ↓
n8n Workflow 001
        ↓
DealSniper Signal Mapper
        ↓
API / DQS / VCS / ARI Scoring
        ↓
Hermes / RIOS Intelligence Workers
        ↓
Supabase Deal Profile
        ↓
Dashboard / CRM / Watchlist
```

---

# MVP Build Objective

Build Phase 1 first.

Phase 1 must ingest, score, classify, store, and display acquisition candidates.

It must not perform external owner communication automatically.

## Phase 1 Deliverables

1. Supabase schema from `_supabase/schema.sql`.
2. FastAPI endpoints from `_api/fastapi-contract.md`.
3. TypeScript scoring functions from `_src/scoring/dealScoring.ts`.
4. n8n webhook workflow from `_workflows/workflow-001-business-scored.md`.
5. Test using `_tests/payloads/business-scored.sample.json`.
6. Dashboard placeholders for DealSniper profiles and watchlist.

---

# Required System Outputs

Every scored business should produce this output shape:

```json
{
  "business_id": "uuid",
  "api_score": 88,
  "dqs_score": 84,
  "vcs_score": 91,
  "ari_score": 32,
  "classification": "A+ Acquisition Candidate",
  "primary_signal": "Strong reputation with likely owner dependency and weak systems",
  "confidence": 0.78,
  "recommended_action": "Create acquisition brief and add to hot deal pipeline"
}
```

---

# Classification Logic

```text
A+ Acquisition Candidate:
API >= 80 AND DQS >= 80 AND VCS >= 75

A Strategic Opportunity:
API >= 70 AND DQS >= 70

B Watchlist:
API >= 50

C Low Priority:
API < 50
```

---

# Target MVP Verticals

Prioritize local service businesses where acquisition arbitrage is strongest:

- Accounting firms
- Bookkeeping firms
- HVAC
- Plumbing
- Electrical
- Commercial cleaning
- Property management
- Pest control
- Restoration companies
- Insurance agencies
- Mortgage brokerages
- Independent financial advisors

The best targets are not distressed businesses.

The best targets usually have:

```text
Strong reputation
+ Owner dependency
+ Weak systems
+ Succession risk
+ Value creation upside
```

---

# Repository Structure

```text
_docs/                  Product, technical, and implementation docs
_context/               Standing context files Claude Code should read first
_workflows/             n8n workflow specifications
_supabase/              SQL schema and RLS policies
_api/                   FastAPI endpoint specifications
_src/scoring/           Scoring algorithm reference implementation
_prompts/               Hermes worker prompts
_tests/                 Test payloads and acceptance checks
CLAUDE.md               Master Claude Code instruction file
IMPLEMENTATION_PLAN.md  Build sequence for Claude Code / Codex
.env.example            Required environment variables
```

---

# Implementation Rules for Claude Code / Codex

Follow these rules when modifying this repository:

1. Use TypeScript strict mode for application code.
2. Keep logic files under 350 lines.
3. Use small, composable modules.
4. Validate all inbound payloads.
5. Store raw payloads for auditability.
6. Store source evidence and confidence for every signal.
7. Do not state owner age as fact unless directly provided by a verified source.
8. Use confidence ranges for inferred signals.
9. Treat low digital readiness as value creation potential, not automatic acquisition quality.
10. Strong reputation matters more than distress.
11. Phase 1 stores and scores only.
12. Any owner-facing message must remain a reviewable draft unless a human explicitly approves later.

---

# Suggested Build Order

## Step 1 — Project Setup

- Confirm whether this repo should become a Next.js app or remain a module library.
- Add package manager files if missing.
- Add TypeScript config.
- Add linting and formatting.

## Step 2 — Supabase

- Apply `_supabase/schema.sql`.
- Add RLS policies appropriate to the deployed app.
- Create repository-level Supabase client helpers.

## Step 3 — Scoring Engine

- Promote `_src/scoring/dealScoring.ts` into the actual application source path.
- Add unit tests.
- Validate against `_tests/payloads/business-scored.sample.json`.

## Step 4 — API Layer

- Implement:
  - `POST /dealsniper/ingest`
  - `POST /dealsniper/score`
  - `GET /dealsniper/profile/{business_id}`
  - `POST /dealsniper/brief`

## Step 5 — n8n Bridge

- Build Workflow 001 from `_workflows/workflow-001-business-scored.md`.
- Connect LeadSniperAI `business.scored` event to DealSniper ingest.

## Step 6 — Dashboard

Create basic views:

```text
/dealsniper
/dealsniper/[business_id]
/dealsniper/watchlist
```

## Step 7 — Acceptance Testing

Run through `_tests/ACCEPTANCE_CHECKLIST.md`.

---

# Environment Variables

Copy `.env.example` into the runtime environment and configure:

```text
Supabase
Hermes / RIOS API
n8n
Tavily
Bright Data
DataForSEO
CRM
Slack
OpenRouter
```

Do not commit live secrets.

---

# Phase 1 Test Payload

Use:

```text
_tests/payloads/business-scored.sample.json
```

Expected result:

```text
Business is ingested
Signals are mapped
Scores are calculated
Classification is returned
Record is stored in Supabase
No external owner message is sent
```

---

# Guardrails

DealSniperAI should avoid false certainty.

Use language like:

```text
likely
possible
estimated
signal suggests
confidence: 0.72
```

Avoid language like:

```text
owner is retiring
owner is distressed
business is for sale
owner age is X
```

unless directly verified.

---

# Development Philosophy

Build simple first.

The first working version should do only four things well:

```text
Ingest business
Map signals
Score opportunity
Store result
```

Everything else comes after the scoring loop works.

---

# Final Architecture Statement

LeadSniperAI discovers businesses.

DealSniperAI scores acquisition probability.

RIOS interprets opportunity.

Hermes generates intelligence.

n8n orchestrates workflows.

Supabase stores the acquisition graph.

The result is a proprietary off-market business acquisition pipeline.

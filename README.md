# RIOS DealSniperAI

## Business Acquisition Intelligence Platform

RIOS DealSniperAI is the acquisition intelligence layer for LeadSniperAI. It converts public local-business signals into off-market acquisition intelligence using the RIOS framework:

```text
Research → Intelligence → Opportunity → Strategy → Execution
```

The platform identifies businesses that may be strong acquisition candidates before they appear on broker marketplaces.

## Core Objective

Answer four questions for every local business:

1. Is this owner likely to exit?
2. Is this business worth acquiring?
3. Can RIOS create value after acquisition?
4. What is the best next action?

## Scoring Models

| Score | Name | Purpose |
|---|---|---|
| API | Acquisition Probability Index | Likelihood of owner transition within 3–5 years |
| DQS | Deal Quality Score | Whether the business is desirable to acquire |
| VCS | Value Creation Score | Upside from systems, automation, RevOps, and AI |
| ARI | AI Readiness Index | Digital/automation weakness inherited from LeadSniperAI |

## Target MVP Verticals

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

## Repository Structure

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
IMPLEMENTATION_PLAN.md  Build sequence for Claude Code
```

## Claude Code Start Point

Open `CLAUDE.md` first, then follow `IMPLEMENTATION_PLAN.md`.

Phase 1 must not send outreach automatically. It should only ingest, score, classify, store, and display acquisition candidates.

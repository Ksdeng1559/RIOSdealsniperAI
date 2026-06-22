# Implementation Plan

## RIOS DealSniperAI

This plan converts the Technical Architecture Document into a Claude Code execution sequence.

## Phase 0 — Repository Preparation

Goal: create the project structure and anchor documentation.

Tasks:

- Confirm app framework or initialize Next.js if repository is empty.
- Add folders for docs, context, workflows, Supabase, API contracts, scoring, prompts, and tests.
- Confirm environment variables required by Supabase, n8n, Hermes, and CRM writeback.

Done when Claude Code can read this repository and understand the build sequence without external context.

## Phase 1 — Core Ingest and Scoring MVP

Goal: receive a `business.scored` payload, store the business, calculate DealSniper scores, classify the opportunity, and return structured output.

Build items:

1. Supabase tables from `_supabase/schema.sql`.
2. Types/interfaces for business, signals, scores, and scoring output.
3. Scoring functions:
   - `calculateAPI()`
   - `calculateDQS()`
   - `calculateVCS()`
   - `calculateARI()` or accept inherited ARI
   - `classifyDeal()`
4. FastAPI endpoints from `_api/fastapi-contract.md`.
5. n8n Workflow 001 specification.
6. Test with `_tests/payloads/business-scored.sample.json`.

Done when a sample business can be ingested, scored, classified, and stored with evidence.

## Phase 2 — Enrichment Layer

Goal: add research enrichment for owner, market, technology, reputation, and succession signals.

Build items:

- Tavily research request template.
- Website scan placeholder.
- Owner profile extraction.
- Signal confidence scoring.
- Update `deal_signals` and `owner_profiles` tables.

Done when a business profile contains evidence-backed acquisition signals.

## Phase 3 — Hermes / RIOS Workers

Goal: generate acquisition thesis, value creation plan, and recommended action.

Build items:

- W7 Exit Intelligence prompt.
- W8 Deal Intelligence prompt.
- W6 Value Creation Intelligence prompt.
- W4 Narrative Intelligence prompt.
- Store output in `acquisition_briefs`.

Done when the system can produce a concise acquisition brief for each qualified business.

## Phase 4 — CRM and Watchlist

Goal: write qualified opportunities into a CRM and maintain watchlists.

Build items:

- CRM contact/company mapping.
- Watchlist pipeline stage mapping.
- Slack alert for hot opportunities.
- Quarterly rescoring workflow.

Done when A+ and A opportunities route into a deal pipeline, and B opportunities route to a watchlist.

## Phase 5 — Outreach Drafting

Goal: create owner conversation drafts for human review.

Build items:

- Owner introduction template.
- Succession planning conversation template.
- Partnership-first template.
- Quality review gate.
- Draft storage in `outreach_log`.

Done when the system generates reviewable drafts for Dennis.

## Acceptance Criteria

- Phase 1 stores and scores only.
- Every score includes a confidence level.
- Every high-confidence signal includes source evidence.
- Scoring output is deterministic for the same payload.
- Logic files stay under 350 lines.
- All endpoints validate input.
- All workflows log success and error states.

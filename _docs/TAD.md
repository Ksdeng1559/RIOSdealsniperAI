# Technical Architecture Document

# DealSniperAI

## Purpose

DealSniperAI extends LeadSniperAI from lead discovery into business acquisition intelligence.

Primary flow:

```text
Google Business Profile discovery
→ LeadSniperAI business scoring
→ DealSniper signal mapper
→ Acquisition scoring
→ Hermes / RIOS enrichment
→ Supabase deal profile
→ CRM pipeline / watchlist
```

## Core Architecture

| Layer | System | Responsibility |
|---|---|---|
| Discovery | LeadSniperAI | Find and score local businesses |
| Bridge | n8n | Receive score events and transform payloads |
| Intelligence | Hermes / RIOS | Run acquisition, exit, and value creation workers |
| Storage | Supabase | Store business, signal, score, and brief records |
| UI | Next.js | Display profiles, scores, watchlists, and deal pipeline |
| CRM | GHL or equivalent | Manage owner relationships and follow-up |

## Main Outputs

Every scored business should produce:

- Business profile
- Owner profile when available
- Deal signals with confidence
- API score
- DQS score
- VCS score
- ARI score
- Classification
- Recommended next action
- Acquisition brief when qualified

## Classification

| Classification | Rule | Action |
|---|---|---|
| A+ Acquisition Candidate | API >= 80, DQS >= 80, VCS >= 75 | Hot pipeline |
| A Strategic Opportunity | API >= 70, DQS >= 70 | Relationship development |
| B Watchlist | API >= 50 | Monitor quarterly |
| C Low Priority | API < 50 | Store only |

## Technical Constraints

- Scores must be evidence-backed.
- Use confidence levels for extracted signals.
- Low digital readiness does not equal high deal quality.
- Strong reputation plus weak systems is preferred over severe distress.
- Build with review gates before any external owner communications.

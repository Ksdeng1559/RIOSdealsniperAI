# Technical Requirements Based on RIOS Architecture

# RIOS DealSniperAI

## Purpose

This document defines the technical requirements for DealSniperAI based on the RIOS architecture and the Interpretive Contextual Method (ICM).

RIOS is the operating architecture:

```text
Research → Intelligence → Opportunity → Strategy → Execution
```

ICM is the reasoning method inside the architecture:

```text
Data → Context → Signal → Interpretation → Score → Action
```

DealSniperAI must be built as an interpretive intelligence system, not a simple lead scraper or static scoring tool.

---

# 1. Research Layer Requirements

## Objective

Collect business data from public and connected sources.

## Required Capabilities

- Receive `business.scored` events from LeadSniperAI.
- Store raw business payloads.
- Support Google Business Profile data.
- Support website intelligence data.
- Support review and reputation data.
- Support future enrichment from Tavily, Bright Data, DataForSEO, Apollo, and public registries.

## Required Data Fields

- Business name
- Category
- Address
- City
- Province
- Phone
- Email
- Website
- Google rating
- Review count
- WebMorphasis grade
- WebMorphasis score
- Failed website signals
- Reputation signals
- Raw payload

---

# 2. Intelligence Layer Requirements

## Objective

Convert raw data into contextual signals.

## Required Capabilities

- Normalize raw payloads.
- Map LeadSniperAI / WebMorphasis signals to DealSniper signals.
- Preserve source evidence.
- Assign signal confidence.
- Separate factual evidence from interpretation.

## Required Signal Categories

- Retirement signals
- Burnout signals
- Succession signals
- Technology gap signals
- Financial stress signals
- Deal quality signals
- Value creation signals

## Required Signal Shape

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

---

# 3. Opportunity Layer Requirements

## Objective

Score and classify businesses using separated scoring models.

## Required Scores

| Score | Name | Requirement |
|---|---|---|
| API | Acquisition Probability Index | Estimate likelihood of ownership transition |
| DQS | Deal Quality Score | Estimate whether the business is worth pursuing |
| VCS | Value Creation Score | Estimate operational upside from RIOS improvements |
| ARI | AI Readiness Index | Estimate digital/automation maturity |

## Required Classification Rules

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

## Required Output Shape

```json
{
  "business_id": "uuid",
  "api_score": 88,
  "dqs_score": 84,
  "vcs_score": 91,
  "ari_score": 32,
  "classification": "A+ Acquisition Candidate",
  "primary_signal": "Strong reputation with owner dependency and weak systems",
  "confidence": 0.78,
  "recommended_action": "Create acquisition brief and add to hot deal pipeline"
}
```

---

# 4. Strategy Layer Requirements

## Objective

Turn classified opportunities into recommended strategic paths.

## Required Recommended Actions

| Classification | Required Action |
|---|---|
| A+ Acquisition Candidate | Create acquisition brief and add to hot deal pipeline |
| A Strategic Opportunity | Begin relationship development and monitor ownership signals |
| B Watchlist | Add to watchlist and rescore quarterly |
| C Low Priority | Store record only |

## Required Brief Components

- Acquisition thesis
- Value creation plan
- Key risks
- Evidence summary
- Recommended next action

---

# 5. Execution Layer Requirements

## Objective

Operationalize intelligence in the dashboard, Supabase, n8n, and CRM.

## Required Capabilities

- Store business profile.
- Store owner profile when available.
- Store interpreted signals.
- Store acquisition scores.
- Store acquisition briefs.
- Display dashboard views.
- Trigger internal alerts only after classification.
- Create reviewable drafts only when needed.

## Required Dashboard Views

```text
/dealsniper
/dealsniper/[business_id]
/dealsniper/watchlist
```

Each business profile must show:

- Business overview
- Source evidence
- Interpreted signals
- Score breakdown
- Confidence
- Classification
- Recommended action

---

# 6. API Requirements

## Required Endpoints

```text
POST /dealsniper/ingest
POST /dealsniper/score
GET /dealsniper/profile/{business_id}
POST /dealsniper/brief
```

## Endpoint Requirements

- Validate input.
- Return structured errors.
- Store raw payloads.
- Preserve signal evidence.
- Return deterministic scores.
- Return confidence and recommended action.

---

# 7. Database Requirements

## Required Tables

- `businesses`
- `owner_profiles`
- `deal_signals`
- `acquisition_scores`
- `acquisition_briefs`
- `outreach_log`

## Required Storage Principles

- Store raw payloads for auditability.
- Store interpreted signals separately from raw data.
- Store confidence on all inferred signals.
- Store score payloads for score explainability.
- Enable row-level security.

---

# 8. Workflow Requirements

## n8n Workflow 001

The first workflow must:

1. Receive `business.scored` webhook.
2. Validate required fields.
3. Normalize payload.
4. Map raw signals into DealSniper signals.
5. Preserve evidence.
6. Call Hermes / RIOS ingest endpoint.
7. Call scoring endpoint.
8. Store score in Supabase.
9. Trigger internal alert only for A+ or A.

Phase 1 must not trigger automatic external communication.

---

# 9. AI Worker Requirements

## Required Hermes Workers

- W4 Narrative Intelligence
- W6 Value Creation Intelligence
- W7 Exit Intelligence
- W8 Deal Intelligence

## Worker Output Requirements

Workers must:

- Use evidence-backed reasoning.
- Avoid unsupported certainty.
- Return confidence.
- Separate risks from opportunities.
- Produce concise, usable outputs.

---

# 10. ICM Guardrails

## Required Language Standard

Use:

```text
likely
possible
suggests
estimated
confidence: 0.72
```

Avoid:

```text
owner is retiring
business is distressed
business is for sale
owner age is X
```

unless directly verified.

## Core Guardrail

Never jump from raw signal to action.

Required path:

```text
Raw Data → Context → Signal → Interpretation → Score → Classification → Action
```

---

# 11. Phase 1 Technical Acceptance Criteria

- Business payload can be ingested.
- Raw payload is stored.
- Signals are mapped and stored with evidence.
- API, DQS, VCS, and ARI are calculated.
- Classification is returned.
- Recommended action is returned.
- Supabase record is created.
- Dashboard placeholder can display the result.
- No automatic external owner communication occurs.

---

# Final Technical Requirement

Every feature must serve the RIOS architecture and ICM reasoning method.

DealSniperAI is not a data collection app.

It is a contextual acquisition intelligence engine.

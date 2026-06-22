# Interpretive Contextual Method (ICM)

## Purpose

The Interpretive Contextual Method is the operating method inside the RIOS architecture.

RIOS defines the high-level flow:

```text
Research → Intelligence → Opportunity → Strategy → Execution
```

ICM defines how raw data becomes intelligence:

```text
Data → Context → Signal → Interpretation → Score → Action
```

DealSniperAI must not treat raw data as intelligence. It must interpret every data point in context before scoring or recommending action.

---

## Why ICM Matters

A single signal is rarely enough to classify a business as an acquisition candidate.

Example:

```text
Old website
```

On its own, this may mean:

- The owner is not technical.
- The business has enough referrals and does not need marketing.
- The business is under-invested.
- The business has value creation upside.

It does not automatically mean:

```text
The business is for sale.
```

ICM prevents false certainty by requiring contextual interpretation before scoring.

---

# ICM Pipeline

## 1. Data

Raw facts collected from sources.

Examples:

- Google rating
- Review count
- Website age
- Missing booking link
- Owner name in reviews
- Business says "since 1998"
- No visible CRM or automation

## 2. Context

The surrounding meaning of the raw data.

Examples:

- Industry type
- Local market density
- Years in business
- Review history
- Business category
- Reputation strength
- Technology maturity
- Owner visibility

## 3. Signal

A structured interpretation candidate.

Examples:

- `business_age_20_plus`
- `owner_mentioned_in_reviews`
- `no_online_booking`
- `high_review_count`
- `legacy_website`

## 4. Interpretation

The business meaning of the signal.

Examples:

- High owner dependency
- Possible succession risk
- Value creation potential
- Strong reputation moat
- Operational modernization gap

## 5. Score

A weighted numeric contribution to API, DQS, VCS, or ARI.

## 6. Action

The recommended next step.

Examples:

- Store only
- Watchlist
- Relationship development
- Acquisition brief
- Human-reviewed owner conversation draft

---

# Core ICM Rules

## Rule 1 — Never Score Raw Data Directly

Raw data must become a contextual signal before scoring.

Bad:

```text
Old website = high acquisition probability
```

Good:

```text
Old website + 20 years in business + strong reviews + owner dependency = possible value creation and succession signal
```

## Rule 2 — Separate Evidence From Interpretation

Every signal should store:

```json
{
  "evidence": "Website says serving Vancouver since 1999",
  "signal": "business_age_20_plus",
  "interpretation": "Mature business with possible ownership transition window",
  "confidence": 0.82
}
```

## Rule 3 — Distinguish Acquisition Probability From Deal Quality

A business can be likely to sell but not worth buying.

A business can be worth buying but not likely to sell.

Therefore API and DQS must remain separate.

## Rule 4 — Strong Reputation Is a Positive Deal Signal

A weak website is not enough.

The preferred acquisition pattern is:

```text
Strong reputation
+ Long operating history
+ Owner dependency
+ Weak systems
+ Clear value creation path
```

## Rule 5 — Use Confidence-Based Language

Use:

- likely
- possible
- suggests
- estimated
- confidence score

Avoid unsupported certainty.

## Rule 6 — Action Must Follow Classification

Do not jump from signal to outreach.

Flow must be:

```text
Signal → Interpretation → Score → Classification → Recommended Action
```

---

# Technical Requirements From ICM

## Data Model Requirements

Tables must support:

- raw payload storage
- extracted signals
- source evidence
- confidence levels
- interpretation text
- score payloads
- recommended actions

## API Requirements

Endpoints must:

- validate input
- normalize raw data
- map data into signals
- preserve source evidence
- calculate scores deterministically
- return classification and recommended action

## Scoring Requirements

Scoring functions must:

- accept structured signals, not only raw payloads
- keep API, DQS, VCS, and ARI separate
- output confidence
- be deterministic for the same input
- expose score payloads for auditability

## Workflow Requirements

n8n workflows must:

- log every transformation step
- preserve raw event payloads
- store evidence before scoring
- trigger alerts only after classification
- avoid external communication in Phase 1

## UI Requirements

The dashboard must show:

- raw evidence
- interpreted signals
- score breakdown
- confidence
- classification
- recommended action

---

# Final ICM Statement

RIOS tells the system where to go.

ICM tells the system how to think.

DealSniperAI must not be a data scraper.

It must be an interpretive acquisition intelligence engine.

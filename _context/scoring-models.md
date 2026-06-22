# DealSniper Scoring Models

## API — Acquisition Probability Index

Measures likelihood of ownership transition or acquisition openness within 3–5 years.

```text
API =
Retirement Score × 0.30
+ Burnout Score × 0.25
+ Succession Risk Score × 0.20
+ Technology Gap Score × 0.15
+ Financial Stress Score × 0.10
```

## DQS — Deal Quality Score

Measures whether the business is desirable to acquire.

Suggested components:

```text
DQS =
Reputation Strength × 0.25
+ Essential Service Score × 0.20
+ Recurring Revenue Likelihood × 0.20
+ Route Density Potential × 0.15
+ Market Position × 0.10
+ Regulatory / Compliance Moat × 0.10
```

## VCS — Value Creation Score

Measures how much value RIOS could create after acquisition.

Suggested components:

```text
VCS =
CRM Gap × 0.20
+ Automation Gap × 0.20
+ Online Booking Gap × 0.15
+ Reputation Management Gap × 0.15
+ SEO / Local Search Gap × 0.15
+ Pricing / Packaging Opportunity × 0.15
```

## ARI — AI Readiness Index

Inherited from LeadSniperAI / WebMorphasis.

Measures digital and automation weakness.

## Classification Rules

```ts
if (api >= 80 && dqs >= 80 && vcs >= 75) return "A+ Acquisition Candidate";
if (api >= 70 && dqs >= 70) return "A Strategic Opportunity";
if (api >= 50) return "B Watchlist";
return "C Low Priority";
```

## Important Scoring Principles

- A poor website alone is not enough to produce an acquisition candidate.
- Strong reputation can offset technology weakness.
- Severe financial stress should reduce DQS unless supported by clear turnaround opportunity.
- Owner dependency can increase API but may reduce DQS if operational risk is too high.
- Scores should include confidence levels.

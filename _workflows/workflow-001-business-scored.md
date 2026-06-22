# Workflow 001 — Business Scored Trigger

## Purpose

Receive `business.scored` events from LeadSniperAI, transform them into DealSniper payloads, and submit them to Hermes / RIOS for scoring.

## Trigger

Webhook:

```text
POST /webhook/dealsniper/business-scored
```

## Input Event

```json
{
  "event": "business.scored",
  "source": "leadsniperAI",
  "business": {},
  "webmorphasis": {},
  "reputation": {}
}
```

## Node Sequence

1. Webhook Trigger
2. Validate Required Fields
3. Normalize Business Payload
4. Map WebMorphasis Signals to DealSniper Signals
5. Add Reputation-Based Signals
6. Build Hermes Payload
7. HTTP Request: `POST /dealsniper/ingest`
8. HTTP Request: `POST /dealsniper/score`
9. Supabase Insert: `acquisition_scores`
10. IF Classification is A+ or A
11. Slack Alert / CRM Draft Record
12. Error Handler

## Trigger Threshold

Phase 1 should process all valid businesses, but only alert on:

```text
A+ Acquisition Candidate
A Strategic Opportunity
```

## Signal Mapping Examples

| LeadSniperAI Signal | DealSniper Signal |
|---|---|
| `missing_booking_link` | `no_online_booking` |
| `no_contact_form` | `manual_contact_flow` |
| `slow_mobile` | `legacy_website` |
| `review_response_rate_low` | `review_response_gap` |
| `last_review_old` | `review_velocity_decline` |

## Error Handling

Every failed execution should log:

- timestamp
- business name
- source event
- failed node
- error message
- payload snapshot

## Phase 1 Safety Rule

This workflow must not send owner emails. It may create CRM records, internal alerts, and reviewable drafts only.

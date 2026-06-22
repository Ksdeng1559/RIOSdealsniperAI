# FastAPI Contract

Base service: Hermes / RIOS API

## POST /dealsniper/ingest

Receives LeadSniperAI or n8n business scoring payload.

### Request

```json
{
  "event": "business.scored",
  "source": "leadsniperAI",
  "business": {
    "id": "lsa_business_id",
    "name": "ABC Plumbing Services",
    "category": "Plumbing",
    "address": "123 Main St, Vancouver BC",
    "phone": "+1-604-555-0100",
    "email": "owner@example.ca",
    "website": "https://example.ca"
  },
  "webmorphasis": {
    "grade": "D",
    "score": 34,
    "signals_failed": ["no_contact_form", "missing_booking_link", "slow_mobile"]
  },
  "reputation": {
    "avg_rating": 4.7,
    "review_count": 300,
    "response_rate": 0.08,
    "recent_negative_count": 3
  },
  "signals": []
}
```

### Response

```json
{
  "job_id": "uuid",
  "business_id": "uuid",
  "status": "stored"
}
```

## POST /dealsniper/score

Runs API, DQS, VCS, and ARI scoring.

### Request

```json
{
  "business_id": "uuid",
  "signals": [],
  "webmorphasis": {},
  "reputation": {}
}
```

### Response

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

## GET /dealsniper/profile/{business_id}

Returns complete business acquisition profile.

### Response

```json
{
  "business": {},
  "owner_profile": {},
  "signals": [],
  "latest_score": {},
  "acquisition_brief": {}
}
```

## POST /dealsniper/brief

Generates acquisition brief after a business has been scored.

### Request

```json
{
  "business_id": "uuid"
}
```

### Response

```json
{
  "business_id": "uuid",
  "brief_id": "uuid",
  "status": "created"
}
```

## Error Response Shape

```json
{
  "error": true,
  "code": "VALIDATION_ERROR",
  "message": "Missing required field: business.name",
  "details": {}
}
```

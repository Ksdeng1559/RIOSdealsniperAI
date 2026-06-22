# MVP Acceptance Checklist

## Repository Readiness

- [ ] Claude Code reads `CLAUDE.md` first.
- [ ] Claude Code follows `IMPLEMENTATION_PLAN.md`.
- [ ] Environment variables copied from `.env.example`.

## Supabase

- [ ] `businesses` table created.
- [ ] `owner_profiles` table created.
- [ ] `deal_signals` table created.
- [ ] `acquisition_scores` table created.
- [ ] `acquisition_briefs` table created.
- [ ] `outreach_log` table created.
- [ ] RLS enabled.

## API

- [ ] `POST /dealsniper/ingest` validates payload.
- [ ] `POST /dealsniper/ingest` stores business record.
- [ ] `POST /dealsniper/score` returns API, DQS, VCS, ARI.
- [ ] `GET /dealsniper/profile/{business_id}` returns full profile.
- [ ] Errors return the standard error shape.

## Scoring

- [ ] `calculateAPI()` works with test payload.
- [ ] `calculateDQS()` works with test payload.
- [ ] `calculateVCS()` works with test payload.
- [ ] `classifyDeal()` returns expected classification.
- [ ] Score output includes confidence.
- [ ] Score output includes recommended action.

## Workflow

- [ ] n8n webhook receives `business.scored`.
- [ ] Payload is normalized.
- [ ] Signals are mapped.
- [ ] Hermes API receives ingest call.
- [ ] Supabase stores score.
- [ ] Internal alert fires only for A+ or A.

## Review Rules

- [ ] Phase 1 stores and scores only.
- [ ] Drafts are stored for review only.
- [ ] Personal assumptions are marked as estimates with confidence.
- [ ] All high-confidence signals include evidence.

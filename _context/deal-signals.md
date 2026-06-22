# DealSniper Signal Taxonomy

Signals are public or semi-public indicators used to estimate acquisition probability, deal quality, and value creation potential.

## Retirement Signals

| Signal | Meaning | Severity |
|---|---|---|
| `business_age_20_plus` | Long operating history may indicate mature ownership cycle | High |
| `owner_branded_company` | Business name tied to individual/family owner | Medium |
| `founder_mentioned` | Founder remains central to market identity | Medium |
| `family_owned_language` | Family business may have succession risk | Medium |
| `since_year_visible` | Clear operating history evidence | Low |

## Burnout Signals

| Signal | Meaning | Severity |
|---|---|---|
| `review_velocity_decline` | Customer activity may be slowing | Medium |
| `slow_response_reviews` | Operational fatigue or staffing issues | Medium |
| `no_callback_reviews` | Follow-up system gap | Medium |
| `booked_months_out` | Capacity constraint | Medium |
| `staffing_complaints` | Labor or management friction | High |

## Succession Signals

| Signal | Meaning | Severity |
|---|---|---|
| `no_successor_visible` | No public sign of transition plan | Medium |
| `owner_performs_estimates` | Owner remains fulfillment/sales bottleneck | High |
| `owner_mentioned_in_reviews` | Customer trust tied to owner | High |
| `key_person_dependency` | Business may rely on one expert | High |
| `family_not_visible` | No next generation visible | Low |

## Technology Gap Signals

| Signal | Meaning | Severity |
|---|---|---|
| `no_crm_detected` | Weak customer management infrastructure | Medium |
| `no_online_booking` | Conversion and qualification gap | Medium |
| `legacy_website` | Modernization opportunity | Medium |
| `no_marketing_automation` | Follow-up gap | Medium |
| `manual_contact_flow` | Operational drag | Medium |

## Financial Stress Signals

| Signal | Meaning | Severity |
|---|---|---|
| `declining_rating` | Reputation deterioration | High |
| `closed_location` | Possible contraction | High |
| `reduced_hours` | Possible capacity or demand issue | Medium |
| `constant_hiring` | Staffing churn | Medium |
| `negative_review_cluster` | Recent customer experience issue | Medium |

## Deal Quality Signals

| Signal | Meaning | Severity |
|---|---|---|
| `high_rating` | Strong reputation | High positive |
| `high_review_count` | Established demand and local visibility | High positive |
| `essential_service` | Demand likely durable | High positive |
| `recurring_revenue_likely` | Better acquisition economics | High positive |
| `route_density_potential` | Operational scaling potential | Medium positive |
| `regulated_or_compliance_driven` | Durable moat | High positive |

## Evidence Rule

Every signal should store:

```json
{
  "signal_name": "owner_mentioned_in_reviews",
  "source": "google_reviews",
  "evidence": "Multiple reviews mention owner by name",
  "confidence": 0.78
}
```

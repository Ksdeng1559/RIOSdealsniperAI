export type SignalSeverity = "LOW" | "MEDIUM" | "HIGH" | "POSITIVE";

export interface DealSignal {
  signal_type: string;
  signal_name: string;
  severity?: SignalSeverity;
  confidence?: number;
  evidence?: string;
}

export interface ReputationInput {
  avg_rating?: number;
  review_count?: number;
  response_rate?: number;
  recent_negative_count?: number;
}

export interface WebMorphasisInput {
  grade?: "A" | "B" | "C" | "D" | "F";
  score?: number;
  signals_failed?: string[];
}

export interface ScoreInput {
  signals: DealSignal[];
  reputation?: ReputationInput;
  webmorphasis?: WebMorphasisInput;
}

export interface DealScoreOutput {
  api_score: number;
  dqs_score: number;
  vcs_score: number;
  ari_score: number;
  classification: string;
  primary_signal: string;
  confidence: number;
  recommended_action: string;
}

const clamp = (value: number): number => Math.max(0, Math.min(100, Math.round(value)));

const hasSignal = (signals: DealSignal[], name: string): boolean =>
  signals.some((signal) => signal.signal_name === name);

const countByType = (signals: DealSignal[], type: string): number =>
  signals.filter((signal) => signal.signal_type === type).length;

const confidenceAverage = (signals: DealSignal[]): number => {
  if (!signals.length) return 0.5;
  const total = signals.reduce((sum, signal) => sum + (signal.confidence ?? 0.5), 0);
  return Number((total / signals.length).toFixed(2));
};

export function calculateARI(webmorphasis?: WebMorphasisInput): number {
  if (!webmorphasis) return 50;
  if (typeof webmorphasis.score === "number") return clamp(webmorphasis.score);

  const gradeMap: Record<string, number> = { A: 90, B: 75, C: 55, D: 30, F: 10 };
  return gradeMap[webmorphasis.grade ?? "C"] ?? 50;
}

export function calculateAPI(input: ScoreInput): number {
  const { signals } = input;

  const retirementScore = clamp(
    countByType(signals, "retirement") * 22 +
      (hasSignal(signals, "business_age_20_plus") ? 25 : 0) +
      (hasSignal(signals, "owner_branded_company") ? 15 : 0),
  );

  const burnoutScore = clamp(
    countByType(signals, "burnout") * 18 +
      (hasSignal(signals, "staffing_complaints") ? 20 : 0) +
      (hasSignal(signals, "review_velocity_decline") ? 15 : 0),
  );

  const successionScore = clamp(
    countByType(signals, "succession") * 20 +
      (hasSignal(signals, "owner_mentioned_in_reviews") ? 20 : 0) +
      (hasSignal(signals, "owner_performs_estimates") ? 20 : 0),
  );

  const techGapScore = clamp(countByType(signals, "technology_gap") * 18);
  const financialStressScore = clamp(countByType(signals, "financial_stress") * 18);

  return clamp(
    retirementScore * 0.3 +
      burnoutScore * 0.25 +
      successionScore * 0.2 +
      techGapScore * 0.15 +
      financialStressScore * 0.1,
  );
}

export function calculateDQS(input: ScoreInput): number {
  const { signals, reputation } = input;
  const rating = reputation?.avg_rating ?? 0;
  const reviewCount = reputation?.review_count ?? 0;

  const reputationStrength = clamp((rating / 5) * 70 + Math.min(reviewCount / 10, 30));
  const essentialService = hasSignal(signals, "essential_service") ? 90 : 50;
  const recurringRevenue = hasSignal(signals, "recurring_revenue_likely") ? 85 : 45;
  const routeDensity = hasSignal(signals, "route_density_potential") ? 80 : 45;
  const marketPosition = hasSignal(signals, "high_review_count") ? 80 : 50;
  const regulatoryMoat = hasSignal(signals, "regulated_or_compliance_driven") ? 90 : 40;

  const distressPenalty = countByType(signals, "financial_stress") * 6;

  return clamp(
    reputationStrength * 0.25 +
      essentialService * 0.2 +
      recurringRevenue * 0.2 +
      routeDensity * 0.15 +
      marketPosition * 0.1 +
      regulatoryMoat * 0.1 -
      distressPenalty,
  );
}

export function calculateVCS(input: ScoreInput): number {
  const { signals, webmorphasis } = input;
  const failedSignals = webmorphasis?.signals_failed ?? [];

  const crmGap = hasSignal(signals, "no_crm_detected") ? 90 : 40;
  const automationGap = hasSignal(signals, "no_marketing_automation") ? 90 : 40;
  const bookingGap = hasSignal(signals, "no_online_booking") || failedSignals.includes("missing_booking_link") ? 85 : 40;
  const reputationGap = hasSignal(signals, "review_response_gap") ? 80 : 40;
  const seoGap = hasSignal(signals, "legacy_website") || failedSignals.includes("missing_schema") ? 75 : 40;
  const pricingOpportunity = hasSignal(signals, "pricing_opportunity") ? 80 : 45;

  return clamp(
    crmGap * 0.2 +
      automationGap * 0.2 +
      bookingGap * 0.15 +
      reputationGap * 0.15 +
      seoGap * 0.15 +
      pricingOpportunity * 0.15,
  );
}

export function classifyDeal(api: number, dqs: number, vcs: number): string {
  if (api >= 80 && dqs >= 80 && vcs >= 75) return "A+ Acquisition Candidate";
  if (api >= 70 && dqs >= 70) return "A Strategic Opportunity";
  if (api >= 50) return "B Watchlist";
  return "C Low Priority";
}

export function recommendedAction(classification: string): string {
  switch (classification) {
    case "A+ Acquisition Candidate":
      return "Create acquisition brief and add to hot deal pipeline.";
    case "A Strategic Opportunity":
      return "Begin relationship development and monitor ownership signals.";
    case "B Watchlist":
      return "Add to watchlist and rescore quarterly.";
    default:
      return "Store record only. No active action required.";
  }
}

export function scoreDeal(input: ScoreInput): DealScoreOutput {
  const api = calculateAPI(input);
  const dqs = calculateDQS(input);
  const vcs = calculateVCS(input);
  const ari = calculateARI(input.webmorphasis);
  const classification = classifyDeal(api, dqs, vcs);

  return {
    api_score: api,
    dqs_score: dqs,
    vcs_score: vcs,
    ari_score: ari,
    classification,
    primary_signal: buildPrimarySignal(input, api, dqs, vcs),
    confidence: confidenceAverage(input.signals),
    recommended_action: recommendedAction(classification),
  };
}

function buildPrimarySignal(input: ScoreInput, api: number, dqs: number, vcs: number): string {
  if (api >= 80 && dqs >= 80) return "High acquisition probability with strong deal quality.";
  if (dqs >= 80 && vcs >= 75) return "Strong business with meaningful value creation upside.";
  if (api >= 70) return "Likely ownership transition signals detected.";
  return "Insufficient acquisition signal strength for active pursuit.";
}

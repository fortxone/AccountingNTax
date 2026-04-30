/**
 * Assessment flow content — questions, options, and selection behaviour.
 * Import `ASSESSMENT_QUESTIONS` and related types into `Assesment.tsx` (or other UIs).
 */

export type AssessmentOption = {
  id: string;
  label: string;
};

export type AssessmentQuestion = {
  /** Stable id for analytics / form payloads */
  id: string;
  /** Shown in the navy header badge (e.g. 1 … 7) */
  questionNumber: number;
  question: string;
  kind: "single" | "multi";
  options: readonly AssessmentOption[];
  /** Screen reader hint for the option list (e.g. select all that apply) */
  fieldsetHint?: string;
  /** Footer button label (default: Continue) */
  ctaLabel?: string;
  /** Navy (default) or teal accent when the CTA is enabled */
  ctaEnabledStyle?: "primary" | "accent";
};

export const ASSESSMENT_QUESTIONS = [
  {
    id: "who",
    questionNumber: 1,
    question: "Who are you?",
    kind: "single",
    options: [
      { id: "individual", label: "I am an individual / personal taxpayer" },
      { id: "sole_trader", label: "I am a sole trader or freelancer" },
      { id: "startup", label: "I am a startup or new business" },
      { id: "sme", label: "I am a small or medium-sized business (SME)" },
      { id: "limited_company", label: "I am a limited company" },
      { id: "larger_org", label: "I represent a larger organisation" },
    ],
  },
  {
    id: "sector",
    questionNumber: 2,
    question: "What sector do you operate in?",
    kind: "single",
    options: [
      { id: "retail_ecommerce", label: "Retail & E-commerce" },
      { id: "tech_software", label: "Technology & Software" },
      { id: "construction_trades", label: "Construction & Trades" },
      { id: "healthcare_medical", label: "Healthcare & Medical" },
      { id: "legal_professional", label: "Legal & Professional Services" },
      { id: "hospitality_food", label: "Hospitality & Food" },
      { id: "creative_media", label: "Creative & Media" },
      { id: "property_real_estate", label: "Property & Real Estate" },
      { id: "finance_services", label: "Finance & Financial Services" },
      { id: "charity_nonprofit", label: "Charity & Non-Profit" },
      { id: "international_cross_border", label: "International / Cross-Border" },
      { id: "sector_other", label: "Other" },
    ],
  },
  {
    id: "services",
    questionNumber: 3,
    question:
      "What accounting services do you need? (Select all that apply)",
    kind: "multi",
    fieldsetHint: "Select all services that apply. At least one required to continue.",
    options: [
      { id: "self_assessment", label: "Self-assessment tax return" },
      { id: "annual_accounts", label: "Annual accounts preparation" },
      { id: "corporation_tax", label: "Corporation tax return" },
      { id: "vat", label: "VAT registration & returns" },
      { id: "payroll_paye", label: "Payroll & PAYE management" },
      { id: "bookkeeping", label: "Bookkeeping" },
      { id: "rd_credits", label: "R&D tax credits" },
      { id: "capital_gains", label: "Capital gains tax advice" },
      { id: "inheritance_tax", label: "Inheritance tax planning" },
      { id: "forecasting_budget", label: "Financial forecasting & budgeting" },
      { id: "startup_accounts", label: "Startup / investor-ready accounts" },
      { id: "cross_border_tax", label: "Cross-border or international tax" },
      { id: "hmrc_investigation", label: "HMRC investigation support" },
      { id: "general_advice", label: "General financial advice & planning" },
    ],
  },
  {
    id: "turnover",
    questionNumber: 4,
    question:
      "What is your approximate annual turnover or personal income?",
    kind: "single",
    options: [
      { id: "under_30k", label: "Under £30,000" },
      { id: "30k_100k", label: "£30,000 – £100,000" },
      { id: "100k_500k", label: "£100,000 – £500,000" },
      { id: "500k_2m", label: "£500,000 – £2 million" },
      { id: "over_2m", label: "Over £2 million" },
      { id: "na_individual", label: "Not applicable / I'm an individual" },
    ],
  },
  {
    id: "location",
    questionNumber: 5,
    question: "Where are you based?",
    kind: "single",
    options: [
      { id: "london", label: "London" },
      { id: "south_east", label: "South East England" },
      { id: "midlands", label: "Midlands" },
      { id: "north_england", label: "North of England" },
      { id: "scotland", label: "Scotland" },
      { id: "wales", label: "Wales" },
      { id: "northern_ireland", label: "Northern Ireland" },
      { id: "outside_uk", label: "Outside the UK" },
      {
        id: "no_preference_remote",
        label: "No preference — I'm happy to work remotely",
      },
    ],
  },
  {
    id: "work_style",
    questionNumber: 6,
    question: "How would you prefer to work with your accountant?",
    kind: "single",
    options: [
      { id: "remote", label: "Fully remote / online" },
      { id: "in_person", label: "In-person meetings preferred" },
      { id: "mixed", label: "Mix of remote and in-person" },
      { id: "work_no_preference", label: "No preference" },
    ],
  },
  {
    id: "budget",
    questionNumber: 7,
    question: "What is your monthly budget for accountancy services?",
    kind: "single",
    ctaLabel: "Continue",
    options: [
      { id: "under_100", label: "Under £100/month" },
      { id: "100_300", label: "£100 – £300/month" },
      { id: "300_600", label: "£300 – £600/month" },
      { id: "over_600", label: "Over £600/month" },
      { id: "discuss_fees", label: "I'd prefer to discuss fees directly" },
    ],
  },
] satisfies AssessmentQuestion[];

export const ASSESSMENT_STEP_COUNT = ASSESSMENT_QUESTIONS.length;

export type AssessmentAnswerValue = string | string[];

/** One entry per question; `null` = not answered yet. */
export type AssessmentResponses = Array<AssessmentAnswerValue | null>;

export function createEmptyResponses(): AssessmentResponses {
  return ASSESSMENT_QUESTIONS.map(() => null);
}

export function isAnswerFilled(
  question: AssessmentQuestion,
  value: AssessmentAnswerValue | null
): boolean {
  if (value === null) return false;
  if (question.kind === "multi") {
    return Array.isArray(value) && value.length > 0;
  }
  return typeof value === "string" && value.length > 0;
}

export function countAnsweredQuestions(
  responses: AssessmentResponses
): number {
  let n = 0;
  for (let i = 0; i < ASSESSMENT_QUESTIONS.length; i++) {
    if (isAnswerFilled(ASSESSMENT_QUESTIONS[i], responses[i])) n += 1;
  }
  return n;
}

/** Human-readable answers per step for logging or API payloads. */
export function summarizeAssessmentResponses(responses: AssessmentResponses) {
  return ASSESSMENT_QUESTIONS.map((q, index) => {
    const raw = responses[index];
    if (!isAnswerFilled(q, raw)) {
      return {
        step: q.questionNumber,
        questionId: q.id,
        question: q.question,
        unanswered: true as const,
      };
    }
    if (q.kind === "single" && typeof raw === "string") {
      const label = q.options.find((o) => o.id === raw)?.label ?? raw;
      return {
        step: q.questionNumber,
        questionId: q.id,
        question: q.question,
        kind: "single" as const,
        selectedOptionIds: [raw],
        selectedLabels: [label],
      };
    }
    if (q.kind === "multi" && Array.isArray(raw)) {
      const labels = raw.map(
        (id) => q.options.find((o) => o.id === id)?.label ?? id
      );
      return {
        step: q.questionNumber,
        questionId: q.id,
        question: q.question,
        kind: "multi" as const,
        selectedOptionIds: raw,
        selectedLabels: labels,
      };
    }
    return {
      step: q.questionNumber,
      questionId: q.id,
      question: q.question,
      unanswered: true as const,
    };
  });
}

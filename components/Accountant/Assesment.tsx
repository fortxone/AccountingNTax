"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { CalendlyWidget, BookingConfirmationModal } from "@/components/Accountant/BookingConsultationModal";
import {
  ASSESSMENT_QUESTIONS,
  ASSESSMENT_STEP_COUNT,
  type AssessmentQuestion,
  countAnsweredQuestions,
  createEmptyResponses,
  isAnswerFilled,
  summarizeAssessmentResponses,
  type AssessmentResponses,
} from "@/components/Accountant/assessmentQuestions";

function ContinueArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("size-4 shrink-0", className)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10h9M13 7l3 3M13 13l3-3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("size-3 text-white", className)}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 6l2.5 2.5L9.5 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Assesment() {
  const router = useRouter();
  const groupId = useId();
  const stepHeaderRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);
  const stepScrollPrevRef = useRef<{
    currentIndex: number;
    completed: boolean;
  } | null>(null);
  const [responses, setResponses] = useState<AssessmentResponses>(() =>
    createEmptyResponses()
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    referralCode: "",
  });
  const [completed, setCompleted] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const question = ASSESSMENT_QUESTIONS[currentIndex];

  useEffect(() => {
    const prev = stepScrollPrevRef.current;
    stepScrollPrevRef.current = { currentIndex, completed };
    if (prev === null) return;
    const stepChanged =
      prev.currentIndex !== currentIndex || prev.completed !== completed;
    if (!stepChanged) return;
    stepHeaderRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentIndex, completed, showContactForm]);

  const answeredCount = useMemo(
    () => countAnsweredQuestions(responses),
    [responses]
  );

  const TOTAL_STEPS = ASSESSMENT_STEP_COUNT + 1;
  const progressPct =
    completed || showContactForm
      ? 100
      : Math.round((answeredCount / TOTAL_STEPS) * 100);

  const isCurrentValid =
    question && isAnswerFilled(question, responses[currentIndex]);

  const setSingle = (optionId: string) => {
    setResponses((prev) => {
      const next = [...prev];
      next[currentIndex] = optionId;
      return next;
    });
  };

  const toggleMulti = (optionId: string) => {
    setResponses((prev) => {
      const next = [...prev];
      const raw = prev[currentIndex];
      const cur = Array.isArray(raw) ? raw : [];
      if (cur.includes(optionId)) {
        next[currentIndex] = cur.filter((id) => id !== optionId);
      } else {
        next[currentIndex] = [...cur, optionId];
      }
      return next;
    });
  };

  const handleContinue = () => {
    if (!question || !isAnswerFilled(question, responses[currentIndex])) return;
    if (currentIndex < ASSESSMENT_STEP_COUNT - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowContactForm(true);
    }
  };

  const handleContactSubmit = async () => {
    if (isSubmittingContact) return;
    setIsSubmittingContact(true);
    const emailPayload = {
      assessment: summarizeAssessmentResponses(responses),
      contact: contactInfo,
    };
    try {
      const res = await fetch("/api/send-assessment-submitted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });
      if (!res.ok) console.error("[send-assessment-submitted]", await res.text());
    } catch (err) {
      console.error("[send-assessment-submitted]", err);
    } finally {
      setIsSubmittingContact(false);
    }
    setShowContactForm(false);
    setCompleted(true);
  };

  const handlePreviousStep = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handlePreviousFromContact = () => {
    setShowContactForm(false);
    setCurrentIndex(ASSESSMENT_STEP_COUNT - 1);
  };

  /** Navigate home only — resetting assessment state here flashes the wizard before the route changes; unmount clears state when leaving the page. */
  const handleCloseBookingModal = useCallback(() => {
    router.push("/");
  }, [router]);

  /** No “Previous step” once the assessment is completed (summary or Calendly). */
  const showPreviousStepNav =
    !completed &&
    !isSubmittingContact &&
    (showContactForm || currentIndex > 0);

  const ctaLabel = question?.ctaLabel ?? "Continue";

  return (
    <div
      className={cn(
        " px-4 pb-20 pt-10 font-sans md:px-6 md:py-14 lg:pt-[37px] lg:pb-[128px] relative z-10 bg-white -mt-[60px]",
        completed ? "bg-white text-black" : "text-black"
      )}
    >
      <div className="mx-auto w-full max-w-[1245px]">
        <div
          ref={stepHeaderRef}
          tabIndex={-1}
          className="scroll-mt-6 outline-none"
        >
          <div className="mb-3 flex items-baseline justify-between gap-4 font-jakarta text-2xl font-bold text-black md:text-[26px]">
            <span>
              {completed ? (
                "Your Summary"
              ) : showContactForm ? (
                <>
                  Step {ASSESSMENT_STEP_COUNT + 1} to {TOTAL_STEPS}
                </>
              ) : (
                <>
                  Step {currentIndex + 1} to {TOTAL_STEPS}
                </>
              )}
            </span>
            <span className="font-medium">{progressPct}%</span>
          </div>

          <div
            className="mb-8 h-2 w-full overflow-hidden rounded-full bg-[#0000001A]"
            role="progressbar"
            aria-valuenow={completed ? 100 : progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={completed ? "Assessment complete" : undefined}
          >
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-300 ease-out",
                completed ? "w-full bg-[#0a1d37]" : "bg-surface-deep"
              )}
              style={completed ? undefined : { width: `${progressPct}%` }}
            />
          </div>
        </div>

        {showPreviousStepNav ? (
          <div className="-mt-4 mb-4 flex justify-start md:-mt-2 md:mb-6">
            <button
              type="button"
              onClick={
                showContactForm ? handlePreviousFromContact : handlePreviousStep
              }
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-1 py-2 font-sans text-sm font-semibold text-[#0F2545] transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2545] md:text-[15px]"
            >
              <ContinueArrowIcon className="-scale-x-100 text-[#0F2545]" />
              Previous step
            </button>
          </div>
        ) : null}

        {!completed && !showContactForm && question ? (
          <AssessmentStepCard
            groupId={groupId}
            question={question}
            responses={responses}
            currentIndex={currentIndex}
            onSingle={setSingle}
            onToggleMulti={toggleMulti}
            onContinue={handleContinue}
            isValid={!!isCurrentValid}
            ctaLabel={ctaLabel}
            contentTopClassName={currentIndex > 0 ? "mt-6" : "mt-[80px]"}
          />
        ) : showContactForm ? (
          <ContactFormStep
            contactInfo={contactInfo}
            isSubmitting={isSubmittingContact}
            onChange={(field, value) =>
              setContactInfo((prev) => ({ ...prev, [field]: value }))
            }
            onSubmit={handleContactSubmit}
          />
        ) : completed ? (
          <div className={showBooking ? "mt-6 w-full" : "mt-6 mx-auto max-w-[997px]"}>
            {showBooking ? (
              <>
                <div ref={calendlyRef} />
                <CalendlyWidget
                  prefill={{ name: contactInfo.name, email: contactInfo.email }}
                  onScheduled={async () => {
                    setBookingConfirmed(true);

                    // Send assessment notification email; Calendly handles its
                    // own invite emails directly to the client and accountant.
                    const emailPayload = {
                      assessment: summarizeAssessmentResponses(responses),
                      contact: contactInfo,
                      booking: {
                        consultationSlotDisplay:
                          "Booked via Calendly — confirmation sent to client",
                      },
                    };
                    try {
                      const res = await fetch("/api/send-assessment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(emailPayload),
                      });
                      if (!res.ok) console.error("[send-assessment]", await res.text());
                    } catch (err) {
                      console.error("[send-assessment]", err);
                    }
                  }}
                />
                <BookingConfirmationModal
                  isOpen={bookingConfirmed}
                  onClose={handleCloseBookingModal}
                />
              </>
            ) : (
              <AssessmentSummaryView
                responses={responses}
                contactInfo={contactInfo}
                onBookConsultation={() => {
                  setShowBooking(true);
                  setTimeout(() => {
                    calendlyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 50);
                }}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function AssessmentSummaryView({
  responses,
  contactInfo,
  onBookConsultation,
}: {
  responses: AssessmentResponses;
  contactInfo: { name: string; email: string; phone: string; referralCode: string };
  onBookConsultation: () => void;
}) {
  const summary = summarizeAssessmentResponses(responses);

  return (
    <div className="flex flex-col gap-6">
      {/* Summary card */}
      <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_12px_40px_-12px_rgba(15,37,69,0.18)]">
        <div className="bg-surface-deep px-4 py-5 md:px-7 md:py-6">
          <h2 className="font-jakarta text-[22px] font-bold leading-snug text-white">
            Your Assessment Summary
          </h2>
          <p className="mt-1 text-[14px] text-white/70">
            Here&rsquo;s a quick recap of the information you provided.
          </p>
        </div>

        {/* Q&A rows */}
        <div className="divide-y divide-[#EEF0F4]">
          {summary.map((row) => {
            const answer =
              "unanswered" in row && row.unanswered
                ? null
                : row.selectedLabels?.join(", ") ?? null;

            return (
              <div
                key={row.questionId}
                className="flex flex-col gap-1 px-4 py-4 md:flex-row md:items-start md:gap-6 md:px-7 md:py-4"
              >
                <span className="flex shrink-0 items-center gap-2 font-sans text-[13px] font-semibold text-[#64748b] md:w-[220px]">
                  <span
                    className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0D7377] text-[10px] font-bold text-white"
                    aria-hidden
                  >
                    {row.step}
                  </span>
                  {row.question}
                </span>
                {answer ? (
                  <span className="text-[15px] font-medium leading-snug text-[#1C2A3A]">
                    {answer}
                  </span>
                ) : (
                  <span className="text-[14px] italic text-[#9ca3af]">
                    Not answered
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact details row */}
        <div className="border-t border-[#EEF0F4] bg-[#F8F9FB] px-4 py-4 md:px-7 md:py-4">
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#64748b]">
            Your Details
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-[#1C2A3A]">
            <span>
              <span className="text-[#64748b]">Name: </span>
              <span className="font-medium">{contactInfo.name}</span>
            </span>
            <span>
              <span className="text-[#64748b]">Email: </span>
              <span className="font-medium">{contactInfo.email}</span>
            </span>
            <span>
              <span className="text-[#64748b]">Phone: </span>
              <span className="font-medium">{contactInfo.phone}</span>
            </span>
            {contactInfo.referralCode.trim() && (
              <span>
                <span className="text-[#64748b]">Referral Code: </span>
                <span className="font-medium">{contactInfo.referralCode}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Eligibility & CTA card */}
      <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_12px_40px_-12px_rgba(15,37,69,0.18)]">
          <div className="flex flex-col items-center gap-6 px-4 py-10 text-center md:px-14 md:py-12">
          {/* badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E0F2F1] px-4 py-1.5 font-sans text-[13px] font-bold uppercase tracking-wide text-[#0D7377]">
            <svg
              aria-hidden
              className="size-4 shrink-0"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 2a8 8 0 100 16A8 8 0 0010 2zm3.7 6.3l-4 4a1 1 0 01-1.4 0l-2-2a1 1 0 011.4-1.4L9 10.6l3.3-3.3a1 1 0 011.4 1.4z"
                fill="#0D7377"
              />
            </svg>
            You&rsquo;re eligible
          </span>

          <div className="max-w-[600px]">
            <h3 className="mb-3 font-jakarta text-[22px] font-bold leading-snug text-[#0F2545]">
              Great news, {contactInfo.name.split(" ")[0]}!
            </h3>
            <p className="text-[15px] leading-relaxed text-[#1C2A3A]">
              Based on your assessment, we&rsquo;re happy to assess your
              position further and offer you a{" "}
              <strong>free 30-minute introductory session</strong>{" "} with one of
              our experienced accountants. We&rsquo;ll take the time to
              understand your specific requirements and show you how we can
              help.
            </p>
          </div>

          <button
            type="button"
            onClick={onBookConsultation}
            className="inline-flex cursor-pointer items-center gap-2 rounded-[8px] bg-accent px-8 py-4 font-jakarta text-[15px] font-bold text-white transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Book My Free 30-Minute Session
            <ContinueArrowIcon />
          </button>

          <p className="text-[13px] text-[#64748b]">
            No obligation &mdash; completely free of charge.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactFormStep({
  contactInfo,
  isSubmitting,
  onChange,
  onSubmit,
}: {
  contactInfo: { name: string; email: string; phone: string; referralCode: string };
  isSubmitting: boolean;
  onChange: (field: "name" | "email" | "phone" | "referralCode", value: string) => void;
  onSubmit: () => void;
}) {
  const isValid =
    contactInfo.name.trim() !== "" &&
    contactInfo.email.trim() !== "" &&
    contactInfo.phone.trim() !== "";

  return (
    <article className="mx-auto mt-6 max-w-[997px] overflow-hidden rounded-[16px] bg-white shadow-[0_12px_40px_-12px_rgba(15,37,69,0.18)]">
      <header className="flex items-center gap-2 bg-surface-deep px-4 py-5 md:gap-4 md:px-7 md:py-6">
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0D7377] px-2 py-0.5 font-sans text-[13px] font-bold uppercase text-white"
          aria-hidden
        >
          Q8
        </span>
        <h1 className="font-jakarta text-[22px] font-bold leading-snug text-white">
          Almost there! Please provide your contact details.
        </h1>
      </header>

      <div className="px-4 py-5 md:px-7 md:py-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-name"
              className="text-sm font-semibold text-[#1C2A3A]"
            >
              Full Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={contactInfo.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              className="rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] px-4 py-3 text-[15px] text-[#1C2A3A] outline-none transition focus:border-surface-deep focus:ring-1 focus:ring-surface-deep/20 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-email"
              className="text-sm font-semibold text-[#1C2A3A]"
            >
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              className="rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] px-4 py-3 text-[15px] text-[#1C2A3A] outline-none transition focus:border-surface-deep focus:ring-1 focus:ring-surface-deep/20 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-phone"
              className="text-sm font-semibold text-[#1C2A3A]"
            >
              Phone Number
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              disabled={isSubmitting}
              className="rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] px-4 py-3 text-[15px] text-[#1C2A3A] outline-none transition focus:border-surface-deep focus:ring-1 focus:ring-surface-deep/20 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-referral"
              className="text-sm font-semibold text-[#1C2A3A]"
            >
              Referral Code{" "}
              <span className="font-normal text-[#9ca3af]">(optional)</span>
            </label>
            <input
              id="contact-referral"
              type="text"
              value={contactInfo.referralCode}
              onChange={(e) => onChange("referralCode", e.target.value)}
              placeholder="Enter your referral code"
              disabled={isSubmitting}
              className="rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] px-4 py-3 text-[15px] text-[#1C2A3A] outline-none transition focus:border-surface-deep focus:ring-1 focus:ring-surface-deep/20 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
        </div>
      </div>

      <footer className="border-t border-[#0000004D] px-4 py-4 md:px-7 md:py-5">
        <div className="flex justify-end">
          <button
            type="button"
            disabled={!isValid || isSubmitting}
            onClick={onSubmit}
            aria-busy={isSubmitting}
            className={cn(
              "inline-flex items-center gap-2 rounded-[8px] px-6 py-3 font-jakarta text-[15px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isValid && !isSubmitting
                ? "bg-accent cursor-pointer text-white hover:bg-accent/90"
                : "cursor-not-allowed bg-[#d1d5db] text-white"
            )}
          >
            {isSubmitting ? (
              "Submitting…"
            ) : (
              <>
                Submit
                <ContinueArrowIcon />
              </>
            )}
          </button>
        </div>
      </footer>
    </article>
  );
}

function AssessmentStepCard({
  groupId,
  question,
  responses,
  currentIndex,
  onSingle,
  onToggleMulti,
  onContinue,
  isValid,
  ctaLabel,
  contentTopClassName,
}: {
  groupId: string;
  question: AssessmentQuestion;
  responses: AssessmentResponses;
  currentIndex: number;
  onSingle: (id: string) => void;
  onToggleMulti: (id: string) => void;
  onContinue: () => void;
  isValid: boolean;
  ctaLabel: string;
  contentTopClassName: string;
}) {
  const value = responses[currentIndex];
  const fieldsetLegend = question.fieldsetHint
    ? `${question.question} ${question.fieldsetHint}`
    : `${question.question} Choose one option.`;

  return (
    <article
      className={cn(
        "mx-auto max-w-[997px] overflow-hidden rounded-[16px] bg-white shadow-[0_12px_40px_-12px_rgba(15,37,69,0.18)]",
        contentTopClassName
      )}
    >
      <header className="flex items-center gap-2 bg-surface-deep px-4 py-5 md:gap-4 md:px-7 md:py-6">
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0D7377] px-2 py-0.5 font-sans text-[13px] font-bold uppercase text-white"
          aria-hidden
        >
          Q{question.questionNumber}
        </span>
        <h1 className="font-jakarta text-[22px] font-bold leading-snug text-white">
          {question.question}
        </h1>
      </header>

      <div className="px-4 py-5 md:px-7 md:py-6">
        <fieldset>
          <legend className="sr-only">{fieldsetLegend}</legend>
          <div className="flex flex-col gap-2.5">
            {question.options.map((opt) => {
              const inputId = `${groupId}-${question.id}-${opt.id}`;
              if (question.kind === "single") {
                const isOn = value === opt.id;
                return (
                  <label
                    key={opt.id}
                    htmlFor={inputId}
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-[10px] border bg-[#F8F9FB] px-4 py-4 transition-colors md:px-5 md:py-4",
                      "border-[#EEF0F4] hover:border-[#d1d5db]",
                      isOn && "border-surface-deep bg-white ring-0.5 ring-surface-deep/20"
                    )}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={`assessment-${groupId}-${question.id}`}
                      value={opt.id}
                      checked={isOn}
                      onChange={() => onSingle(opt.id)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        isOn ? "border-surface-deep" : "border-[#9ca3af]"
                      )}
                      aria-hidden
                    >
                      <span
                        className={cn(
                          "size-2 h-[8px] w-[8px] rounded-full bg-surface-deep transition-opacity",
                          isOn ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </span>
                    <span className="text-left text-[15px] font-normal leading-snug text-[#1C2A3A]">
                      {opt.label}
                    </span>
                  </label>
                );
              }

              const selected = Array.isArray(value) ? value : [];
              const isOn = selected.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  htmlFor={inputId}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-[10px] border bg-[#F8F9FB] px-4 py-4 transition-colors md:px-5 md:py-4",
                    "border-[#EEF0F4] hover:border-[#d1d5db]",
                    isOn && "border-surface-deep bg-white ring-0.5 ring-surface-deep/20"
                  )}
                >
                  <input
                    id={inputId}
                    type="checkbox"
                    name={`assessment-${groupId}-${question.id}`}
                    value={opt.id}
                    checked={isOn}
                    onChange={() => onToggleMulti(opt.id)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded border-2 transition-colors",
                      isOn
                        ? "border-surface-deep bg-surface-deep"
                        : "border-[#9ca3af] bg-white"
                    )}
                    aria-hidden
                  >
                    {isOn ? <CheckIcon className="size-2.5" /> : null}
                  </span>
                  <span className="text-left text-[15px] font-normal leading-snug text-[#1C2A3A]">
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <footer className="border-t border-[#0000004D] px-4 py-4 md:px-7 md:py-5">
        <div className="flex justify-end">
          <button
            type="button"
            disabled={!isValid}
            onClick={onContinue}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-[8px] px-6 py-3 font-jakarta text-[15px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isValid
                ? "bg-accent cursor-pointer text-white hover:bg-accent/90"
                : "cursor-not-allowed bg-[#d1d5db] text-white"
            )}
          >
            {ctaLabel}
            <ContinueArrowIcon />
          </button>
        </div>
      </footer>
    </article>
  );
}

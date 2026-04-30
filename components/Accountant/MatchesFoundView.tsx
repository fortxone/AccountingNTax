"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("size-4 shrink-0 text-white/80", className)}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const MATCH_TAGS = [
  "E-commerce",
  "Small Business",
  "VAT Returns",
  "Self-Assessment",
] as const;

/** Passed to booking modal title and confirmation copy parent. */
export const MATCH_BOOK_WITH = "Raj Patel Co. ICAEW";
export const MATCH_INTRO_NAME = "Raj Patel";

export type MatchesFoundViewProps = {
  onBookConsultation: () => void;
};

export function MatchesFoundView({ onBookConsultation }: MatchesFoundViewProps) {
  return (
    <div className="mx-auto w-full max-w-[997px] space-y-8 pb-8 md:pb-12">
      <section
        className="overflow-hidden rounded-3xl bg-[#0b1d33] p-4 text-white shadow-[0_20px_50px_-20px_rgba(10,29,55,0.55)] md:p-8"
        aria-labelledby="match-card-name"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="flex items-start gap-4 md:gap-5">
              <div
                className="flex size-[60px] shrink-0 items-center justify-center border border-[#ABC7C9] rounded-[7px] bg-accent font-jakarta text-[20px] font-normal tracking-tight text-[#92B8B7] "
                aria-hidden
              >
                RP
              </div>
              <div className="min-w-0 space-y-2.5 pt-0.5">
                <h2
                  id="match-card-name"
                  className="font-jakarta text-[20px] font-normal leading-snug text-white "
                >
                  {MATCH_BOOK_WITH}
                </h2>
                <div>
                  <span className="inline-flex rounded-[4px] border border-[0.5px] border-white px-2.5 py-0.5  font-jakarta text-[12px] uppercase tracking-wide text-white">
                    ICAEW
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-[#CCCFD6]">
                  <span className="font-semibold">4.8</span>
                  <span>reviews</span>
                  <Image
                    src="/icons/stars.png"
                    alt=""
                    width={108}
                    height={19}
                    className="ml-0.5 h-[12px] w-auto shrink-0"
                  />
                </div>
                <p className="flex items-start gap-2 text-[14px] leading-snug text-[#CCCFD6]">
                  <PinIcon className="mt-0.5" />
                  <span>Manchester&nbsp;&mdash; Remote Available</span>
                </p>
              </div>
            </div>
            <span className="inline-flex w-fit shrink-0 self-start rounded-[16px] bg-accent px-4 py-1.5 font-sans text-[14px] font-semibold uppercase tracking-wider text-white sm:mt-1">
              Best match
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {MATCH_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-[8px] border border-[#ECF4F4] bg-[#ECF4F4] px-3.5 py-0.5 font-sans text-[12px] font-medium text-[#94B8BB]"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onBookConsultation}
            className="mt-2 w-full rounded-[15px] bg-[#137a7f] h-[56px] font-jakarta text-[16px] font-bold text-white transition hover:bg-[#137a7f]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-base"
          >
            Book Your Free 30-Min Consultation
          </button>
        </div>
      </section>

      <aside className="rounded-[20px] bg-[#E9F0F2] px-5 py-4 text-center font-sans text-sm leading-[24px] text-[#BBC3CD] md:px-10 md:py-6 md:text-[20px]">
        <p>
          Not sure which match to choose? All three have been selected because
          they are a strong fit for your needs. We recommend booking a free
          30-minute call with your top choice to see if it feels right. There is
          no obligation and no cost.
        </p>
      </aside>
    </div>
  );
}

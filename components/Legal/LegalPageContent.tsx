import { type ReactNode } from "react";
import { Text } from "@/components/ui/Text";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

type Props = {
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
};

export default function LegalPageContent({ lastUpdated, intro, sections }: Props) {
  return (
    <section className="relative z-10 -mt-[60px] rounded-[32px] md:rounded-[50px] bg-white px-6 py-16 md:px-10 md:py-20 lg:px-0 lg:pt-[76px] lg:pb-[100px]">
      <div className="mx-auto max-w-[1245px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-20">

          {/* ── Sticky TOC sidebar ─────────────────────────────────────────── */}
          <aside className="shrink-0 lg:w-[260px] xl:w-[280px]">
            <div className="lg:sticky lg:top-8">
              <p className="mb-1 font-sans text-[11px] font-bold uppercase tracking-widest text-[#0D7377]">
                Contents
              </p>
              <nav aria-label="Page contents">
                <ul className="mt-3 flex flex-col gap-1">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-start gap-2.5 rounded-md px-2 py-1.5 font-sans text-[13px] font-medium text-[#1C2A3A] transition hover:bg-[#F0F9FA] hover:text-[#0D7377]"
                      >
                        <span className="mt-px shrink-0 text-[11px] font-bold text-[#0D7377]/60 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 rounded-[12px] border border-[#EEF0F4] bg-[#F8F9FB] px-4 py-4">
                <p className="font-sans text-[12px] text-[#64748b]">
                  Last updated
                </p>
                <p className="mt-0.5 font-sans text-[13px] font-semibold text-[#1C2A3A]">
                  {lastUpdated}
                </p>
              </div>
            </div>
          </aside>

          {/* ── Main content ───────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            {/* Intro */}
            <div className="mb-10 rounded-[14px] bg-[#F0F9FA] px-6 py-6 md:px-8 md:py-7">
              <div className="font-sans text-[15px] leading-relaxed text-[#1C2A3A] md:text-[16px]">
                {intro}
              </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-10">
              {sections.map((s, i) => (
                <div key={s.id} id={s.id} className="scroll-mt-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#0D7377] font-sans text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <Text
                      as="h2"
                      variant="content"
                      className="font-jakarta text-[20px] font-bold leading-snug text-[#0F2545] md:text-[22px]"
                    >
                      {s.heading}
                    </Text>
                  </div>
                  <div className="legal-body border-l-2 border-[#EEF0F4] pl-5 font-sans text-[15px] leading-[1.8] text-[#3A4A5C] md:text-[16px]">
                    {s.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

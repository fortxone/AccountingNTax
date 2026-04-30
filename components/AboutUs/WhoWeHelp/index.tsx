"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Text } from "@/components/ui/Text";

import whoWeHelpBg from "@/public/images/about-us/who-we-help-bg.png";
import whoWeHelpImage from "@/public/images/about-us/who-we-help.png";

/* ─── data ───────────────────────────────────────────────────────────────── */

const segments = [
  {
    number: "01",
    title: "Small Businesses & SMEs",
    description:
      "From limited companies to partnerships, we match growing businesses with accountants who specialise in your sector and scale.",
  },
  {
    number: "02",
    title: "Sole Traders & Freelancers",
    description:
      "Self-employed and doing your self-assessment? We find accountants who specialise in making your finances simple and compliant.",
  },
  {
    number: "03",
    title: "Startups & Entrepreneurs",
    description:
      "Need help with incorporation, R&D tax credits, investor-ready accounts, or financial forecasting? We match you with startup-specialist accountants.",
  },
  {
    number: "04",
    title: "Individuals",
    description:
      "Personal tax returns, capital gains, inheritance tax planning, or making sense of HMRC — we connect individuals with accountants who make it stress-free.",
  },
  {
    number: "05",
    title: "International Clients",
    description:
      "Operating across borders? We work with accountants who have cross-border expertise and can advise on UK tax obligations for international businesses and expats.",
  },
] as const;


/* ─── component ──────────────────────────────────────────────────────────── */

export default function WhoWeHelp() {
  /**
   * reachedIndex = highest item whose top edge has crossed the trigger line.
   * Recalculated on every scroll — goes UP when scrolling down, DOWN when scrolling up.
   */
  const [reachedIndex, setReachedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const TRIGGER = window.innerHeight * 0.65; // 65% down the viewport

    const calculate = () => {
      let next = -1;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        if (top < TRIGGER) next = i;
      });
      setReachedIndex(next);
    };

    calculate(); // run once on mount
    window.addEventListener("scroll", calculate, { passive: true });
    return () => window.removeEventListener("scroll", calculate);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 xl:px-0 py-16 md:py-20 lg:py-[107px] md:mb-[70px] mb-[50px]">
      {/* Background */}
      <Image
        src={whoWeHelpBg}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-surface-deep/85" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[1245px] flex-col justify-between gap-12 lg:flex-row lg:items-start lg:gap-[20px]">

        {/* ── Left: heading + list ───────────────────────────────────────── */}
        <div className="lg:max-w-[450px] w-full">
          <Text as="h2" leading="tight" className="mb-10 text-white">
            Who We Help
          </Text>

          <ul className="space-y-8">
            {segments.map((seg, i) => {
              const isActive = i <= reachedIndex;

              return (
                <li
                  key={seg.number}
                  ref={(el) => { itemRefs.current[i] = el; }}
                >
                  {/* Number + Title row */}
                  <div className="flex items-baseline gap-2">
                    <span
                      className="shrink-0 font-sans md:text-[36px] text-[24px] font-bold leading-none transition-colors duration-500"
                      style={{ color: isActive ? "#E7A916" : "#ffffff" }}
                    >
                      {seg.number}
                    </span>
                    <span
                      className="font-sans md:text-[30px] text-[24px] font-bold leading-none transition-colors duration-500"
                      style={{ color: isActive ? "#E7A916" : "#ffffff" }}
                    >
                      {seg.title}
                    </span>
                  </div>

                  {/* Description with left border */}
                  <div
                    className="ml-[24px] mt-3 border-l-2 pl-5 transition-colors duration-500"
                    style={{ borderColor: isActive ? "#E7A916" : "#ffffff" }}
                  >
                    <Text
                      as="p"
                      className="font-jakarta md:text-[18px] text-[15px] text-white font-normal md:leading-[25px] leading-[20px] transition-colors duration-500"
                    >
                      {seg.description}
                    </Text>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Right: image ───────────────────────────────────────────────── */}
        <div className="w-full xl:shrink-0 lg:w-[688px] ">
          <div className="relative lg:h-[960px] md:h-[500px] h-[300px] w-full overflow-hidden ">
            <Image
              src={whoWeHelpImage}
              alt="People working in a modern office"
              fill
              className="object-cover object-top lg:object-center md:rounded-[50px] rounded-[20px]"
              sizes="(max-width: 1024px) 100vw, 688px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

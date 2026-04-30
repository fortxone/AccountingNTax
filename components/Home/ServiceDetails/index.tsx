"use client";

import { useState } from "react";
import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import { TrustStarIcon } from "@/components/ui/icons";

const stats = [
  { value: "500+", label: "Vetted Accountants" },
  { value: "UK-WIDE", label: "Coverage + International" },
  { value: "3 Minutes", label: "To Find Your Match" },
  { value: "Free", label: "No Cost To You" },
] as const;

const trustItems = [
  {
    title: "Specialist Accountants for Different Needs",
    description:
      "We work with accountants who specialise in a wide range of areas, including sole traders, limited companies, contractors, landlords, startups, and growing businesses.",
  },
  {
    title: "Matched to Your Requirements",
    description:
      "We take the time to understand your business and accounting needs, so we can connect you with an accountant who is genuinely suited to your requirements.",
  },
  {
    title: "Fast and Simple Process",
    description:
      "In many cases, you could be matched and signed up with an accountant in as little as 1 hour, helping you get the support you need quickly.",
  },
  {
    title: "No Fee for Using Our Service",
    description:
      "We do not charge you any fee for using our accountant-matching service.",
  },
  {
    title: "Compare Before You Decide",
    description:
      "We help you receive quotes from suitable accounting firms, giving you the confidence to compare your options before choosing.",
  },
  {
    title: "Designed to Save You Time",
    description:
      "Instead of contacting multiple accountants yourself, we simplify the process by helping you find suitable options in one place.",
  },
  {
    title: "Support from Start to Finish",
    description:
      "We guide you through the process, from understanding your requirements to helping you connect with the right accountant.",
  },
] as const;

/** Inset from top/bottom so vertical rules don't touch the rounded frame */
const dividerInsetY = "top-8 bottom-8 md:top-10 md:bottom-10";

export default function ServiceDetails() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative z-20 bg-white md:rounded-t-[50px] rounded-t-[32px] overflow-hidden md:-mt-[30px] my-10 md:mx-auto md:my-16 md:pt-[60px]  lg:pb-[47px] xl:px-0 px-4">
      <section className="mx-auto md:max-w-[1245px]" aria-label="Service highlights">

        {/* ── Stats banner ── */}
        {/* <div className="relative flex items-center justify-center min-h-[188px] w-full overflow-hidden rounded-[24px] md:min-h-[220px] md:rounded-[28px]">
          <Image
            src="/images/home/servicebg.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1245px"
            priority={false}
          />
          <div className="absolute inset-0 bg-surface-deep/25" aria-hidden />

          <span className="pointer-events-none absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2 bg-white md:hidden" aria-hidden />
          <span className="pointer-events-none absolute top-1/2 left-[12%] right-[12%] h-px -translate-y-1/2 bg-white md:hidden" aria-hidden />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className={cn(
                  "relative flex flex-col text-center justify-center items-center px-2 py-8 md:py-12 lg:py-14",
                  index === 0 ? "lg:items-end lg:text-right lg:pr-[59px] lg:pl-0"
                    : index === 3 ? "lg:items-start lg:text-left lg:pl-[59px] lg:pr-0"
                      : "items-center text-center lg:px-[55px]"
                )}
              >
                {index > 0 && (
                  <span
                    className={cn(
                      "pointer-events-none absolute left-0 hidden w-px bg-white md:block",
                      dividerInsetY
                    )}
                    aria-hidden
                  />
                )}
                <Text
                  as="p"
                  variant="content"
                  className="font-sans text-[32px] font-bold leading-tight text-white md:text-[34px] lg:text-[42px]"
                >
                  {stat.value}
                </Text>
                <Text
                  as="p"
                  variant="content"
                  className="mt-4 max-w-44 font-jakarta text-[14px] leading-[20px] font-normal md:leading-snug text-white md:max-w-none md:text-[14px]"
                >
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </div> */}

        {/* ── Why Trust Us ── */}
        <section
          className="relative mt-10 md:mt-12 w-full overflow-hidden rounded-[24px] md:rounded-[28px]"
          aria-labelledby="why-trust-us-heading"
        >
          {/* Background */}
          <Image
            src="/images/home/servicebg.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1245px"
          />
          <div className="absolute inset-0 bg-[#0A1E3A]/80" aria-hidden />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[480px_1fr]">

            {/* ── Left nav panel ── */}
            <div className="flex flex-col p-8 md:p-10 lg:border-r lg:border-white/10">
              <Text
                as="h2"
                id="why-trust-us-heading"
                className="font-sans text-[28px] font-bold tracking-tight text-white md:text-[36px] lg:text-[50px]"
              >
                Why Trust Us?
              </Text>
              <Text
                as="p"
                className="mt-2 font-jakarta text-[15px] font-medium text-white/80"
              >
                Here is why businesses across the UK choose AccountingNTax.
              </Text>

              <ul className="mt-7 space-y-2">
                {trustItems.map((item, index) => (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={active === index}
                      className={cn(
                        "group flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200",
                        active === index
                          ? "bg-[#0D7377] shadow-lg shadow-[#0D7377]/20"
                          : "hover:bg-white/8"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-sans text-[11px] font-bold transition-colors duration-200",
                          active === index
                            ? "bg-white text-[#0D7377]"
                            : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-sans text-[14px] font-semibold leading-snug transition-colors duration-200",
                          active === index
                            ? "text-white"
                            : "text-white/55 group-hover:text-white/90"
                        )}
                      >
                        {item.title}
                      </span>
                    </button>

                    {/* Mobile: inline expanded description */}
                    {active === index && (
                      <div className="mt-2 ml-10 pr-2 lg:hidden">
                        <p className="font-sans text-[13px] leading-[21px] text-white/70">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Right content panel (desktop only) ── */}
            <div className="relative hidden flex-col justify-center overflow-hidden p-10 lg:flex xl:p-14">
              {/* Decorative background number */}
              <span
                className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-sans text-[180px] font-black leading-none text-white/[0.04]"
                aria-hidden
              >
                {String(active + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D7377] shadow-lg shadow-[#0D7377]/40">
                  <TrustStarIcon />
                </div>

                {/* Title */}
                <Text
                  as="h3"
                  className="mt-6 font-sans text-[26px] font-bold leading-[34px] text-white lg:text-[28px]"
                >
                  {trustItems[active].title}
                </Text>

                {/* Description */}
                <p className="mt-4 max-w-[440px] font-sans text-[15px] leading-[27px] text-white/70">
                  {trustItems[active].description}
                </p>

                {/* Progress indicator dots */}
                <div className="mt-10 flex items-center gap-2" role="tablist" aria-label="Trust points">
                  {trustItems.map((item, i) => (
                    <button
                      key={item.title}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`View: ${item.title}`}
                      onClick={() => setActive(i)}
                      className={cn(
                        "h-[3px] rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white",
                        i === active
                          ? "w-8 bg-[#0D7377]"
                          : "w-3 bg-white/25 hover:bg-white/50 cursor-pointer"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

      </section>
    </div>
  );
}

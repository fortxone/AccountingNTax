import type { ReactNode } from "react";
import Image from "next/image";

import { Text } from "@/components/ui/Text";

import herobg from "@/public/images/singlepage-hero/hero-bg.jpeg";

export type PageHeroProps = {
  title: string;
  subtitle?: string;
  subtitleMaxWidth?: string;
  /** Optional small line shown above the title. */
  eyebrow?: string;
  /** Optional content shown under the subtitle, e.g. a call-to-action button. */
  children?: ReactNode;
};


export default function PageHero({
  title,
  subtitle,
  subtitleMaxWidth = "max-w-[681px]",
  eyebrow,
  children,
}: PageHeroProps) {
  return (
    <section
      className="relative isolate flex min-h-[440px] flex-col overflow-hidden md:min-h-[500px]  bg-[#0F2545B2]"
      aria-labelledby="page-hero-heading"
    >
      <Image
        src={herobg}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />


      <div className="relative z-10 flex pt-40 md:pt-0 md:pb-0 mb-20 md:mb-0  pb-10  flex-1 flex-col">

        <div className="flex  flex-1 flex-col justify-start  items-center md:justify-center xl:justify-start px-5 lg:pt-[100px] xl:pt-[220px] text-center ">
          {eyebrow && (
            <p className="mb-3 font-sans text-[13px] font-semibold uppercase tracking-[2px] text-white/80 md:text-[14px]">
              {eyebrow}
            </p>
          )}

          <Text
            as="h1"
            id="page-hero-heading"
            className="text-balance lg:text-[50px] md:text-[36px] text-[30px] leading-[34px] text-white [overflow-wrap:anywhere]"
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              as="p"
              className={`mx-auto mt-2 ${subtitleMaxWidth} text-pretty text-white text-[20px] leading-[28px] md:text-[28px] md:leading-[38px]`}
            >
              {subtitle}
            </Text>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

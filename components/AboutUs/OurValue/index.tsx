import Image from "next/image";

import { Text } from "@/components/ui/Text";
import { type ReactNode } from "react";

import cardBg from "@/public/images/about-us/our-value-card-bg.png";

import transparencyIcon from "@/public/images/about-us/transparency 1.png";
import precisionIcon from "@/public/images/about-us/precision 1.png";
import trustIcon from "@/public/images/about-us/trust 1.png";
import speedIcon from "@/public/images/about-us/speed-radar 1.png";
import partnershipIcon from "@/public/images/about-us/partnership 1.png";

/* ─── data ───────────────────────────────────────────────────────────────── */

const values: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Transparency",
    icon: <Image src={transparencyIcon} alt="Transparency" />,
    description:
      "We make our process clear, so you understand what to expect at every stage.",
  },
  {
    title: "Suitability",
    icon: <Image src={precisionIcon} alt="Suitability" />,
    description:
      "We focus on identifying firms that are appropriate for your business needs, not just making generic introductions.",
  },
  {
    title: "Choice",
    icon: <Image src={partnershipIcon} alt="Choice" />,
    description:
      "We believe clients should be able to compare suitable options before making a decision.",
  },
  {
    title: "Trust",
    icon: <Image src={trustIcon} alt="Trust" />,
    description:
      "We work only with qualified and vetted accounting firms.",
  },
  {
    title: "Efficiency",
    icon: <Image src={speedIcon} alt="Efficiency" />,
    description:
      "We save businesses time by reducing the effort involved in searching for and comparing accountants.",
  },
];

/* ─── value card ─────────────────────────────────────────────────────────── */

function ValueCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="relative min-h-[295px] flex flex-col justify-center items-center w-full lg:max-w-[386px] max-w-full overflow-hidden rounded-[20px] px-[14px] py-8 text-center">
      {/* Card dark background */}
      <Image
        src={cardBg}
        alt=""
        fill
        className="object-cover object-center"
        sizes="386px"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center ">
        <div
          className="flex shrink-0 items-center justify-center rounded-[8px] mb-3 bg-[#0D7377] md:w-[64px] md:h-[66px] w-[48px] h-[48px] "
        >
          {icon}
        </div>

        <Text
          as="h3"
          variant="content"
          className=" text-[20px] md:text-[24px] md:leading-[100%]  font-bold  text-white mb-[14px]"
        >
          {title}
        </Text>

        <Text
          as="p"
          className="text-[15px] md:text-[19px] md:leading-[28px] font-normal leading-[24px] text-white max-w-[358px]"

        >
          {description}
        </Text>
      </div>
    </div>
  );
}

/* ─── section ────────────────────────────────────────────────────────────── */

export default function OurValue() {
  return (
    <section className="bg-white px-4 py-16 md:py-20 xl:px-0" aria-labelledby="our-value-heading">
      <div className="mx-auto max-w-[1245px]">
        <Text
          as="h2"
          id="our-value-heading"
          leading="tight"
          className="md:mb-12 mb-10 text-center text-[#0F2545]"
        >
          Our Values
        </Text>

        {/* Row 1: 3 cards */}
        <div className="flex flex-wrap justify-center gap-x-[42px] gap-y-[22px]">
          {values.slice(0, 3).map((v) => (
            <ValueCard key={v.title} {...v} />
          ))}
        </div>
        {/* Row 2: 2 cards, centered */}
        <div className="mt-[22px] flex flex-wrap justify-center gap-x-[42px] gap-y-[22px]">
          {values.slice(3).map((v) => (
            <ValueCard key={v.title} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}

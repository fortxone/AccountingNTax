"use client";

import Image from "next/image";
import { useState } from "react";
import AccordionItem from "@/components/ui/accordion-item";
import { Text } from "@/components/ui/Text";


const items: { title: string; content: string }[] = [
  {
    title: "A Better Way to Compare",
    content:
      "We do more than introduce you to one accountant. We help you receive quotes from at least two suitable firms, so you can compare your options and make a more informed decision.",
  },
  {
    title: "Tailored to Your Needs",
    content:
      "Every business is different. Our assessment and consultation process helps us understand your requirements and identify accounting firms that are relevant to your size, sector, and needs.",
  },
  {
    title: "Save Time",
    content:
      "No more searching through directories or contacting multiple firms yourself. We make the process simpler, quicker, and more efficient.",
  },
  {
    title: "Confidence in Your Choice",
    content:
      "By receiving multiple suitable quotes, you can move forward with greater clarity and confidence.",
  },
];

const leftItems = items.filter((_, i) => i % 2 === 0);
const rightItems = items.filter((_, i) => i % 2 !== 0);

function AccordionColumn({
  items: columnItems,
  defaultOpenIndex = 0,
}: {
  items: { title: string; content: string }[];
  defaultOpenIndex?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  return (
    <div className="flex flex-col gap-6">
      {columnItems.map(({ title, content }, index) => (
        <AccordionItem
          key={title}
          title={title}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        >
          {content}
        </AccordionItem>
      ))}
    </div>
  );
}

export default function WhyAccounting() {
  return (
    <section
      className="  bg-[#0D1E38] relative lg:pt-[76px] lg:pb-[105px] px-4 xl:px-0` py-10 md:py-16 md:pb-[100px] overflow-hidden md:rounded-t-[50px] rounded-t-[32px]"
    >
      <Image
        src="/images/home/accountingbg.png"
        alt=""
        fill
        className="object-cover object-center absolute z-10"
        sizes=" 100vw, 1245px"
        priority={false}
      />
      <div className="relative  overflow-hidden   md:mx-auto  md:max-w-[1245px]">

        <div className="absolute inset-0 bg-surface-deep/35" aria-hidden />

        <div className="relative z-10  ">
          <Text
            as="h1"
            variant="content"
            className="mb-8  text-[36px] font-bold text-white md:mb-10 md:text-[50px]"
          >
            Why AccountingNTax?
          </Text>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
            <AccordionColumn items={leftItems} defaultOpenIndex={-1} />
            <AccordionColumn items={rightItems} defaultOpenIndex={-1} />
          </div>
        </div>
      </div>
    </section>
  );
}

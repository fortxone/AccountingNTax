import Image from "next/image";
import { Text } from "@/components/ui/Text";
import howItWorksImage from "@/public/images/home/howitworks.png";
import type { ReactNode } from "react";

const steps: { title: string; description: ReactNode; iconSrc: string }[] = [
  {
    title: "Complete the Assessment",
    description:
      "Answer a few short questions about your business, your accounting needs, and the type of support you are looking for.",
    iconSrc: "/images/home/tellus.png",
  },
  {
    title: "Book a 30-Minute Consultation",
    description:
      "Book a 30-minute consultation so we can better understand your requirements and the type of accounting support you need.",
    iconSrc: "/images/home/consultation.png",
  },
  {
    title: "Receive Quotes from Suitable Firms",
    description:
      "Based on your assessment and consultation, we will obtain quotes from at least two suitable accounting firms that match your requirements.",
    iconSrc: "/images/home/yourmatch.png",
  },
  {
    title: "Compare and Choose",
    description:
      "Review your quotes, compare your options with confidence, and choose the accounting firm that best suits your business.",
    iconSrc: "/images/home/compare.png",
  },
  {
    title: "Claim Your £50 Amazon Gift Voucher",
    description: (
      <>
        Once you choose your accountant through AccountingNTax, you will receive a{" "}
        <strong>£50 Amazon gift voucher</strong> as a thank-you for using our service. This offer
        applies once you have successfully signed up with one of the recommended accounting firms.
      </>
    ),
    iconSrc: "/images/home/discount.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="how-it-works-heading">
      <div className="mx-auto w-full max-w-[1245px] px-4 xl:px-0">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[38px]">
          <div className="flex-1">
            <Text
              as="h2"
              id="how-it-works-heading"
              className="font-sans font-bold tracking-tight text-black md:text-[50px]"
            >
              How It Works
            </Text>
            <Text
              as="p"
              className="mt-3 max-w-xl font-jakarta font-medium text-black md:text-[24px] md:max-w-[496px] w-full"
            >
              Finding your perfect accountant has never been simpler.
            </Text>
            <ul className="md:mt-[59px] mt-[32px] space-y-10">
              {steps.map((step) => (
                <li key={step.title} className="flex gap-5">
                  <div
                    className="relative md:h-[64px] h-[56px] md:w-[64px] w-[56px] shrink-0 overflow-hidden rounded-xl"
                    aria-hidden
                  >
                    <Image
                      src={step.iconSrc}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="md:64px h-[56px]"
                    />
                  </div>
                  <div className="max-w-[490px]">
                    <Text
                      as="h3"
                      variant="content"
                      className="font-sans text-[20px] md:text-[20px] md:leading-[28px] leading-[24px] font-bold text-black"
                    >
                      {step.title}
                    </Text>
                    <Text
                      as="p"
                      className="mt-1 font-sans text-[15px] lg:text-[15px] font-normal leading-[20px] lg:leading-[20px] text-[#333333]"
                    >
                      {step.description}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex w-full flex-1 justify-center xl:justify-end md:h-[740px] md:w-[604px]">
            <div className="relative aspect-square w-full max-w-[604px] overflow-hidden rounded-[40px] lg:aspect-604/740 lg:h-auto lg:w-[604px] lg:max-w-none">
              <Image
                src={howItWorksImage}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1023px) min(100vw, 604px), 604px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

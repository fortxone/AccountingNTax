import Image from "next/image";

import { Text } from "@/components/ui/Text";
import Button from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";

const trustItems = [
  "Completely free",
  "No commitment required",
  "Takes less than 3 minutes",
] as const;

export default function HeroSection() {
  return (
    <section
      className="relative isolate flex min-h-[min(100svh,880px)] flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Image
        src="/images/home/herobg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center  px-4 xl:px-0  py-16 pt-[140px] md:pt-[246px] max-w-[1245px] mx-auto w-full">
          <div className="max-w-[820px] space-y-6 text-left">
            <Text as="h1" id="hero-heading" className="max-w-[722px] text-balance text-white">
              Find the Right Accountant <br className="hidden md:block" /> for Your Business
            </Text>
            <Text as="p" className="text-pretty text-white ">
              Complete our assessment, book a 30-minute consultation, and receive quotes from at least two suitable accounting firms based on your requirements. Compare your options with confidence, choose the firm that is right for you.
            </Text>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="my-accountant" className="font-jakarta font-bold">
                Start Your Free Assessment
                <span className="mt-1 -ml-1">
                  <svg
                    aria-hidden
                    className="size-[18px] shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8h6.5M8 4.5 11.5 8 8 11.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Button>
              <Button
                href="/consultation"
                backgroundClassName="bg-transparent"
                className="font-jakarta font-bold md:w-[290px] border border-white hover:bg-white/10"
              >
                Book Your 30-Minute Consultation
              </Button>
            </div>
          </div>
        </div>

        <Marquee
          items={trustItems}
          className="px-6 pt-5 pb-10 md:px-12 md:pb-12 lg:px-20 lg:pb-14"
        />
      </div>
    </section>
  );
}

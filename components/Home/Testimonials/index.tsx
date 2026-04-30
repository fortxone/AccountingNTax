"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Text } from "@/components/ui/Text";
import "swiper/css";

const testimonials = [
  {
    quote:
      "I had no idea where to start when it came to finding an accountant for my new consultancy. AccountingNTax matched me with the perfect person in minutes. The whole process was effortless.",
    attribution: "Sarah T - Freelance Consultant, London",
  },
  {
    quote:
      "We were growing fast and needed a specialist in e-commerce tax. The assessment really understood what we needed and connected us with an accountant who has been invaluable.",
    attribution: "James R - Founder, Online Retail Brand",
  },
  {
    quote:
      "As a sole trader doing my self-assessment, I never thought I'd find a dedicated accountant so easily. Booked a call the same afternoon I completed the assessment.",
    attribution: "Priya M. - Sole Trader, Manchester",
  },
  {
    quote:
      "Our startup needed R&D tax guidance and payroll support under one roof. The platform narrowed it down to accountants who actually work with companies our size—saved us weeks of cold emails.",
    attribution: "Alex K - Co-founder, SaaS Startup, Bristol",
  },
  {
    quote:
      "I'm a landlord with multiple properties and was dreading the switch to a new accountant. The matching was spot on; they understood rental income and CGT before we even met.",
    attribution: "Emma L - Property Investor, Birmingham",
  },
  {
    quote:
      "We run a small family café and needed someone local who gets hospitality VAT. AccountingNTax put us in touch with a brilliant firm—clear fees, no pressure, and we're sorted for year-end.",
    attribution: "David & Nina P - Café Owners, Edinburgh",
  },
] as const;

function TestimonialCard({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden rounded-[30px] bg-surface-deep md:min-h-[300px]">
      <Image
        src="/images/home/sliderbg.png"
        alt=""
        fill
        className="object-cover object-bottom opacity-95"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-surface-deep/30" aria-hidden />
      <div className="relative z-10 flex h-full min-h-0 flex-col px-6 py-6 md:px-10 md:py-8">
        <div className="shrink-0">
          <Image
            src="/images/home/coms.png"
            alt=""
            width={28}
            height={22}
            className="h-auto w-[43px] object-contain"
          />
        </div>
        <Text
          as="p"
          variant="content"
          className="min-h-0 flex-1 pt-4 text-left font-jakarta text-[18px] lg:text-[20px] font-medium leading-relaxed text-white md:pt-5"
        >
          {quote}
        </Text>
        <Text
          as="p"
          variant="content"
          className="mt-auto shrink-0 pt-6 text-left font-jakarta text-[16px] lg:text-[18px] font-normal text-white md:pt-8"
        >
          {attribution}
        </Text>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="mx-auto my-10 w-full max-w-[1500px] px-4 md:mt-16 md:px-6  lg:pb-[56px] lg:px-0"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-[1245px]">
        <Text
          as="h2"
          id="testimonials-heading"
          variant="content"
          className="mb-8 font-sans text-[36px] font-bold leading-tight text-black md:mb-10 md:text-[50px]"
        >
          What Our Users Say
        </Text>
      </div>
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="testimonials-swiper !pb-2"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.attribution} className="!h-auto">
            <TestimonialCard quote={item.quote} attribution={item.attribution} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

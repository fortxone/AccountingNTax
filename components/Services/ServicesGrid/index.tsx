import Image, { StaticImageData } from "next/image";

import { Text } from "@/components/ui/Text";

import service1 from "@/public/images/our-services/service-1.png";
import service2 from "@/public/images/our-services/service-2.png";
import service3 from "@/public/images/our-services/service-3.png";
import service4 from "@/public/images/our-services/service-4.png";
import service5 from "@/public/images/our-services/service-5.png";
import service6 from "@/public/images/our-services/service-6.png";
import service7 from "@/public/images/our-services/service-7.png";

type Service = {
  title: string;
  description: string;
  image: StaticImageData;

};

const services: Service[] = [
  {
    title: "Assessment-Based Matching",
    description: "We gather information about your business, requirements, and priorities through a simple assessment.",
    image: service1,
  },
  {
    title: "30-Minute Consultation Booking",
    description: "Book a consultation so we can better understand your needs and the type of support you are looking for.",
    image: service2,
  },
  {
    title: "Quotes from Suitable Firms",
    description: "We obtain quotes from at least two suitable accounting firms based on your requirements.",
    image: service3,
  },
  {
    title: "Comparison Support",
    description:
      "Our process helps you review your options clearly and choose the firm that best fits your needs.",
    image: service4,
  },
  {
    title: "Access to Qualified Firms",
    description: "We work with vetted accounting firms across a range of sectors and service areas.",
    image: service6,
  },
  {
    title: "Support for Businesses and Individuals",
    description: "Whether you are a sole trader, startup, SME, limited company, contractor, or individual taxpayer, we help you find suitable accounting support.",
    image: service7,
  },
];

function ServiceCard({ title, description, image }: Service) {
  return (
    <div className="group relative h-[400px] lg:h-[420px] lg:w-[400px] w-full block overflow-hidden rounded-[20px]">
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="100%"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 37, 69, 0) 20%, #0F2545 100%)",
        }}
        aria-hidden
      />

      {/* Heading + subheading */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-7 transition-all duration-300 ease-out lg:translate-y-[calc(100%-68px)] lg:group-hover:translate-y-0">
        <Text
          as="span"
          variant="content"
          className="md:text-[20px] text-[20px] md:leading-[26px] leading-[26px] font-semibold text-white mb-3"
        >
          {title}
        </Text>
        <Text
          as="p"
          className="md:text-[18px] text-[18px] md:leading-[26px] leading-[26px] text-white font-normal lg:opacity-0 lg:transition-opacity lg:duration-200 lg:delay-0 lg:group-hover:opacity-100 lg:group-hover:delay-150"
        >
          {description}
        </Text>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <section className="px-4 py-16 md:pt-[80px] md:pb-[130px] md:px-6 xl:px-0 rounded-[32px] md:rounded-[50px] -mt-[60px] bg-white z-10 relative" aria-label="Our services">
      <div className="mx-auto max-w-[1245px]">
        {/* Intro copy */}
        <Text
          as="p"
          className="mx-auto mb-[82px] max-w-[1200px] font-medium text-center text-[20px] leading-[32px] md:text-[26px] md:leading-[40px]"
        >
          AccountingNTax provides a structured accountant sourcing service for businesses and individuals. Complete our assessment, book a 30-minute consultation, and we will obtain quotes from at least two suitable accounting firms based on your requirements so you can compare options and choose the firm that best suits you.

        </Text>

        {/* 3 per row, 2 rows */}
        <div className="flex flex-wrap justify-start  gap-[30px] md:gap-y-[38px] md:gap-x-[19px]">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Text } from "@/components/ui/Text";

export default function Intro() {
  return (
    <section className="bg-white px-4 xl:px-0 py-14 md:py-20 " aria-label="About AccountingNTax">
      <div className="mx-auto max-w-[1245px]">
        <Text
          as="p"
          className="mx-auto max-w-[1220px] text-center text-[18px] leading-[30px] md:text-[22px] md:leading-[38px] font-medium"
        >
          At AccountingNTax, we simplify the process of finding the right accountant for your business. Complete our assessment, book a 30-minute consultation, and we will obtain quotes from at least two suitable accounting firms based on your requirements. You can then review your options with confidence and select the firm that is right for you. </Text>
      </div>
    </section>
  );
}

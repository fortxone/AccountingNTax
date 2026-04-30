import Image from "next/image";
import Button from "@/components/ui/button";
import { Text } from "@/components/ui/Text";

export default function FindYourAccount() {
  return (
    <section
      className="relative isolate min-h-[300px] w-full overflow-hidden bg-surface-deep  py-16 md:min-h-[340px] md:py-24"
      aria-labelledby="find-accountant-heading"
    >
      <Image
        src="/images/home/blocksbg.png"
        alt=""
        fill
        className="object-cover object-center w-full"
        sizes="100vw"
        priority={false}
      />
      <Image
        src="/images/home/maskbg.png"
        alt=""
        fill
        className="pointer-events-none object-cover object-center opacity-80"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-surface-deep/40" aria-hidden />

      <div className="relative z-10 mx-auto flex  flex-col items-center px-4 xl:px-0 text-center">
        <Text
          as="h2"
          id="find-accountant-heading"
          variant="content"
          className="font-sans lg:text-[50px] md:text-[36px] text-[30px] font-bold leading-tight text-white"
        >
          Ready to Find Your Accountant?
        </Text>
        <Text
          as="p"
          variant="content"
          className="mt-3  max-w-[900px] font-jakarta lg:text-[26px] text-[20px] font-normal leading-relaxed text-white md:mt-[19px]"
        >
          Start today and let AccountingNTax simplify the process of finding the right accountant for you.

        </Text>
        <Button
          href="/my-accountant"
          className="mt-8 text-[16px] font-bold md:mt-10"
        >
          Start Your Free Assessment
        </Button>
      </div>
    </section>
  );
}

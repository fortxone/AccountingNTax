"use client";

import { useEffect, useRef, useState } from "react";

import PageHero from "@/components/shared/PageHero";
import PartnerForm from "@/components/Partner/PartnerForm";
import Button from "@/components/ui/button";
import { Text } from "@/components/ui/Text";

const benefits = [
  {
    title: "Relevant enquiries",
    text: "Connect with clients matched to your firm’s specialisms.",
  },
  {
    title: "Grow your practice",
    text: "Reach individuals and businesses seeking accounting support.",
  },
  {
    title: "Simple process",
    text: "Receive suitable enquiries and provide your own quotations.",
  },
] as const;

export default function BecomeAPartner() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Bring the form into view when it first appears.
  useEffect(() => {
    if (showForm) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

  return (
    <>
      <PageHero
        eyebrow="For UK accountancy practices"
        title="Become a Partner"
        subtitle="Join our network of trusted accounting firms and connect with potential clients whose requirements match your expertise and the services you offer."
        subtitleMaxWidth="max-w-[1000px]"
      >
        <Button
          type="button"
          onClick={() => setShowForm(true)}
          aria-expanded={showForm}
          aria-controls={showForm ? "partner-registration" : undefined}
        >
          Register Your Interest
        </Button>
      </PageHero>

      <section
        className="relative z-10 -mt-[60px] rounded-[32px] bg-white px-4 py-16 md:rounded-[50px] md:py-20 xl:px-0"
        aria-labelledby="why-partner-heading"
      >
        <div className="mx-auto max-w-[1245px]">
          <Text
            as="h2"
            id="why-partner-heading"
            leading="tight"
            className="text-center text-[28px] leading-[36px] text-surface-deep sm:text-[32px] md:text-[36px] md:leading-[44px]"
          >
            Why Partner with AccountingNTax?
          </Text>

          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="rounded-[16px] bg-[#F3F7F8] p-6 md:p-8"
              >
                <h3 className="font-jakarta text-[20px] font-bold text-accent">
                  {benefit.title}
                </h3>
                <p className="mt-2 font-sans text-[16px] leading-[26px] text-[#475569]">
                  {benefit.text}
                </p>
              </li>
            ))}
          </ul>

          {showForm && (
            <div
              ref={formRef}
              id="partner-registration"
              className="mt-16 scroll-mt-6 rounded-[24px] bg-[#F3F7F8] px-4 py-12 md:px-10 md:py-16"
            >
              <Text
                as="h2"
                leading="tight"
                className="text-center text-[28px] leading-[36px] text-surface-deep sm:text-[32px] md:text-[36px] md:leading-[44px]"
              >
                Partner Registration
              </Text>
              <p className="mx-auto mt-2 max-w-[600px] text-center font-sans text-[16px] leading-[26px] text-[#475569] md:text-[18px]">
                Tell us about your practice and the clients you can support.
              </p>

              <div className="mx-auto mt-10 max-w-[997px]">
                <PartnerForm />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

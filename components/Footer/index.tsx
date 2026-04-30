import Image from "next/image";
import Link from "next/link";

import { LinkedInIcon, FacebookIcon, InstagramIcon, YouTubeIcon, TrustStarIcon } from "@/components/ui/icons";

import footerBg from "@/public/images/footer/footer-bg.webp";

// ─── data ────────────────────────────────────────────────────────────────────

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-services", label: "Our Services" },
  { href: "/my-accountant", label: "Find My Accountant" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-&-conditions", label: "Terms & Conditions" },
  { href: "/cookie-policy", label: "Cookie Policy" },
] as const;

const trustPoints = [
  "Specialists matched to your business needs.",
  "Matched to your specific requirements.",
  "Signed up in as little as 1 hour.",
  "accountant-matching service is completely free to use.",
  "Compare quotes before deciding.",
  "Simplifying your search for the right accountant.",
] as const;

// ─── small shared components ──────────────────────────────────────────────────

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 font-sans text-[12px] tracking-[2px] font-semibold uppercase  text-white ">
      {children}
    </p>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="font-sans text-[15px] font-normal text-white transition  hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {label}
    </Link>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0A1E3A] ">
      {/* Background image */}
      <Image
        src={footerBg}
        alt=""
        fill
        aria-hidden
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
      />

      {/* ── Top gradient divider ── */}
      <div
        className="relative z-10 m-0 p-0 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 33.65%, #FFFFFF 70.19%, rgba(255,255,255,0) 100%)",
        }}
        aria-hidden
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-[1245px] px-4 xl:px-0 pb-[80px] pt-[96px]  lg:px-0">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[360px_251px_251px_251px] lg:gap-[32px]">

          {/* Col 1 — Brand */}
          <div className="flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo.svg"
                  alt="AccountingNTax"
                  width={243}
                  height={153}
                  className="h-[88px] w-auto"
                />
              </Link>
              <p className="mt-3 font-sans text-[16px] italic font-normal leading-relaxed text-white">
                A simpler way to find and compare the right accountant.
              </p>
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-3">
              {/* <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white text-white transition hover:border-white/60 hover:text-white"
              >
                <LinkedInIcon />
              </a> */}
              <a
                href="https://www.facebook.com/profile.php?id=61588854249444"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white text-white transition hover:border-white/60 hover:text-white"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/accountingntax.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white text-white transition hover:border-white/60 hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/channel/UCbproCQI9dizqFLq_6cT25Q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white text-white transition hover:border-white/60 hover:text-white"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Explore */}
          <nav aria-label="Explore">
            <ColHeading>Explore</ColHeading>
            <ul className="flex flex-col gap-4">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Legal + Contact */}
          <div>
            <ColHeading>Legal</ColHeading>
            <ul className="flex flex-col gap-4">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>

            {/* Divider + contact details */}
            {/* <div className="mt-6 flex flex-col gap-[14px]">
              <div className="py-3">
                <div className="h-px max-w-[180px] bg-white" />
              </div>
              <a
                href="mailto:consultant@accountingntax.co.uk"
                className="flex items-center gap-3 font-sans text-[14px] text-white transition hover:text-white"
              >
                <MailIcon />
                consultant@accountingntax.co.uk
              </a>
              <span className="flex items-center gap-3 font-sans text-[14px] text-white">
                <ClockIcon />
                Mon–Fri 9am–5:30pm GMT
              </span>
            </div> */}
          </div>

          {/* Col 4 — Why Trust Us */}
          <div>
            <ColHeading>Why Trust Us?</ColHeading>
            <ul className="flex flex-col gap-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-[3px] shrink-0 text-white">
                    <TrustStarIcon />
                  </span>
                  <span className="font-sans text-[13px] font-normal leading-[20px] text-white">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div>
        {/* ── Top gradient divider ── */}
        <div
          className="relative z-10 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 33.65%, #FFFFFF 70.19%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-10  w-full bg-[#0A1E3A] py-[24px] text-center">
          <p className="font-sans text-[14px] text-white">
            © 2026 AccountingNTax.co.uk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { Modal } from "@/components/ui/Modal";

// ─── Calendly global type ─────────────────────────────────────────────────────

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: { name?: string; email?: string };
        pageSettings?: {
          primaryColor?: string;
          textColor?: string;
          backgroundColor?: string;
          hideGdprBanner?: boolean;
          hideLandingPageDetails?: boolean;
          hideEventTypeDetails?: boolean;
        };
      }) => void;
    };
  }
}

// ─── Config ───────────────────────────────────────────────────────────────────

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

// Site palette — mirrors globals.css CSS variables (hex without #)
const PALETTE = {
  primaryColor:    "0d7377", // --accent (teal)
  textColor:       "0f2545", // --surface-deep (dark navy)
  backgroundColor: "ffffff",
} as const;

/**
 * Build the Calendly URL with colour params baked directly into the query string.
 * NOTE: Do NOT add embed_type or embed_domain here — those params can prevent
 * Calendly from applying custom colours on some account tiers.
 */
function buildCalendlyUrl(prefill?: { name?: string; email?: string }): string {
  if (!CALENDLY_URL) return "";
  try {
    const url = new URL(CALENDLY_URL);
    // Colour params — require Calendly Standard plan or higher to take effect
    url.searchParams.set("primary_color",    PALETTE.primaryColor);
    url.searchParams.set("text_color",       PALETTE.textColor);
    url.searchParams.set("background_color", PALETTE.backgroundColor);
    url.searchParams.set("hide_gdpr_banner", "1");
    if (prefill?.name)  url.searchParams.set("name",  prefill.name);
    if (prefill?.email) url.searchParams.set("email", prefill.email);
    return url.toString();
  } catch {
    return CALENDLY_URL;
  }
}

// ─── Calendly inline widget ───────────────────────────────────────────────────

export function CalendlyWidget({
  prefill,
  onScheduled,
}: {
  prefill?: { name?: string; email?: string };
  onScheduled: () => void | Promise<void>;
}) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const widgetUrl = buildCalendlyUrl(prefill);

  // Core initialiser — called by onLoad OR by the effect if script already present
  const initWidget = useCallback(() => {
    if (!containerRef.current || !window.Calendly || initializedRef.current) return;
    initializedRef.current = true;
    containerRef.current.innerHTML = "";          // clear any stale DOM
    window.Calendly.initInlineWidget({
      url: widgetUrl,
      parentElement: containerRef.current,
      prefill: { name: prefill?.name, email: prefill?.email },
      // pageSettings as a secondary signal (URL params are primary)
      pageSettings: {
        primaryColor:    PALETTE.primaryColor,
        textColor:       PALETTE.textColor,
        backgroundColor: PALETTE.backgroundColor,
        hideGdprBanner:  true,
      },
    });
  }, [widgetUrl, prefill?.name, prefill?.email]);

  // Inject Calendly CSS once, and init immediately if script already loaded
  useEffect(() => {
    const CSS = "https://assets.calendly.com/assets/external/widget.css";
    if (!document.querySelector(`link[href="${CSS}"]`)) {
      const link = document.createElement("link");
      link.rel  = "stylesheet";
      link.href = CSS;
      document.head.appendChild(link);
    }
    if (window.Calendly) initWidget();
  }, [initWidget]);

  // Booking-confirmed postMessage from Calendly's iframe
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      if (typeof e.data === "object" && e.data?.event === "calendly.event_scheduled") {
        // Await so async callbacks (e.g. sending assessment email) run fully
        Promise.resolve(onScheduled()).catch(console.error);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onScheduled]);

  // Reset init flag on unmount so a remount re-initialises cleanly
  useEffect(() => () => { initializedRef.current = false; }, []);

  if (!CALENDLY_URL) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-[16px] border-2 border-dashed border-[#e5e7eb] p-12 text-center">
        <svg viewBox="0 0 24 24" fill="none" className="size-10 text-[#d1d5db]">
          <path
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          />
        </svg>
        <p className="text-[14px] text-[#9ca3af]">
          Calendly URL is not configured.
          <br />
          <span className="text-[12px]">
            Set <code className="rounded bg-[#f3f4f6] px-1 py-0.5">NEXT_PUBLIC_CALENDLY_URL</code> in your environment.
          </span>
        </p>
      </div>
    );
  }

  return (
    <>
      {/*
        Load Calendly's widget script via next/script.
        strategy="afterInteractive" ensures the container div is already in the
        DOM when the script runs, so it can find and process the widget ref.
        onLoad fires initWidget once the script has downloaded.
      */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={initWidget}
      />
      <div
        ref={containerRef}
        style={{ width: "100%", minWidth: 0, height: 700 }}
      />
    </>
  );
}

// ─── Confirmation panel ───────────────────────────────────────────────────────

function BookingConfirmationPanel() {
  return (
    <div className="flex flex-col items-center px-5 py-16 text-center md:px-10 md:py-20">
      <div
        className="flex size-[72px] items-center justify-center rounded-full bg-[#F5A524] shadow-inner md:size-20"
        aria-hidden
      >
        <svg
          className="size-9 text-white md:size-10"
          viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h3 className="font-sans my-4 text-[30px] font-bold text-black md:text-[36px]">
        Your consultation is confirmed!
      </h3>
      <p className="max-w-[560px] font-sans text-[16px] leading-relaxed text-[#64748b] md:text-[18px]">
        Thank you for booking! A confirmation email has been sent to you with
        all the details. We look forward to meeting you.
      </p>
    </div>
  );
}

// ─── Confirmation modal ───────────────────────────────────────────────────────

export function BookingConfirmationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Confirmed">
      <BookingConfirmationPanel />
    </Modal>
  );
}

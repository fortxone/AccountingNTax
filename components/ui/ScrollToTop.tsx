"use client";

import { useEffect, useState } from "react";

import { ChevronUpIcon } from "@/components/ui/icons";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 cursor-pointer right-3 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-lg transition hover:bg-accent/90 active:scale-95"
    >
      <ChevronUpIcon className="h-5 w-5 text-white" />
    </button>
  );
}

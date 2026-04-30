import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";

import { Toaster } from "sonner";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ui/ScrollToTop";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AccountingNTax",
  description: "AccountingNTax.co.uk matches small businesses, sole traders, startups, and individuals with qualified UK accountants who understand their specific needs. No guesswork. No cold calls. Just the right expert, first time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

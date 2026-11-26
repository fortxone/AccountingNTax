import nodemailer from "nodemailer";

/** Server-only helpers. Do not import this file from a client component. */

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Gmail SMTP transport using GMAIL_USER / GMAIL_APP_PASSWORD (same env vars as the other routes). */
export function createGmailTransport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER ?? "",
      pass: process.env.GMAIL_APP_PASSWORD ?? "",
    },
  });
}

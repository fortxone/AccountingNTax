import { createGmailTransport, escapeHtml } from "@/lib/email";
import { validatePartnerEnquiry, type PartnerEnquiry } from "@/lib/partner";

/** Where partner applications are sent. Override with PARTNER_EMAIL_TO if needed. */
const PARTNER_EMAIL_TO = process.env.PARTNER_EMAIL_TO ?? "fortxone@gmail.com";
const NOTIFICATION_SUBJECT = "new accountant enquiry";
const CONFIRMATION_SUBJECT = "Thank you for filling the form — AccountingNTax";

// ─── Best-effort rate limit (per server instance) ─────────────────────────────
// Stops casual abuse. For a hard limit, use a shared store or a CAPTCHA.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 1000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_PER_WINDOW;
  if (!limited) recent.push(now);
  hits.set(ip, recent);
  return limited;
}

// ─── Email content ────────────────────────────────────────────────────────────

function summaryRows(d: PartnerEnquiry): [string, string][] {
  return [
    ["Firm name", d.firmName],
    ["Website", d.website || "—"],
    ["Contact person", d.contactPerson],
    ["Position / role", d.position || "—"],
    ["Email address", d.email],
    ["Telephone", d.telephone],
    ["Office location / postcode", d.officeLocation],
    ["Professional body / registration", d.professionalBody || "—"],
    ["Number of partners / principals", d.partners],
    ["Combined practice experience (years)", d.experience],
    ["Areas of expertise", d.expertise.join(", ")],
    ["Consent", "Agreed to the Privacy Policy and to be contacted about the partner programme"],
  ];
}

function emailShell(heading: string, subheading: string, body: string, footer: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,37,69,0.08);">
          <tr>
            <td style="background-color:#0f2545;padding:20px 24px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">${escapeHtml(heading)}</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">${escapeHtml(subheading)}</p>
            </td>
          </tr>
          ${body}
          <tr>
            <td style="padding:16px 24px;background-color:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#64748b;text-align:center;">
              ${footer}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildNotificationHtml(d: PartnerEnquiry): string {
  const rowsHtml = summaryRows(d)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#64748b;width:200px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#0f2545;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const body = `<tr>
            <td style="padding:24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px;">
                ${rowsHtml}
              </table>
            </td>
          </tr>`;

  return emailShell(
    "New accountant enquiry",
    "AccountingNTax — partner application",
    body,
    `Reply to the applicant at ${escapeHtml(d.email)}.`
  );
}

function buildNotificationText(d: PartnerEnquiry): string {
  return [
    "New accountant enquiry (partner application)",
    "",
    ...summaryRows(d).map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

function buildConfirmationHtml(d: PartnerEnquiry): string {
  const body = `<tr>
            <td style="padding:28px 24px;font-size:15px;line-height:1.65;color:#1c2a3a;">
              <p style="margin:0 0 16px;">Dear ${escapeHtml(firstName(d.contactPerson))},</p>
              <p style="margin:0 0 16px;">Thank you for filling the form. We will get back to you shortly.</p>
              <p style="margin:24px 0 0;">Kind regards,<br/><strong style="color:#0f2545;">The AccountingNTax team</strong></p>
            </td>
          </tr>`;

  return emailShell(
    "Thank you for filling the form",
    "AccountingNTax",
    body,
    "This is an automated confirmation that we received your partner application."
  );
}

function buildConfirmationText(d: PartnerEnquiry): string {
  return [
    `Dear ${firstName(d.contactPerson)},`,
    "",
    "Thank you for filling the form. We will get back to you shortly.",
    "",
    "Kind regards,",
    "The AccountingNTax team",
    "",
    "---",
    "This is an automated confirmation that we received your partner application.",
  ].join("\n");
}

// ─── Route ────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Body must be a JSON object");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Hidden honeypot field: real visitors never fill it in, bots usually do.
  if (typeof body.faxNumber === "string" && body.faxNumber.trim() !== "") {
    return Response.json({ ok: true });
  }

  const { data, errors } = validatePartnerEnquiry(body);
  if (!data) {
    return Response.json(
      { error: "Please check the form and try again.", fields: errors },
      { status: 400 }
    );
  }

  const user = process.env.GMAIL_USER;
  if (!user || !process.env.GMAIL_APP_PASSWORD) {
    console.error("[send-partner-enquiry] GMAIL_USER / GMAIL_APP_PASSWORD not set");
    return Response.json(
      { error: "We couldn’t send your application. Please try again later." },
      { status: 500 }
    );
  }

  const transporter = createGmailTransport();
  const from = `"AccountingNTax" <${user}>`;

  try {
    await transporter.sendMail({
      from,
      to: PARTNER_EMAIL_TO,
      replyTo: data.email,
      subject: NOTIFICATION_SUBJECT,
      text: buildNotificationText(data),
      html: buildNotificationHtml(data),
    });
  } catch (err) {
    console.error("[send-partner-enquiry] notification failed", err);
    return Response.json(
      { error: "We couldn’t send your application. Please try again." },
      { status: 500 }
    );
  }

  // The application has reached you at this point. If only the thank-you
  // email fails, don't make the applicant resubmit (that would duplicate it).
  try {
    await transporter.sendMail({
      from,
      to: data.email,
      subject: CONFIRMATION_SUBJECT,
      text: buildConfirmationText(data),
      html: buildConfirmationHtml(data),
    });
  } catch (err) {
    console.error("[send-partner-enquiry] confirmation failed", err);
  }

  return Response.json({ ok: true });
}

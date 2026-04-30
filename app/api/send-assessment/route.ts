import nodemailer from "nodemailer";

/** Gmail SMTP credentials are read from environment variables. */
const GMAIL_USER = process.env.GMAIL_USER ?? "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? "";
const ASSESSMENT_EMAIL_TO = process.env.GMAIL_TO ?? GMAIL_USER;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type AssessmentStepSummary = {
  step: number;
  questionId: string;
  question: string;
  unanswered?: true;
  kind?: "single" | "multi";
  selectedOptionIds?: string[];
  selectedLabels?: string[];
};

type ContactInfo = {
  name: string;
  email: string;
  phone: string;
  referralCode?: string;
};

type BookingPayload = {
  consultationSlot?: string;
  consultationSlotDisplay: string;
  consultationSlotUtcApprox?: string | null;
  meetLink?: string | null;
};

type Body = {
  assessment: AssessmentStepSummary[];
  contact: ContactInfo;
  booking: BookingPayload;
};

function buildEmailHtml(
  assessment: AssessmentStepSummary[],
  contact: ContactInfo,
  booking: BookingPayload
): string {
  const stepsHtml = assessment
    .map((row) => {
      const q = escapeHtml(row.question);
      if (row.unanswered) {
        return `<tr><td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;vertical-align:top;"><strong>Q${row.step}</strong></td><td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">${q}<br/><span style="color:#6b7280;font-size:14px;">No answer</span></td></tr>`;
      }
      const labels = (row.selectedLabels ?? []).map(escapeHtml).join("<br/>");
      return `<tr><td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;vertical-align:top;width:48px;"><strong>Q${row.step}</strong></td><td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;"><div style="font-weight:600;margin-bottom:6px;">${q}</div><div style="color:#0f2545;font-size:15px;line-height:1.5;">${labels}</div></td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Assessment submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,37,69,0.08);">
          <tr>
            <td style="background-color:#0f2545;padding:20px 24px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New assessment submission</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">AccountingNTax — consultation booking</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f2545;border-bottom:2px solid #0d7377;padding-bottom:8px;">Client</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:15px;line-height:1.6;color:#1c2a3a;">
                <tr><td style="padding:6px 0;color:#64748b;width:200px;">Name</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(contact.name)}</td></tr>
                <tr><td style="padding:6px 0;color:#64748b;">Email</td><td style="padding:6px 0;">${escapeHtml(contact.email)}</td></tr>
                <tr><td style="padding:6px 0;color:#64748b;">Phone</td><td style="padding:6px 0;">${escapeHtml(contact.phone)}</td></tr>
                ${contact.referralCode?.trim() ? `<tr><td style="padding:6px 0;color:#64748b;">Referral Code</td><td style="padding:6px 0;font-weight:600;color:#0d7377;">${escapeHtml(contact.referralCode.trim())}</td></tr>` : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;">
              <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f2545;border-bottom:2px solid #0d7377;padding-bottom:8px;">Consultation Booking</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:15px;line-height:1.6;color:#1c2a3a;">
                <tr><td style="padding:6px 0;color:#64748b;width:200px;">Status</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(booking.consultationSlotDisplay)}</td></tr>
                ${booking.consultationSlotUtcApprox ? `<tr><td style="padding:6px 0;color:#64748b;">Date &amp; Time (UTC)</td><td style="padding:6px 0;font-family:monospace;font-size:13px;">${escapeHtml(booking.consultationSlotUtcApprox)}</td></tr>` : ""}
                ${booking.meetLink ? `<tr><td style="padding:6px 0;color:#64748b;">Meeting Link</td><td style="padding:6px 0;"><a href="${escapeHtml(booking.meetLink)}" style="color:#0d7377;font-weight:600;text-decoration:none;">${escapeHtml(booking.meetLink)}</a></td></tr>` : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;">
              <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#0f2545;border-bottom:2px solid #0d7377;padding-bottom:8px;">Assessment responses</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px;">
                ${stepsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background-color:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#64748b;text-align:center;">
              Sent from your website assessment flow.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(
  assessment: AssessmentStepSummary[],
  contact: ContactInfo,
  booking: BookingPayload
): string {
  const lines = [
    "New assessment submission",
    "",
    "CLIENT",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    contact.referralCode?.trim() ? `Referral Code: ${contact.referralCode.trim()}` : "",
    "",
    "CONSULTATION SLOT",
    `Date & Time: ${booking.consultationSlotDisplay}`,
    booking.consultationSlotUtcApprox
      ? `UTC: ${booking.consultationSlotUtcApprox}`
      : "",
    booking.meetLink ? `Google Meet: ${booking.meetLink}` : "",
    "",
    "ASSESSMENT",
    ...assessment.map((row) => {
      if (row.unanswered) return `Q${row.step}: ${row.question}\n  (no answer)`;
      return `Q${row.step}: ${row.question}\n  ${(row.selectedLabels ?? []).join("; ")}`;
    }),
  ].filter(Boolean);
  return lines.join("\n");
}

export async function POST(request: Request) {
  const user = GMAIL_USER;
  const pass = GMAIL_APP_PASSWORD;
  const to = ASSESSMENT_EMAIL_TO;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.assessment) || !body.booking || !body.contact) {
    return Response.json({ error: "Missing assessment, contact, or booking" }, { status: 400 });
  }

  const html = buildEmailHtml(body.assessment, body.contact, body.booking);
  const text = buildEmailText(body.assessment, body.contact, body.booking);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"AccountingNTax" <${user}>`,
      to,
      subject: `New Assessment — ${body.contact.name} — ${body.booking.consultationSlotDisplay}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[send-assessment]", err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ ok: true });
}

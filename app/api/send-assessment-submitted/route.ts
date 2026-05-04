import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER ?? "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? "";

const CONSULTATION_PAGE_URL = "https://www.accountingntax.co.uk/consultation";

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

type Body = {
  assessment: AssessmentStepSummary[];
  contact: ContactInfo;
};

function greetingName(fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0];
  return first || fullName;
}

function buildCustomerEmailHtml(
  contact: ContactInfo,
  consultationPageUrl: string
): string {
  const name = escapeHtml(greetingName(contact.name));
  const url = escapeHtml(consultationPageUrl);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thank You for Completing Your Assessment</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,37,69,0.08);">
          <tr>
            <td style="background-color:#0f2545;padding:20px 24px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">Thank You for Completing Your Assessment</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">AccountingNTax</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;font-size:15px;line-height:1.65;color:#1c2a3a;">
              <p style="margin:0 0 16px;">Dear ${name},</p>
              <p style="margin:0 0 16px;">Thank you for taking the time to complete our assessment. We appreciate the information you have shared.</p>
              <p style="margin:0 0 16px;">The next step is to book your <strong>free 30-minute introductory consultation</strong> at a time that suits you. There is no obligation &mdash; it is completely free of charge.</p>
              <p style="margin:0 0 24px;text-align:center;">
                <a href="${url}" style="display:inline-block;background-color:#0d7377;color:#ffffff;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;">Book your free 30-minute consultation</a>
              </p>
              <p style="margin:0;">Kind regards,<br/><strong style="color:#0f2545;">The AccountingNTax team</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background-color:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#64748b;text-align:center;">
              This is an automated message. If you did not complete an assessment on our website, you can ignore this email.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCustomerEmailText(
  contact: ContactInfo,
  consultationPageUrl: string
): string {
  const name = greetingName(contact.name);
  return [
    `Dear ${name},`,
    "",
    "Thank you for taking the time to complete our assessment. We appreciate the information you have shared.",
    "",
    "The next step is to book your free 30-minute introductory consultation at a time that suits you. There is no obligation — it is completely free of charge.",
    "",
    `Book your consultation: ${consultationPageUrl}`,
    "",
    "Kind regards,",
    "The AccountingNTax team",
    "",
    "---",
    "This is an automated message. If you did not complete an assessment on our website, you can ignore this email.",
  ].join("\n");
}

export async function POST(request: Request) {
  const user = GMAIL_USER;
  const pass = GMAIL_APP_PASSWORD;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.assessment) || !body.contact) {
    return Response.json({ error: "Missing assessment or contact" }, { status: 400 });
  }

  const name = typeof body.contact.name === "string" ? body.contact.name.trim() : "";
  const email = typeof body.contact.email === "string" ? body.contact.email.trim() : "";
  const phone = typeof body.contact.phone === "string" ? body.contact.phone.trim() : "";
  const referralCode =
    typeof body.contact.referralCode === "string" ? body.contact.referralCode.trim() : "";

  if (!name || !email || !phone) {
    return Response.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const contact: ContactInfo = { name, email, phone, referralCode };

  const html = buildCustomerEmailHtml(contact, CONSULTATION_PAGE_URL);
  const text = buildCustomerEmailText(contact, CONSULTATION_PAGE_URL);
  const subject = "Thank You — Book Your Free 30-Minute Consultation | AccountingNTax";

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"AccountingNTax" <${user}>`,
      to: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[send-assessment-submitted]", err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ ok: true });
}

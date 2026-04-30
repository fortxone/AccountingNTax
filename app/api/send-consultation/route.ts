import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER ?? "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? "";
const EMAIL_TO = process.env.GMAIL_TO ?? GMAIL_USER;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ConsultationBody = {
  name: string;
  address: string;
  email: string;
  phone: string;
  reason: string;
};

function buildEmailHtml(data: ConsultationBody): string {
  const clientRows: [string, string][] = [
    ["Name", data.name],
    ["Address", data.address],
    ["Email", data.email],
    ["Phone", data.phone],
  ];

  const clientRowsHtml = clientRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 14px;border-bottom:1px solid #e5e7eb;color:#64748b;width:160px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 14px;border-bottom:1px solid #e5e7eb;color:#0f2545;font-weight:600;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New consultation booking</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,37,69,0.08);">
          <tr>
            <td style="background-color:#0f2545;padding:20px 24px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New 30-Minute Consultation Booking</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">AccountingNTax — consultation request</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 24px 0;">
              <h2 style="margin:0 0 14px;font-size:16px;font-weight:700;color:#0f2545;border-bottom:2px solid #0d7377;padding-bottom:8px;">Client Details</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px;">
                ${clientRowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <h2 style="margin:0 0 14px;font-size:16px;font-weight:700;color:#0f2545;border-bottom:2px solid #0d7377;padding-bottom:8px;">Reason / Service Required</h2>
              <div style="background-color:#f8fafc;border-radius:8px;padding:16px;font-size:15px;line-height:1.65;color:#1c2a3a;white-space:pre-wrap;">${escapeHtml(data.reason)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;">
              <div style="background-color:#ecfdf5;border-left:4px solid #0d7377;border-radius:4px;padding:12px 16px;font-size:14px;color:#065f46;">
                ✓ The client has confirmed their 30-minute consultation booking via Calendly. Check your Calendly calendar for the scheduled time.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background-color:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#64748b;text-align:center;">
              Sent from your website consultation booking form. Reply to the client at ${escapeHtml(data.email)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(data: ConsultationBody): string {
  return [
    "New 30-Minute Consultation Booking",
    "",
    "CLIENT DETAILS",
    `Name:    ${data.name}`,
    `Address: ${data.address}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone}`,
    "",
    "REASON / SERVICE REQUIRED",
    data.reason,
    "",
    "The client has confirmed their booking via Calendly.",
  ].join("\n");
}

export async function POST(request: Request) {
  let body: ConsultationBody;
  try {
    body = (await request.json()) as ConsultationBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name    = typeof body.name    === "string" ? body.name.trim()    : "";
  const address = typeof body.address === "string" ? body.address.trim() : "";
  const email   = typeof body.email   === "string" ? body.email.trim()   : "";
  const phone   = typeof body.phone   === "string" ? body.phone.trim()   : "";
  const reason  = typeof body.reason  === "string" ? body.reason.trim()  : "";

  if (!name || !address || !email || !phone || !reason) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"AccountingNTax" <${GMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject: `New Consultation Booking — ${name}`,
      text: buildEmailText({ name, address, email, phone, reason }),
      html: buildEmailHtml({ name, address, email, phone, reason }),
    });
  } catch (err) {
    console.error("[send-consultation]", err);
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }

  return Response.json({ ok: true });
}

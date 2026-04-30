import nodemailer from "nodemailer";

/** Gmail SMTP credentials are read from environment variables. */
const GMAIL_USER = process.env.GMAIL_USER ?? "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? "";
const CONTACT_EMAIL_TO = process.env.GMAIL_TO ?? GMAIL_USER;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ContactBody = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  subject: string;
  hearAbout: string;
  message: string;
  agreed?: boolean;
};

function buildEmailHtml(data: ContactBody): string {
  const rows: [string, string][] = [
    ["Full name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["I am a", data.role],
    ["Subject", data.subject],
    ["How did you hear about us?", data.hearAbout],
    ["Message", data.message],
  ];
  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#64748b;width:200px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#0f2545;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Contact form</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,37,69,0.08);">
          <tr>
            <td style="background-color:#0f2545;padding:20px 24px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New contact form message</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">AccountingNTax — website enquiry</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px;">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background-color:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#64748b;text-align:center;">
              Reply to the sender at ${escapeHtml(data.email)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(data: ContactBody): string {
  return [
    "New contact form message",
    "",
    `Full name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `I am a: ${data.role}`,
    `Subject: ${data.subject}`,
    `How did you hear about us?: ${data.hearAbout}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function greetingName(fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0];
  return first || fullName;
}

function buildAcknowledgementHtml(fullName: string): string {
  const name = escapeHtml(greetingName(fullName));
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,37,69,0.08);">
          <tr>
            <td style="background-color:#0f2545;padding:20px 24px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">Thank you for contacting us</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">AccountingNTax</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;font-size:15px;line-height:1.65;color:#1c2a3a;">
              <p style="margin:0 0 16px;">Dear ${name},</p>
              <p style="margin:0 0 16px;">Thank you for getting in touch. We have received your message and appreciate you taking the time to contact AccountingNTax.</p>
              <p style="margin:0 0 16px;">A member of our team will review your enquiry and respond to you at this email address as soon as we can during normal business hours.</p>
              <p style="margin:24px 0 0;">Kind regards,<br/><strong style="color:#0f2545;">The AccountingNTax team</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background-color:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#64748b;text-align:center;">
              This is an automated confirmation that we received your enquiry. You may reply to this email if you wish to add further information.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildAcknowledgementText(fullName: string): string {
  const name = greetingName(fullName);
  return [
    `Dear ${name},`,
    "",
    "Thank you for getting in touch. We have received your message and appreciate you taking the time to contact AccountingNTax.",
    "",
    "A member of our team will review your enquiry and respond to you at this email address as soon as we can during normal business hours.",
    "",
    "Kind regards,",
    "The AccountingNTax team",
    "",
    "---",
    "This is an automated confirmation that we received your enquiry. You may reply to this email if you wish to add further information.",
  ].join("\n");
}

export async function POST(request: Request) {
  const user = GMAIL_USER;
  const pass = GMAIL_APP_PASSWORD;
  const to = CONTACT_EMAIL_TO;

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const hearAbout = typeof body.hearAbout === "string" ? body.hearAbout.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!fullName || !email || !phone || !role || !subject || !hearAbout || !message) {
    return Response.json(
      { error: "Please complete every field in the form before sending." },
      { status: 400 }
    );
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (body.agreed !== true) {
    return Response.json({ error: "Privacy consent is required" }, { status: 400 });
  }

  const payload: ContactBody = {
    fullName,
    email,
    phone,
    role,
    subject,
    hearAbout,
    message,
    agreed: true,
  };

  const html = buildEmailHtml(payload);
  const text = buildEmailText(payload);
  const subjectLine = `Contact: ${subject} — ${fullName}`;

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
      replyTo: email,
      subject: subjectLine,
      text,
      html,
    });

    await transporter.sendMail({
      from: `"AccountingNTax" <${user}>`,
      to: email,
      subject: "We have received your message — AccountingNTax",
      text: buildAcknowledgementText(fullName),
      html: buildAcknowledgementHtml(fullName),
    });
  } catch (err) {
    console.error("[sendEmail]", err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ ok: true });
}

import { google } from "googleapis";
import { getOAuthClient } from "@/app/api/calendar/_auth";

type BookSlotBody = {
  slotIso: string;   // naive local datetime, e.g. "2026-04-20T10:00:00"
  timeZone: string;  // IANA timezone, e.g. "Europe/London"
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

/**
 * Adds `minutes` to a naive ISO datetime string ("YYYY-MM-DDTHH:mm:ss")
 * without involving Date objects, so the server's local timezone never
 * corrupts the result. Works correctly across midnight boundaries.
 */
function addMinutesToNaiveIso(naiveIso: string, minutes: number): string {
  const [datePart, timePart] = naiveIso.split("T");
  const [hhStr, mmStr, ssStr = "00"] = timePart.split(":");
  const totalMinutes = parseInt(hhStr, 10) * 60 + parseInt(mmStr, 10) + minutes;
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${datePart}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${ssStr}`;
}

export async function POST(request: Request) {
  console.log("[book-slot] ── POST received");

  let body: BookSlotBody;
  try {
    body = (await request.json()) as BookSlotBody;
    console.log("[book-slot] body:", JSON.stringify(body, null, 2));
  } catch (parseErr) {
    console.error("[book-slot] Failed to parse JSON body:", parseErr);
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { slotIso, timeZone, contactName, contactEmail, contactPhone } = body;

  if (!slotIso || !timeZone || !contactName || !contactEmail) {
    console.error("[book-slot] Missing required fields:", { slotIso, timeZone, contactName, contactEmail });
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  console.log("[book-slot] GOOGLE_CALENDAR_ID:", calendarId ? `"${calendarId}"` : "NOT SET");

  if (!calendarId) {
    console.warn("[book-slot] GOOGLE_CALENDAR_ID not configured — skipping calendar, email will still send");
    return Response.json({ ok: true, skipped: true, reason: "no_calendar_id" });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  console.log("[book-slot] OAuth env vars present:", {
    GOOGLE_CLIENT_ID: !!clientId,
    GOOGLE_CLIENT_SECRET: !!clientSecret,
    GOOGLE_REFRESH_TOKEN: !!refreshToken,
  });

  const auth = getOAuthClient();
  if (!auth) {
    console.error("[book-slot] getOAuthClient() returned null — one or more OAuth env vars are missing");
    return Response.json({ ok: true, skipped: true, reason: "no_oauth_client" });
  }
  console.log("[book-slot] OAuth client created successfully");

  // Validate the naive local datetime string.
  if (Number.isNaN(new Date(slotIso).getTime())) {
    console.error("[book-slot] Invalid slotIso date:", slotIso);
    return Response.json({ error: "Invalid slotIso date" }, { status: 400 });
  }

  // Add 30 minutes using pure string arithmetic — never parse through Date,
  // because the server's local timezone would corrupt the naive local string
  // (e.g. a Karachi server turns "11:00" into "06:30" before stripping the Z).
  const endIso = addMinutesToNaiveIso(slotIso, 30);

  console.log("[book-slot] Inserting event:", {
    calendarId,
    start: { dateTime: slotIso, timeZone },
    end: { dateTime: endIso, timeZone },
    contactName,
    contactEmail,
  });

  try {
    const calendar = google.calendar({ version: "v3", auth });

    // When GOOGLE_CALENDAR_ID is an email address it doubles as the organiser attendee.
    const ownerEmail = calendarId.includes("@") ? calendarId : undefined;

    const event = await calendar.events.insert({
      calendarId,
      sendUpdates: "all",       // triggers invite emails to all attendees
      conferenceDataVersion: 1, // required for Google to auto-create a Meet link
      requestBody: {
        summary: `Consultation — ${contactName}`,
        description: [
          `Client: ${contactName}`,
          `Email: ${contactEmail}`,
          `Phone: ${contactPhone || "N/A"}`,
          "",
          "Free 30-minute introductory consultation booked via AccountingNTax website.",
        ].join("\n"),
        // Pass the user's IANA timezone so Google converts to UTC internally.
        // slotIso and endIso are naive local strings (no Z / offset).
        start: { dateTime: slotIso, timeZone },
        end: { dateTime: endIso, timeZone },
        attendees: [
          ...(ownerEmail
            ? [
                {
                  email: ownerEmail,
                  organizer: true,
                  responseStatus: "accepted" as const,
                },
              ]
            : []),
          {
            email: contactEmail,
            displayName: contactName,
            responseStatus: "needsAction" as const,
          },
        ],
        conferenceData: {
          createRequest: {
            // requestId must be unique per request to avoid duplicate Meet rooms
            requestId: `accountingntax-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 15 },
          ],
        },
      },
    });

    const meetLink =
      event.data.conferenceData?.entryPoints?.find(
        (ep) => ep.entryPointType === "video",
      )?.uri ?? null;

    console.log("[book-slot] Event created successfully:", {
      eventId: event.data.id,
      eventLink: event.data.htmlLink,
      meetLink,
    });

    return Response.json({
      ok: true,
      eventId: event.data.id,
      eventLink: event.data.htmlLink,
      meetLink,
    });
  } catch (err) {
    // Log the full error so it appears in the terminal / server logs
    console.error("[book-slot] Google Calendar API error:", err);
    // Calendar failure must not block the user — the assessment email goes through regardless
    return Response.json({ ok: true, skipped: true, reason: "calendar_error", error: String(err) });
  }
}

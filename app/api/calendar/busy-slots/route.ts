import { google } from "googleapis";
import { NextRequest } from "next/server";
import { getOAuthClient } from "@/app/api/calendar/_auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return Response.json({ error: "Missing start or end" }, { status: 400 });
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    return Response.json({ busy: [], source: "not_configured" });
  }

  const auth = getOAuthClient();
  if (!auth) {
    return Response.json({ busy: [], source: "not_configured" });
  }

  try {
    const calendar = google.calendar({ version: "v3", auth });

    // start / end arrive as UTC ISO strings (with Z) produced by the browser,
    // so no conversion is needed — pass them directly to Google.
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: start,
        timeMax: end,
        items: [{ id: calendarId }],
      },
    });

    const busy = res.data.calendars?.[calendarId]?.busy ?? [];

    return Response.json({ busy, source: "google_calendar" });
  } catch (err) {
    return Response.json({ busy: [], source: "error" });
  }
}

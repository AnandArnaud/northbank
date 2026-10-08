import { appendFile, mkdir } from "node:fs/promises";
import { NextResponse } from "next/server";

// Product events are collected here and appended to a local spool. A nightly job loads the spool
// into the Snowflake EVENTS table (see warehouse/README.md).
export async function POST(req: Request) {
  const body = await req.json();
  const row = {
    event_name: String(body.event ?? ""),
    user_id: body.userId ? String(body.userId) : null,
    anonymous_id: String(body.anonymousId ?? ""),
    properties: body.properties ?? {},
    event_time: new Date().toISOString(),
  };
  await mkdir("data", { recursive: true });
  await appendFile("data/events.jsonl", JSON.stringify(row) + "\n");
  return NextResponse.json({ ok: true });
}

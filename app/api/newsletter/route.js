import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData().catch(() => null);
  const honeypot = data?.get?.("extra");

  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}


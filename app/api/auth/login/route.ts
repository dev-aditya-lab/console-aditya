import { NextRequest, NextResponse } from "next/server";

const USER = process.env.ADMIN_USER;
const PASS = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  if (!USER || !PASS) {
    return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({} as any));
  const { username, password } = body as { username?: string; password?: string };

  if (username !== USER || password !== PASS) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_auth", PASS, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return res;
}
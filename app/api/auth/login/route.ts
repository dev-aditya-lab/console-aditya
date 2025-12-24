import { NextRequest, NextResponse } from "next/server";

const USER = process.env.ADMIN_USER;
const PASS = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  if (!USER || !PASS) {
    return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 });
  }

  // Safely parse JSON without using 'any' and narrow the payload
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const isLoginPayload = (x: unknown): x is { username?: string; password?: string } => {
    if (typeof x !== "object" || x === null) return false;
    const obj = x as Record<string, unknown>;
    const uValid = obj.username === undefined || typeof obj.username === "string";
    const pValid = obj.password === undefined || typeof obj.password === "string";
    return uValid && pValid;
  };

  const { username, password } = isLoginPayload(body) ? body : {};

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
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PASS = process.env.ADMIN_PASSWORD;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isReadMethod = method === "GET" || method === "HEAD" || method === "OPTIONS";
  // Allow public reads for blogs/projects; keep uploads fully protected
  const isProtectedApi = (
    ((pathname.startsWith("/api/blogs") || pathname.startsWith("/api/projects")) && !isReadMethod) ||
    pathname.startsWith("/api/uploads")
  );

  if (!PASS) return NextResponse.next();

  const token = req.cookies.get("admin_auth")?.value;
  const authorized = token === PASS;

  if ((isAdminPage || isProtectedApi) && !authorized) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/api/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow static assets and favicon
  if (pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  // Magic link: ?token=PASSWORD auto-authenticates and strips the param
  const token = request.nextUrl.searchParams.get("token");
  if (token && token === process.env.ADMIN_PASSWORD) {
    const clean = new URL(request.url);
    clean.searchParams.delete("token");
    const response = NextResponse.redirect(clean);
    response.cookies.set("rsvp_admin_session", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
    });
    return response;
  }

  const session = request.cookies.get("rsvp_admin_session");
  if (session?.value === "authenticated") {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

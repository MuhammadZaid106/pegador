import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_EMAIL,
  AUTH_COOKIE_NAME,
  ADMIN_COOKIE_NAME,
  isAdminEmail,
} from "./constants/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const userEmailCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const adminFlagCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    const userEmail = userEmailCookie ? decodeURIComponent(userEmailCookie) : null;
    const isAuthorized =
      isAdminEmail(userEmail) ||
      (adminFlagCookie === "true" && userEmail === ADMIN_EMAIL);

    if (!isAuthorized) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "not_admin");
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

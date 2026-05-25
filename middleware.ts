import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getJwtRole(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);
    const payload = JSON.parse(jsonPayload);
    return payload.role || payload.user?.role || payload.userRole || null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("userRole")?.value;
  const isSignInPage = request.nextUrl.pathname === "/admin/sign-in";

  if (isSignInPage) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/admin/sign-in", request.url));
  }

  // Decode role from JWT as a secondary fallback safety check
  const jwtRole = getJwtRole(token);
  const resolvedRole = userRole || jwtRole;

  // Check if the user is authorized as an admin
  if (resolvedRole?.toLowerCase() !== "admin") {
    return NextResponse.redirect(new URL("/admin/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

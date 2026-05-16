import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const protectedRoutes = ["/dashboard"];

  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute =
    protectedRoutes.includes(currentPath);

  const token =
    request.cookies.get("sb-access-token");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
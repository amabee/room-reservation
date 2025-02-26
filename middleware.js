import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/login", "/register", "/", "/about"];

  const adminRoutes = [
    "/admin",
    "/admin/dashboard",
    "/admin/users",
    "/admin/rooms",
    "/admin/bookings",
    "/admin/reports",
  ];

  const userRoutes = [
    "/dashboard",
    "/profile",
    "/bookings",
    "/rooms",
    "/reserve",
  ];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!session || !session.user) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(
      new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url)
    );
  }

  const userRole = session.user.role || "user";
  const isAdmin = userRole === "admin";

  // Admin accessing user routes - redirect to admin dashboard
  if (isAdmin && userRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Regular user trying to access admin routes - redirect to user dashboard
  if (!isAdmin && adminRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// Keep the same matcher configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  try {
    const session_id = request.cookies.get("session_id")?.value;
    const session_token = request.cookies.get("session_token")?.value;
    let userType = null;

    if (session_token) {
      try {
        const decoded = jwtDecode(session_token);
        userType = decoded.user?.role || null;
      } catch (e) {
        console.error("Error decoding JWT:", e);
      }
    }

    const isAuthenticated = !!(session_id && session_token);

    const session = isAuthenticated
      ? {
          isAuthenticated,
          userType,
        }
      : null;

    const routeConfig = {
      admin: {
        pattern: /^\/admin(\/.*)?$/,
        allowedTypes: ["admin"],
        defaultRedirect: "/admin/",
      },
      user: {
        pattern: /^\/user(\/.*)?$/,
        allowedTypes: ["user"],
        defaultRedirect: "/user/",
      },
    };

    if (!session?.isAuthenticated) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.set("clear-user-data", "true", {
        httpOnly: false,
        path: "/",
        maxAge: 10,
      });

      const isProtectedRoute =
        Object.values(routeConfig).some((config) =>
          config.pattern.test(pathname)
        ) || pathname === "/";

      if (isProtectedRoute && pathname !== "/login") {
        return response;
      }
    }

    if (session?.isAuthenticated === true) {
      if (pathname === "/login") {
        const redirectUrl = getRedirectUrlForUserType(
          session.userType,
          request.url
        );
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }

      for (const [key, config] of Object.entries(routeConfig)) {
        if (config.pattern.test(pathname)) {
          if (!config.allowedTypes.includes(session.userType)) {
            const redirectUrl = getRedirectUrlForUserType(
              session.userType,
              request.url
            );
            return NextResponse.redirect(new URL(redirectUrl, request.url));
          }
        }
      }
    }

    return NextResponse.next();
  } catch (e) {
    console.error("Middleware error:", e);
    if (pathname !== "/login") {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("clear-user-data", "true", {
        httpOnly: false,
        path: "/",
        maxAge: 10,
      });

      return response;
    }
    return NextResponse.next();
  }
}

function getRedirectUrlForUserType(userType, baseUrl) {
  console.log("USERTYPE: ", userType);
  switch (userType) {
    case "admin":
      return "/admin/";
    case "user":
      return "/user/";
    default:
      return "/";
  }
}

export const config = {
  matcher: ["/", "/admin/:path*", "/user/:path*"],
};

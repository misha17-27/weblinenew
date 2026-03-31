import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localeHeaderName,
  stripLocalePrefix,
} from "./app/lib/locale";

function hasPublicFile(pathname: string) {
  return /\.[^/]+$/.test(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/wp-") ||
    hasPublicFile(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const pathLocale = segments[1];
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  const storedLocale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  if (isLocale(pathLocale)) {
    const internalPath = stripLocalePrefix(pathname);
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = internalPath;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(localeHeaderName, pathLocale);

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });

    response.cookies.set(localeCookieName, pathLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(localeHeaderName, storedLocale);

  if (storedLocale !== defaultLocale && pathname !== "/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${storedLocale}${pathname}`;
    redirectUrl.search = search;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

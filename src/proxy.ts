import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");
  const isLogin = request.nextUrl.pathname === "/admin/login";

  if (!isAdmin || isLogin) return NextResponse.next();

  const session = request.cookies.get("duxio_session");
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

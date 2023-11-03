import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/signin") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return await withAuth(req, {
    pages: {
      signIn: "/signin",
    },
  });
}

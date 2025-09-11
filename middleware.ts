import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./auth/core/getUserFromSession";

const privateRoutes = ["/private"];

export async function middleware(request: NextRequest) {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const sessionId = request.cookies.get("sessionID")?.value;
    if (sessionId == null) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

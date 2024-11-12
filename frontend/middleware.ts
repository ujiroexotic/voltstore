import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const userId = request.cookies.get("userId")?.value;
  const authToken = request.cookies.get("userAuth")?.value;
  // console.log("authToken", authToken);
  // console.log("userId", userId);
  // If the user is not authenticated, redirect to the login page
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue to the next middleware or the requested page
  return NextResponse.next();
}

// Apply this middleware to specific paths
export const config = {
  matcher: ["/cart", "/checkout", "/profile", "/orders"],
};

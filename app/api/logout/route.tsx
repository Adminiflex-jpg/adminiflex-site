// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // Verwijder de sessie-cookie
  const response = NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
  response.cookies.set("session", "", { maxAge: 0, path: "/" });
  return response;
}

// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL("/login", new URL(req.url).origin);
  const res = NextResponse.redirect(url);
  res.cookies.set("session", "", { maxAge: 0, path: "/" });
  return res;
}

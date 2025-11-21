// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Dit is de nieuwe API in Next.js 15/16: default export "proxy"
export default function proxy(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const JWT_SECRET = process.env.JWT_SECRET || "";

  // Geen token of geen secret -> terug naar login
  if (!token || !JWT_SECRET) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Alleen admins toelaten
    if ((payload as any).role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch {
    // Token ongeldig of verlopen
    return NextResponse.redirect(
      new URL("/login?error=Sessie%20ongeldig", req.url)
    );
  }

  // Alles in orde -> request mag door
  return NextResponse.next();
}

// Proxy alleen laten draaien op /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};

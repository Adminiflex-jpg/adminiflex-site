// app/api/2fa/verify/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { signSession, verifyTotp } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const ADMIN_TOTP_SECRET = process.env.ADMIN_TOTP_SECRET || "";

export async function POST(req: Request) {
  const form = await req.formData();
  const code = String(form.get("code") || "").trim();

  // 1) pre2fa-cookie uitlezen
  const cookieStore = await cookies();
  const pre = cookieStore.get("pre2fa")?.value || "";

  if (!pre) {
    return NextResponse.redirect(
      new URL("/login?error=Sessie%20verlopen", req.url)
    );
  }

  if (!JWT_SECRET) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Server%20mist%20JWT_SECRET%20configuratie",
        req.url
      )
    );
  }

  // 2) pre2fa-JWT controleren
  let uid = "";
  try {
    const payload = jwt.verify(pre, JWT_SECRET) as { uid: string };
    uid = payload.uid;
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=Sessie%20verlopen", req.url)
    );
  }

  // 3) 2FA secret van admin uit env
  if (!ADMIN_TOTP_SECRET) {
    return NextResponse.redirect(
      new URL(
        "/2fa?error=Server%20mist%20ADMIN_TOTP_SECRET",
        req.url
      )
    );
  }

  // 4) 2FA-code controleren (Microsoft Authenticator)
  const ok = verifyTotp(code, ADMIN_TOTP_SECRET);
  if (!ok) {
    return NextResponse.redirect(
      new URL("/2fa?error=Ongeldige%20of%20verlopen%20code", req.url)
    );
  }

  // 5) Definitieve session-JWT maken (admin)
  const session = signSession({ uid, role: "admin" });

  const res = NextResponse.redirect(new URL("/admin", req.url));

  // session-cookie zetten
  res.cookies.set("session", session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dagen
  });

  // pre2fa-cookie opruimen
  res.cookies.set("pre2fa", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return res;
}

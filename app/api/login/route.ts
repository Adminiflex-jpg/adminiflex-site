// app/api/login/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password, code } = await req.json();

    const ADMIN_USER = process.env.ADMIN_USER || "admin";
    const ADMIN_PASS = process.env.ADMIN_PASS || "";
    const TOTP_SECRET = process.env.ADMIN_TOTP_SECRET || "";
    const JWT_SECRET = process.env.JWT_SECRET || "";

    if (!ADMIN_PASS || !TOTP_SECRET || !JWT_SECRET) {
      return NextResponse.json({ ok: false, error: "SERVER_NOT_CONFIGURED" }, { status: 500 });
    }

    // Controleer user + pass
    if (String(username) !== ADMIN_USER || String(password) !== ADMIN_PASS) {
      return NextResponse.json({ ok: false, error: "INVALID_CREDENTIALS" }, { status: 401 });
    }

    // Controleer 2FA (TOTP)
    const ok = speakeasy.totp.verify({
      secret: TOTP_SECRET,
      encoding: "base32",
      token: String(code || ""),
      window: 1, // accepteer één stap afwijking
    });

    if (!ok) {
      return NextResponse.json({ ok: false, error: "INVALID_2FA" }, { status: 401 });
    }

    // Maak JWT
    const token = jwt.sign(
      { sub: "admin", role: "admin" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ ok: true });
    // HttpOnly secure cookie
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dagen
    });

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}

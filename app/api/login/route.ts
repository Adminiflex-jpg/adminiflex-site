// app/api/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    const ADMIN_USER = process.env.ADMIN_USER || "";
    const ADMIN_PASS = process.env.ADMIN_PASS || "";
    const JWT_SECRET = process.env.JWT_SECRET || "";

    if (!JWT_SECRET) {
      return NextResponse.redirect(
        new URL(
          "/login?error=Server%20config%20(JWT_SECRET)%20ontbreekt",
          req.url
        )
      );
    }

    // ❌ Verkeerde inlog
    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.redirect(
        new URL("/login?error=Onjuiste%20inloggegevens", req.url)
      );
    }

    // ✅ Geldige inlog:
    // Maak een "pre-2FA" token met een simpele uid (hier: "admin")
    const preToken = jwt.sign(
      { uid: "admin" },
      JWT_SECRET,
      { expiresIn: "10m" } // 10 minuten geldig voor 2FA
    );

    // Redirect eerst naar /2fa en zet GEEN definitieve session nog
    const res = NextResponse.redirect(new URL("/2fa", req.url));

    // Oude session-cookie (als die bestond) opruimen
    res.cookies.set("session", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });

    // Nieuwe tijdelijke pre2fa-cookie zetten
    res.cookies.set("pre2fa", preToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10, // 10 minuten
    });

    return res;
  } catch (e) {
    return NextResponse.redirect(
      new URL("/login?error=Onbekende%20fout", req.url)
    );
  }
}

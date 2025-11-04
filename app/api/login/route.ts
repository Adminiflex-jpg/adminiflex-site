// app/api/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

/**
 * Tijdelijke DEMO-login:
 *  - gebruikersnaam: Admin  (case-insensitive)
 *  - wachtwoord: FransHals43!
 *  - stuurt ALTIJD door naar /2fa (totpEnabled = true)
 *  - pre2fa cookie bevat user-id, wordt op /2fa gecontroleerd
 *
 * Later vervangen door een echte DB lookup + bcrypt check.
 */
export async function POST(req: Request) {
  const form = await req.formData();
  const username = String(form.get("username") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  // 1) DEMO-USER: vervang dit straks door Prisma (prisma.user.findUnique)
  const demoUser = {
    id: "demo-admin",
    username: "admin",
    role: "admin",
    // zet 2FA aan zodat je de 2FA-pagina krijgt
    totpEnabled: true,
    // vul hier later je echte base32-secret in na setup
    totpSecret: "KVKQ4KIKNZTSA===",
  };

  // 2) Check demo-credentials
  const userOk = username === "admin" && password === "FransHals43!";
  if (!userOk) {
    // foutmelding terug naar login
    return NextResponse.redirect(new URL("/login?error=Onbekende%20gebruiker", req.url));
  }

  // 3) Als 2FA uit zou staan => direct sessie en naar /admin
  if (!demoUser.totpEnabled) {
    const session = jwt.sign({ uid: demoUser.id, role: demoUser.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    const res = NextResponse.redirect(new URL("/admin", req.url));
    res.headers.append(
      "Set-Cookie",
      `session=${session}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 7}`
    );
    return res;
  }

  // 4) 2FA AAN -> zet tijdelijke pre2fa-cookie en stuur naar /2fa
  const pre2fa = jwt.sign({ uid: demoUser.id }, JWT_SECRET, { expiresIn: "10m" });
  const res = NextResponse.redirect(new URL("/2fa", req.url));
  res.headers.append(
    "Set-Cookie",
    `pre2fa=${pre2fa}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 10}`
  );
  return res;
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { comparePassword, signSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
// import { prisma } from "@/lib/prisma"; // als je prisma gebruikt

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export async function POST(req: Request) {
  const form = await req.formData();
  const username = String(form.get("username") || "");
  const password = String(form.get("password") || "");

  // ---- Haal user op uit DB ----
  // const user = await prisma.user.findUnique({ where: { username } });
  // DEMO fallback (vervang met DB):
  const user =
  username.toLowerCase() === "admin"
    ? {
        id: "demo-admin",
        username: "admin",
        passwordHash: "$2b$10$FymYy6ShmigZy2CiAOadPucPVgAa3jWluoPOl3V3MGV1hgKcbwZ6G-FransHals43!",
        role: "admin",
        totpEnabled: false,
        totpSecret: null,
      }
    : null;


  if (!user) {
    return NextResponse.redirect(new URL("/login?error=Onbekende%20gebruiker", req.url));
  }

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.redirect(new URL("/login?error=Onjuist%20wachtwoord", req.url));
  }

  // als 2FA UIT staat → direct door
  if (!user.totpEnabled) {
    const session = signSession({ uid: user.id, role: user.role });
    const res = NextResponse.redirect(new URL("/admin", req.url));
    res.headers.append(
      "Set-Cookie",
      `session=${session}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 7}`
    );
    return res;
  }

  // 2FA AAN → zet tijdelijke cookie en ga naar /2fa
  const pre2fa = jwt.sign({ uid: user.id }, JWT_SECRET, { expiresIn: "10m" });
  const res = NextResponse.redirect(new URL("/2fa", req.url));
  res.headers.append("Set-Cookie", `pre2fa=${pre2fa}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 10}`);
  return res;
}

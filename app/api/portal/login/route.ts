// app/api/portal/login/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  signPortalSession,
  PortalSessionRole,
} from "@/lib/portalAuth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const form = await req.formData();

  const email = String(form.get("email") ?? "")
    .toLowerCase()
    .trim();
  const password = String(form.get("password") ?? "");

  if (!email || !password) {
    return NextResponse.redirect(
      new URL(
        "/portal/login?error=Vul%20e-mail%20en%20wachtwoord%20in",
        req.url
      )
    );
  }

  // 1) Zoeken op e-mail (uniek) + direct klant ophalen
  const portalUser = await prisma.portalUser.findFirst({
    where: { email },
    include: { customer: true },
  });

  if (!portalUser || !portalUser.customer) {
    return NextResponse.redirect(
      new URL(
        "/portal/login?error=Onjuiste%20inloggegevens",
        req.url
      )
    );
  }

  // 2) Wachtwoord checken
  const ok = await bcrypt.compare(password, portalUser.passwordHash);
  if (!ok) {
    return NextResponse.redirect(
      new URL(
        "/portal/login?error=Onjuiste%20inloggegevens",
        req.url
      )
    );
  }

  // 3) JWT aanmaken met klant-id en nummer
  const role = portalUser.role as PortalSessionRole;

  const token = signPortalSession({
    uid: portalUser.id,
    role,
    customerId: portalUser.customerId,
    customerNumber: portalUser.customer.number,
  });

  const redirectUrl = new URL(
    `/portal/${portalUser.customer.number}/dashboard`,
    req.url
  );

  const res = NextResponse.redirect(redirectUrl);

  res.cookies.set("portal_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 dagen
    path: "/",
  });

  return res;
}

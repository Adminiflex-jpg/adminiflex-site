import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { verifyTotp } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function generateRecoveryCodes(n = 10) {
  // simpele 4x4 codes
  const rnd = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return Array.from({ length: n }, () => `${rnd()}-${rnd()}-${rnd()}`);
}

export async function POST(req: Request) {
  const form = await req.formData();
  const code = String(form.get("code") || "").trim();

  const setup = (await cookies()).get("setup2fa")?.value;
  if (!setup) {
    return NextResponse.redirect(new URL("/admin/setup-2fa?e=timeout", req.url));
  }

  let payload: { uid: string; base32: string };
  try {
    payload = jwt.verify(setup, JWT_SECRET) as any;
  } catch {
    return NextResponse.redirect(new URL("/admin/setup-2fa?e=timeout", req.url));
  }

  if (!verifyTotp(code, payload.base32)) {
    return NextResponse.redirect(new URL("/admin/setup-2fa?e=badcode", req.url));
  }

  // Genereer recoverycodes en sla gehashte varianten op
  const rawCodes = generateRecoveryCodes(10);
  const hashes = await Promise.all(rawCodes.map((c) => bcrypt.hash(c, 10)));

  // TypeScript type cache fix: Prisma client was regenerated, but TS server may need restart
  await (prisma as any).user.update({
    where: { id: payload.uid },
    data: {
      totpEnabled: true,
      totpSecret: payload.base32,
      recoveryHashes: hashes,
    },
  });

  // Stuur de codes 1x terug via cookie voor de successpagina (10 min geldig)
  const out = NextResponse.redirect(new URL("/admin/setup-2fa/success", req.url));
  out.headers.append(
    "Set-Cookie",
    `recovery_export=${encodeURIComponent(JSON.stringify(rawCodes))}; Path=/; Max-Age=${60 * 10}; HttpOnly; SameSite=Lax; Secure`
  );
  // opruimen
  out.headers.append("Set-Cookie", `setup2fa=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
  return out;
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import { generateTotpSecret, verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export async function GET(req: Request) {
  const session = (await cookies()).get("session")?.value;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let uid: string;
  try {
    const payload = verifySession<{ uid: string }>(session);
    uid = payload.uid;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // user ophalen voor label
  // TypeScript type cache fix: Prisma client was regenerated, but TS server may need restart
  const user = await (prisma as any).user.findUnique({ where: { id: uid } });
  const username = user?.username || "user";

  // Genereer secret (nog NIET opslaan)
  const secret = generateTotpSecret("AdminiFlex", username);
  const qrDataUrl = await QRCode.toDataURL(secret.otpauth_url!);

  // Bewaar tijdelijk in cookie, 10 minuten
  const token = jwt.sign(
    { uid, base32: secret.base32, otpauth: secret.otpauth_url },
    JWT_SECRET,
    { expiresIn: "10m" }
  );

  const res = NextResponse.json({
    base32: secret.base32,
    otpauth: secret.otpauth_url,
    qrDataUrl,
  });
  res.headers.append(
    "Set-Cookie",
    `setup2fa=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 10}`
  );
  return res;
}

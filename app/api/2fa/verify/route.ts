import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { signSession, verifyTotp } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export async function POST(req: Request) {
  const form = await req.formData();
  const code = String(form.get("code") || "").trim();

  const pre = (await cookies()).get("pre2fa")?.value;
  if (!pre) {
    return NextResponse.redirect(new URL("/login?error=Sessie%20verlopen", req.url));
  }

  let uid = "";
  try {
    const payload = jwt.verify(pre, JWT_SECRET) as { uid: string };
    uid = payload.uid;
  } catch {
    return NextResponse.redirect(new URL("/login?error=Sessie%20verlopen", req.url));
  }

  // const user = await prisma.user.findUnique({ where: { id: uid } });
  // DEMO fallback secret:
  const user = { id: uid, role: "admin", totpSecret: "KVKQ4KIKNZTSA===" };

  if (!user?.totpSecret) {
    return NextResponse.redirect(new URL("/login?error=Geen%202FA%20ingesteld", req.url));
  }

  const ok = verifyTotp(code, user.totpSecret);
  if (!ok) {
    return NextResponse.redirect(new URL("/2fa?error=Ongeldige%20code", req.url));
  }

  // OK → definitieve sessie
  const session = signSession({ uid: user.id, role: user.role });
  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.headers.append(
    "Set-Cookie",
    `session=${session}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 7}`
  );
  // pre2fa opruimen
  res.headers.append("Set-Cookie", `pre2fa=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
  return res;
}

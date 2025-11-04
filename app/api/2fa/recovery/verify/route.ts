import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { signSession } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export async function POST(req: Request) {
  const form = await req.formData();
  const code = String(form.get("recovery") || "").trim();

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
  // DEMO: lijst met 1 gehashte herstelcode "DEMO-RECOVERY-1234"
  const user = {
    id: uid,
    role: "admin",
    recoveryHashes: [
      "$2a$10$t5n3kfls7m4jI8y0PsU2uO3uL0M4z0R4I5r7b8c9d0e1f2g3h4i5K", // voorbeeld hash
    ],
  };

  const ok = user.recoveryHashes.some((hash) => bcrypt.compareSync(code, hash));
  if (!ok) {
    return NextResponse.redirect(new URL("/2fa/recovery?error=Ongeldige%20herstelcode", req.url));
  }

  // Optioneel: markeer gebruikte code als verbruikt in DB.

  const session = signSession({ uid: user.id, role: user.role });
  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.headers.append(
    "Set-Cookie",
    `session=${session}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 7}`
  );
  res.headers.append("Set-Cookie", `pre2fa=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
  return res;
}

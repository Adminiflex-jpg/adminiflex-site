import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function generateRecoveryCodes(n = 10) {
  const rnd = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return Array.from({ length: n }, () => `${rnd()}-${rnd()}-${rnd()}`);
}

export async function POST(req: Request) {
  const session = (await cookies()).get("session")?.value;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let uid: string;
  try {
    uid = verifySession<{ uid: string }>(session).uid;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = generateRecoveryCodes(10);
  const hashes = await Promise.all(raw.map((c) => bcrypt.hash(c, 10)));

  // TypeScript type cache fix: Prisma client was regenerated, but TS server may need restart
  await (prisma as any).user.update({
    where: { id: uid },
    data: { recoveryHashes: hashes },
  });

  return NextResponse.json({ codes: raw }); // toon ze direct in UI
}

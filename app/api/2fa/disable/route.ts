import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let uid: string;
  try {
    uid = verifySession<{ uid: string }>(session).uid;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TypeScript type cache fix: Prisma client was regenerated, but TS server may need restart
  await (prisma as any).user.update({
    where: { id: uid },
    data: { totpEnabled: false, totpSecret: null, recoveryHashes: [] },
  });

  return NextResponse.json({ ok: true });
}

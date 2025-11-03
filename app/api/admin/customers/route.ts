export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.customer.findMany({
    include: { plan: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const b = await req.json();
  if (!b.name || !b.email || !b.username || !b.planCode) {
    return NextResponse.json({ ok:false, error:"INVALID" }, { status:400 });
  }
  const plan = await prisma.plan.findUnique({ where: { code: b.planCode } });
  if (!plan) return NextResponse.json({ ok:false, error:"PLAN_NOT_FOUND" }, { status:400 });

  const count = await prisma.customer.count();
  const number = `KL-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  const customer = await prisma.customer.create({
    data: {
      number,
      name: b.name,
      email: b.email,
      username: b.username,
      planId: plan.id,
      status: "active",
    },
    include: { plan: true },
  });

  return NextResponse.json({ ok:true, item: customer }, { status:201 });
}


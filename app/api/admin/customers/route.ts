export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PlanCode } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const b = await req.json();
  if (
    !b.companyName ||
    !b.contactName ||
    !b.address ||
    !b.postalCode ||
    !b.city ||
    !b.email ||
    !b.kvk ||
    !b.btw ||
    !b.planCode
  ) {
    return NextResponse.json({ ok:false, error:"INVALID" }, { status:400 });
  }
  const planCode = String(b.planCode).toUpperCase();
  const validPlan = Object.values(PlanCode).includes(planCode as PlanCode);
  if (!validPlan) {
    return NextResponse.json({ ok:false, error:"PLAN_NOT_FOUND" }, { status:400 });
  }

  const count = await prisma.customer.count();
  const number = `KL-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  const customer = await prisma.customer.create({
    data: {
      number,
      companyName: b.companyName,
      contactName: b.contactName,
      address: b.address,
      postalCode: b.postalCode,
      city: b.city,
      email: b.email,
      kvk: b.kvk,
      btw: b.btw,
      plan: planCode as PlanCode,
    },
  });

  return NextResponse.json({ ok:true, item: customer }, { status:201 });
}


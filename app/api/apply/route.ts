// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = Object.fromEntries(await req.formData());

  const app = await prisma.application.create({
    data: {
      companyName: String(data.companyName || ""),
      contactName: String(data.contactName || ""),
      address: String(data.address || ""),
      postalCode: String(data.postalCode || ""),
      city: String(data.city || ""),
      email: String(data.email || ""),
      kvk: String(data.kvk || ""),
      btw: String(data.btw || ""),
      plan: data.plan as any,
    },
  });

  // Stuur de bezoeker naar een “bedankt”-pagina of de homepage
  return NextResponse.redirect(new URL("/bedankt", req.url));
}

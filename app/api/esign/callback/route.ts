// app/api/esign/callback/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  // Parse payload van je provider (hier aangenomen: {externalId, pdfUrl})
  const body = await req.json().catch(() => ({} as any));
  const { externalId, pdfUrl } = body;

  const contract = await prisma.contract.findFirst({ where: { signExternalId: externalId } });
  if (!contract) return NextResponse.json({ ok: false }, { status: 404 });

  // markeer contract als SIGNED + pdfUrl opslaan
  await prisma.contract.update({
    where: { id: contract.id },
    data: { status: "SIGNED", pdfUrl },
  });

  // als er nog geen klant is, maak klant aan vanuit application
  const app = contract.applicationId
    ? await prisma.application.findUnique({ where: { id: contract.applicationId } })
    : null;

  if (app) {
    const customer = await prisma.customer.create({
      data: {
        number: `KL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random()*9000)}`, // simpele nummering
        companyName: app.companyName,
        contactName: app.contactName,
        address: app.address,
        postalCode: app.postalCode,
        city: app.city,
        email: app.email,
        kvk: app.kvk,
        btw: app.btw,
        plan: app.plan,
        contracts: { connect: { id: contract.id } },
      },
    });
    await prisma.contract.update({ where: { id: contract.id }, data: { customerId: customer.id } });
    await prisma.application.update({ where: { id: app.id }, data: { status: "SIGNED" } });
  }

  return NextResponse.json({ ok: true });
}

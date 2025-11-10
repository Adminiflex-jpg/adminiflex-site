// app/api/admin/customers/create/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Dummy e-sign: koppel later met DocuSign/Dropbox Sign; nu alleen status bijwerken.
async function sendToESign(email: string, html: string) {
  // TODO: maak hier PDF en verstuur via provider. Return fake id.
  return { externalId: "demo-esign-123" };
}

export async function POST(req: Request) {
  const form = await req.formData();
  const action = String(form.get("action") || "save-draft");

  const payload = {
    applicationId: String(form.get("applicationId") || ""),
    companyName: String(form.get("companyName") || ""),
    contactName: String(form.get("contactName") || ""),
    address: String(form.get("address") || ""),
    postalCode: String(form.get("postalCode") || ""),
    city: String(form.get("city") || ""),
    email: String(form.get("email") || ""),
    kvk: String(form.get("kvk") || ""),
    btw: String(form.get("btw") || ""),
    plan: String(form.get("plan") || "BASIC"),
    contractHtml: String(form.get("contractHtml") || ""),
  };

  // maak of update Contract gekoppeld aan Application
  const app = payload.applicationId
    ? await prisma.application.findUnique({ where: { id: payload.applicationId } })
    : null;

  // bewaar/maak concept contract
  let contract = await prisma.contract.upsert({
    where: { applicationId: payload.applicationId || "___none___" },
    update: { html: payload.contractHtml },
    create: {
      html: payload.contractHtml,
      applicationId: app?.id,
      status: "DRAFT",
    },
  });

  if (action === "send-sign") {
    const esign = await sendToESign(payload.email, payload.contractHtml);
    contract = await prisma.contract.update({
      where: { id: contract.id },
      data: { status: "SENT", signExternalId: esign.externalId },
    });
    if (app) {
      await prisma.application.update({
        where: { id: app.id },
        data: { status: "SENT_FOR_SIGNATURE" },
      });
    }
    return NextResponse.redirect(new URL(`/admin/klanten/aanmaken?app=${app?.id ?? ""}&sent=1`, req.url));
  }

  // alleen concept opslaan
  return NextResponse.redirect(new URL(`/admin/klanten/aanmaken?app=${app?.id ?? ""}&saved=1`, req.url));
}

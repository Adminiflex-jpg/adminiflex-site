// app/api/trial-signup/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, PlanCode } from "@prisma/client";

export const runtime = "nodejs"; // Prisma heeft Node-runtime nodig

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const companyName = String(form.get("companyName") ?? "").trim();
    const contactName = String(form.get("contactName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const address = String(form.get("address") ?? "").trim();
    const postalCode = String(form.get("postalCode") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const kvk = String(form.get("kvk") ?? "").trim();
    const btw = String(form.get("btw") ?? "").trim();
    const planRaw = String(form.get("plan") ?? "BASIC");
    const message = String(form.get("message") ?? "").trim();

    if (!companyName || !contactName || !email) {
      return NextResponse.redirect(new URL("/aanmelden?trial=error", req.url));
    }

    const plan = (planRaw.toUpperCase() as PlanCode) ?? "BASIC";

    await prisma.application.create({
      data: {
        status: "PENDING",
        companyName,
        contactName,
        address,
        postalCode,
        city,
        email,
        kvk,
        btw,
        plan,
        notes: [
          "Online proefperiode-aanmelding via hoofdpagina.",
          phone ? `Telefoon: ${phone}` : "",
          message ? `Opmerking: ${message}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      },
    });

    // Deze aanmelding verschijnt op je beheerdersdashboard als “Nieuwe aanmelding”
    return NextResponse.redirect(new URL("/aanmelden?trial=ok", req.url));
  } catch (err) {
    console.error("Fout bij trial-signup:", err);
    return NextResponse.redirect(new URL("/aanmelden?trial=error", req.url));
  }
}

// app/api/contact/route.ts

// Zorg dat deze route op Node.js runtime draait (niet Edge)
export const runtime = "nodejs";
// (optioneel) forceer server-side uitvoeren
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

// Kleine sanitizers
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // honeypot (onzichtbaar veld moet leeg zijn)
    if (body.company) {
      // bot: doe alsof alles goed ging
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(
      body.subject || "Nieuw bericht via AdminiFlex"
    ).trim();
    const message = String(body.message || "").trim();

    if (!name || !isEmail(email) || !message) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    // 1) Opslaan in database als ticket voor het admin-dashboard
    try {
      // Note: TypeScript language server may show an error here due to cache.
      // The contactTicket property exists in the generated Prisma client.
      // Restart TS server (Ctrl+Shift+P -> "TypeScript: Restart TS Server") to resolve.
      await (prisma as typeof prisma & { contactTicket: any }).contactTicket.create({
        data: {
          name,
          email,
          subject,
          message,
          status: "OPEN",
          source: "CONTACT_FORM",
        },
      });
    } catch (err) {
      // Belangrijk: als opslaan faalt, willen we niet dat de gebruiker een error krijgt.
      console.error("[contact] Fout bij opslaan in ContactTicket:", err);
    }

    // 2) E-mail versturen naar jouw beheer mailbox
    const host = process.env.SMTP_HOST || "smtp.example.com";
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = process.env.SMTP_SECURE === "true"; // zet in .env op "true" of "false"
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || "info@adminiflex.nl";

    if (!user || !pass || !host) {
      console.warn(
        "[contact] SMTP niet volledig geconfigureerd, sla e-mail over."
      );
    } else {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });

      const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2>Nieuw bericht via AdminiFlex</h2>
          <p>
            <b>Naam:</b> ${name}<br/>
            <b>E-mail:</b> ${email}<br/>
            <b>Onderwerp:</b> ${subject}
          </p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: `"AdminiFlex contactformulier" <${user}>`,
          replyTo: `${name} <${email}>`,
          to,
          subject: `Contactformulier: ${subject}`,
          text: `Naam: ${name}\nEmail: ${email}\nOnderwerp: ${subject}\n\n${message}`,
          html,
        });
      } catch (err) {
        console.error("[contact] Fout bij versturen e-mail:", err);
        // We geven alsnog ok terug; het bericht staat in de database.
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[contact] SERVER_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}

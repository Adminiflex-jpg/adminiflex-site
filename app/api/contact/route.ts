// Zorg dat deze route op Node.js runtime draait (niet Edge)
export const runtime = "nodejs";
// (optioneel) forceer server-side uitvoeren
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Kleine sanitizers
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // honeypot (onzichtbaar veld moet leeg zijn)
    if (body.company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "Nieuw bericht via AdminiFlex").trim();
    const message = String(body.message || "").trim();

    if (!name || !isEmail(email) || !message) {
      return NextResponse.json({ ok: false, error: "VALIDATION_ERROR" }, { status: 400 });
    }

    // SMTP-config uit env
    const host = process.env.SMTP_HOST || "smtp.zoho.eu";
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = process.env.SMTP_SECURE !== "false"; // default true
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || "info@adminiflex.nl";

    if (!user || !pass) {
      return NextResponse.json({ ok: false, error: "SMTP_NOT_CONFIGURED" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
        <h2>Nieuw bericht via AdminiFlex</h2>
        <p><b>Naam:</b> ${name}<br/>
           <b>E-mail:</b> ${email}<br/>
           <b>Onderwerp:</b> ${subject}</p>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${user}>`, // verzenden via jouw Zoho mailbox
      replyTo: `${name} <${email}>`,
      to,
      subject: `Contactformulier: ${subject}`,
      text: `Naam: ${name}\nEmail: ${email}\nOnderwerp: ${subject}\n\n${message}`,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}


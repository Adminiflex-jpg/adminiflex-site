// app/layout.tsx
import "./globals.css";
import React from "react";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import HeaderSwitcher from "./components/HeaderSwitcher";
import CookieConsent from "./components/CookieConsent"; // ✅ toegevoegd
import { BRAND_GREEN, BRAND_GREEN_DEEP, BRAND_MINT } from "../lib/theme";
import Link from "next/link";

export const metadata = {
  title: "AdminiFlex",
  description: "De oplossing voor je boekhouding",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Loginstatus bepalen via JWT-cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  let loggedIn = false;

  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        role?: string;
      };
      loggedIn = Boolean(payload);
    }
  } catch {
    loggedIn = false;
  }

  return (
    <html lang="nl">
      <body
        className="min-h-screen text-zinc-900 flex flex-col"
        style={{
          background: `linear-gradient(180deg, ${BRAND_MINT} 0%, #ffffff 100%)`,
        }}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white border-b md:bg-white/80 md:backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <a href={loggedIn ? "/admin" : "/"} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl grid place-items-center text-white font-semibold"
                style={{
                  background: "linear-gradient(135deg, #2F6B4F, #1E4C37)",
                }}
              >
                <span className="text-[11px] leading-none select-none">AF</span>
              </div>
              <span className="font-semibold tracking-tight text-lg">AdminiFlex</span>
            </a>

            {/* Menu-schakelaar (admin / publiek) */}
            <HeaderSwitcher loggedIn={loggedIn} oldGreen={BRAND_GREEN} />

            {/* Rechts: in-/uitloggen + proef / kennisbank */}
            <div className="flex items-center gap-2">
              {!loggedIn ? (
                <>
                  <a
                    href="/login"
                    className="px-4 py-2 rounded-md border text-sm"
                    style={{
                      borderColor: BRAND_GREEN,
                      color: BRAND_GREEN,
                    }}
                  >
                    Inloggen
                  </a>
                  <a
                    href="/aanmelden"
                    className="px-4 py-2 rounded-md text-sm text-white"
                    style={{ backgroundColor: BRAND_GREEN }}
                  >
                    Start gratis proefperiode
                  </a>
                </>
              ) : (
                <>
                  <form action="/api/logout" method="POST">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md text-sm text-white"
                      style={{ backgroundColor: BRAND_GREEN }}
                    >
                      Uitloggen
                    </button>
                  </form>
                  <a
                    href="/kennisbank"
                    className="px-4 py-2 rounded-md border text-sm"
                    style={{
                      borderColor: BRAND_GREEN,
                      color: BRAND_GREEN,
                    }}
                  >
                    Kennisbank
                  </a>
                </>
              )}
            </div>
          </div>
        </header>

        {/* PAGINA-INHOUD */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white/70 backdrop-blur mt-10">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 text-sm text-zinc-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg grid place-items-center text-white text-[10px] font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_GREEN}, ${BRAND_GREEN_DEEP})`,
                }}
              >
                AF
              </div>
              <span className="font-medium">AdminiFlex</span>
            </div>
            <div className="flex gap-4">
              <a href="/privacy">Privacy</a>
              <a href="/voorwaarden">Voorwaarden</a>
              <a href="/status">Status</a>
              <Link href="/cookies">Cookies</Link>
              <a href="/contact">Contact</a>
            </div>
            <div>
              © {new Date().getFullYear()} AdminiFlex. Alle rechten voorbehouden.
            </div>
          </div>
        </footer>

        {/* ✅ Cookie pop-up (staat expres helemaal onderaan de body) */}
        <CookieConsent />
      </body>
    </html>
  );
}

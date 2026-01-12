// app/components/CookieConsent.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BRAND_GREEN } from "../../lib/theme";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: number;
};

const STORAGE_KEY = "adminiflex_cookie_consent_v1";
const CONSENT_VERSION = 1;

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.analytics !== "boolean") return null;
    if (typeof parsed.marketing !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(consent: Omit<Consent, "updatedAt" | "version">) {
  const payload: Consent = {
    ...consent,
    updatedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  // Event om elders (bijv. analytics loader) op te reageren
  window.dispatchEvent(new CustomEvent("adminiflex:cookie-consent-updated", { detail: payload }));
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hasExistingConsent, setHasExistingConsent] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const cssVars = useMemo(
    () => ({ ["--brand" as any]: BRAND_GREEN } as React.CSSProperties),
    []
  );

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      // Eerste bezoek: open pop-up
      setOpen(true);
      setHasExistingConsent(false);
      setAnalytics(false);
      setMarketing(false);
    } else {
      // Bestaande keuze: niet openen
      setHasExistingConsent(true);
      setOpen(false);
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
  }, []);

  useEffect(() => {
    // Body scroll lock als modal open is
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      // focus op sluiten knop
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
  }, [open]);

  function acceptAll() {
    writeConsent({ necessary: true, analytics: true, marketing: true });
    setAnalytics(true);
    setMarketing(true);
    setHasExistingConsent(true);
    setOpen(false);
  }

  function rejectAll() {
    writeConsent({ necessary: true, analytics: false, marketing: false });
    setAnalytics(false);
    setMarketing(false);
    setHasExistingConsent(true);
    setOpen(false);
  }

  function confirmChoices() {
    writeConsent({ necessary: true, analytics, marketing });
    setHasExistingConsent(true);
    setOpen(false);
  }

  // Als iemand op "X" klikt bij eerste bezoek:
  // we behandelen dat als "Alles afwijzen" (compliance + geen eindeloze pop-up)
  function onClose() {
    if (!hasExistingConsent) {
      rejectAll();
      return;
    }
    setOpen(false);
  }

  // Kleine knop om later opnieuw te openen
  const showReopenButton = hasExistingConsent && !open;

  return (
    <>
      {showReopenButton && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 left-4 z-[60] rounded-full border bg-white px-4 py-2 text-sm shadow-sm hover:shadow transition"
          style={{ color: BRAND_GREEN, borderColor: "rgba(0,0,0,0.12)" }}
        >
          Cookie-instellingen
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          aria-labelledby="cookie-title"
          role="dialog"
          aria-modal="true"
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* modal */}
          <div
            className="relative w-full max-w-2xl bg-white border rounded-2xl shadow-sm"
            style={cssVars}
          >
            <div className="flex items-start justify-between gap-4 border-b p-5">
              <div>
                <div className="text-xs text-zinc-500">AdminiFlex</div>
                <h2
                  id="cookie-title"
                  className="mt-1 text-lg md:text-xl font-semibold"
                  style={{ color: "var(--brand)" }}
                >
                  Centrum voor cookievoorkeuren
                </h2>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50"
                aria-label="Sluiten"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                Elke website die u bezoekt, kan informatie in uw browser opslaan of ophalen.
                Dit gebeurt meestal in de vorm van cookies. Deze informatie kan betrekking hebben
                op u, uw voorkeuren of uw apparaat. Omdat wij uw recht op privacy respecteren,
                heeft u de keuze om bepaalde soorten cookies op onze website niet toe te staan.
                Het blokkeren van bepaalde soorten cookies kan invloed hebben op uw beleving van
                de website en op de services die we kunnen aanbieden.
              </p>

              <div className="mt-3 text-sm">
                <Link
                  href="/cookies"
                  className="underline underline-offset-4"
                  style={{ color: "var(--brand)" }}
                >
                  Privacy- en cookieverklaring
                </Link>
                <span className="text-zinc-400"> • </span>
                <Link
                  href="/privacy"
                  className="underline underline-offset-4"
                  style={{ color: "var(--brand)" }}
                >
                  Privacyverklaring
                </Link>
              </div>

              <button
                type="button"
                className="mt-5 text-sm underline underline-offset-4"
                style={{ color: "var(--brand)" }}
                onClick={() => setDetailsOpen((v) => !v)}
              >
                {detailsOpen ? "Verberg details" : "Toon details"}
              </button>

              {detailsOpen && (
                <div className="mt-4 border rounded-2xl p-4">
                  <div className="grid gap-4">
                    {/* Necessary */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">Noodzakelijk</div>
                        <div className="text-sm text-zinc-600">
                          Nodig voor basisfunctionaliteit zoals inloggen en beveiliging.
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">Altijd aan</span>
                        <input type="checkbox" checked readOnly className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">Analytics</div>
                        <div className="text-sm text-zinc-600">
                          Helpt ons de applicatie te verbeteren via geaggregeerde statistieken.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                        className="h-4 w-4 mt-1"
                        aria-label="Analytics cookies"
                      />
                    </div>

                    {/* Marketing */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">Marketing</div>
                        <div className="text-sm text-zinc-600">
                          Voor marketing/trackingscripts. Standaard uit.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                        className="h-4 w-4 mt-1"
                        aria-label="Marketing cookies"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="w-full rounded-md px-5 py-3 text-white font-medium"
                  style={{ backgroundColor: "var(--brand)" }}
                >
                  Alles toestaan
                </button>

                <button
                  type="button"
                  onClick={rejectAll}
                  className="w-full rounded-md px-5 py-3 text-white font-medium"
                  style={{ backgroundColor: "var(--brand)" }}
                >
                  Alles afwijzen
                </button>

                <button
                  type="button"
                  onClick={confirmChoices}
                  className="w-full rounded-md px-5 py-3 text-white font-medium"
                  style={{ backgroundColor: "var(--brand)" }}
                >
                  Mijn keuzes bevestigen
                </button>

                <p className="text-xs text-zinc-500 leading-relaxed">
                  U kunt uw keuze later aanpassen via “Cookie-instellingen” onderaan de pagina.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

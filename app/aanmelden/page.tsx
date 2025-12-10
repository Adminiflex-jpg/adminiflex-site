// app/aanmelden/page.tsx
import React from "react";
import { BRAND_GREEN, BRAND_GREEN_DEEP, BRAND_MINT } from "../../lib/theme";

export default async function TrialSignupPage() {
  const oldGreen = BRAND_GREEN;
  const deepGreen = BRAND_GREEN_DEEP;
  const lightMint = BRAND_MINT;


  return (
    <main
      className="min-h-screen bg-zinc-50"
      style={{ color: oldGreen, background: `linear-gradient(180deg, ${lightMint}, white)` }}
    >
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Start je gratis proefperiode
        </h1>
        <p className="mt-2 text-zinc-700 max-w-2xl">
          Vul je gegevens in en wij richten een proefomgeving voor je in. Je zit
          nergens aan vast; aan het einde van de proefperiode beslis je zelf of
          je wilt doorgaan.
        </p>

        <form
          method="POST"
          action="/api/trial-signup"
          className="mt-8 bg-white border rounded-2xl p-6 shadow-sm grid gap-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">
                Bedrijfsnaam *
              </label>
              <input
                name="companyName"
                required
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Contactpersoon *
              </label>
              <input
                name="contactName"
                required
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">E-mailadres *</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Telefoonnummer</label>
              <input
                name="phone"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Adres</label>
            <input
              name="address"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium">Postcode</label>
              <input
                name="postalCode"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Plaats</label>
              <input
                name="city"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">KVK-nummer</label>
              <input
                name="kvk"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">BTW-nummer</label>
              <input
                name="btw"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <span className="block text-sm font-medium mb-1">Pakket</span>
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="plan" value="BASIC" defaultChecked />
                  Basic
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="plan" value="PLUS" />
                  Plus
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="plan" value="PRO" />
                  Pro
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Eventuele opmerkingen
            </label>
            <textarea
              name="message"
              rows={4}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <p className="text-xs text-zinc-500">
            Met het versturen van dit formulier geef je toestemming om contact
            met je op te nemen over AdminiFlex. Je zit nog nergens aan vast.
          </p>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-3 rounded-md text-white font-medium"
              style={{ backgroundColor: oldGreen }}
            >
              Verstuur en start proefperiode
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

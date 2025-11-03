"use client";

import { useState } from "react";

export default function LoginPage() {
  const oldGreen = "#2F6B4F";
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const code = (form.elements.namedItem("code") as HTMLInputElement).value.trim();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, code }),
      });

      const body = await res.json();
      if (!res.ok || !body.ok) {
        throw new Error(body?.error || "Inloggen mislukt");
      }

      window.location.href = "/admin";
    } catch (e: any) {
      const map: Record<string, string> = {
        INVALID_CREDENTIALS: "Onjuiste gebruikersnaam of wachtwoord.",
        INVALID_2FA: "Ongeldige 2FA-code.",
        SERVER_NOT_CONFIGURED: "Server niet geconfigureerd. Controleer env vars.",
        SERVER_ERROR: "Onbekende fout.",
      };
      setErr(map[e.message] || "Inloggen mislukt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] grid place-items-center px-4 md:px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border bg-white/90 backdrop-blur p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-center">Inloggen</h1>
        <p className="mt-1 text-center text-zinc-600">AdminiFlex Beheer</p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div>
            <label className="block text-sm mb-1">Gebruikersnaam</label>
            <input
              name="username"
              autoComplete="username"
              className="w-full border rounded-md px-3 py-2"
              placeholder="Gebruikersnaam"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Wachtwoord</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full border rounded-md px-3 py-2"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">2FA-code (Microsoft Authenticator)</label>
            <input
              name="code"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              className="w-full border rounded-md px-3 py-2"
              placeholder="123456"
              required
            />
          </div>

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-md text-white font-medium disabled:opacity-60"
            style={{ backgroundColor: oldGreen }}
          >
            {loading ? "Bezig met inloggen…" : "Inloggen"}
          </button>

          <a
            href="mailto:info@adminiflex.nl?subject=Wachtwoord%20vergeten"
            className="text-sm text-center underline text-zinc-600"
          >
            Wachtwoord vergeten?
          </a>
        </form>
      </div>
    </main>
  );
}

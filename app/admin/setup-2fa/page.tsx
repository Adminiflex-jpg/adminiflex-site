"use client";

import { useEffect, useState } from "react";

export default function Setup2FA() {
  const [qr, setQr] = useState<string>("");
  const [otpauth, setOtpauth] = useState<string>("");
  const [base32, setBase32] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/2fa/setup/start");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Kan secret niet maken");
        setQr(data.qrDataUrl);
        setOtpauth(data.otpauth);
        setBase32(data.base32);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="max-w-lg mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-semibold">Tweestapsverificatie instellen</h1>
      <p className="mt-2 text-sm text-zinc-700">
        Scan de QR-code met Microsoft Authenticator (of Google Authenticator) en voer daarna je 6-cijferige code in.
      </p>

      {loading && <p className="mt-6">Laden…</p>}
      {error && <p className="mt-6 text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mt-6 p-4 rounded-lg border bg-white">
            <img src={qr} alt="QR voor TOTP" className="mx-auto w-48 h-48" />
            <p className="text-xs text-center mt-2 break-all">{otpauth}</p>
            <p className="text-xs text-center mt-1 text-zinc-600">Secret (backup): {base32}</p>
          </div>

          <form method="POST" action="/api/2fa/setup/verify" className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">2FA-code</label>
              <input
                name="code"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                className="mt-1 w-full rounded-md border px-3 py-2 tracking-widest"
                placeholder="123 456"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md px-4 py-2 text-white"
              style={{ backgroundColor: "#2F6B4F" }}
            >
              Verifiëren en inschakelen
            </button>
          </form>

          <div className="mt-6 text-sm">
            <form method="POST" action="/api/2fa/disable">
              <button className="underline text-zinc-700" type="submit">2FA uitschakelen</button>
            </form>
          </div>
        </>
      )}
    </main>
  );
}

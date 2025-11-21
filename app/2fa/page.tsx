// app/2fa/page.tsx
export const metadata = { title: "2FA verificatie - AdminiFlex" };

export default function TwoFaPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = searchParams?.error;

  return (
    <main className="max-w-md mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-semibold">Voer je 2FA-code in</h1>
      <p className="mt-2 text-sm text-zinc-700">
        Open Microsoft Authenticator en vul je 6-cijferige code in.
      </p>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {decodeURIComponent(error)}
        </p>
      )}

      <form method="POST" action="/api/2fa/verify" className="mt-6 space-y-4">
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
          Verifiëren
        </button>
      </form>

      <div className="mt-4 text-sm">
        <a href="/2fa/recovery" className="underline">
          Geen toegang tot de app? Gebruik een herstelcode
        </a>
      </div>
    </main>
  );
}

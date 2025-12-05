// app/portal/login/page.tsx
import Link from "next/link";

export default function PortalLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = searchParams?.error;

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold mb-4">Klantomgeving inloggen</h1>

      {error && (
        <p className="text-red-600 mb-4">
          {decodeURIComponent(error)}
        </p>
      )}

      <form method="POST" action="/api/portal/login" className="space-y-4">
        <div>
          <label className="block text-sm font-medium">E-mailadres</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Wachtwoord</label>
          <input
            name="password"
            type="password"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 w-full"
        >
          Inloggen
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-600">
        Beheerder van AdminiFlex?{" "}
        <Link href="/login" className="underline text-emerald-700">
          Log hier in op het beheerdersdashboard
        </Link>
      </p>
    </main>
  );
}

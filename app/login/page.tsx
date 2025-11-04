import Link from "next/link";

export const metadata = { title: "Inloggen - AdminiFlex" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams?.error;

  return (
    <main className="max-w-md mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-semibold">Inloggen</h1>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {decodeURIComponent(error)}
        </p>
      )}

      <form method="POST" action="/api/login" className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Gebruikersnaam</label>
          <input
            required
            name="username"
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="bijv. admin"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Wachtwoord</label>
          <input
            required
            type="password"
            name="password"
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md px-4 py-2 text-white"
          style={{ backgroundColor: "#2F6B4F" }}
        >
          Inloggen
        </button>
      </form>

      <div className="mt-4 text-sm">
        <Link href="/forgot" className="underline">
          Wachtwoord vergeten?
        </Link>
      </div>
    </main>
  );
}

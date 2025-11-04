export const metadata = { title: "Herstelcode - AdminiFlex" };

export default function RecoveryPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams?.error;
  return (
    <main className="max-w-md mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-semibold">Herstelcode gebruiken</h1>
      <p className="mt-2 text-sm text-zinc-700">
        Vul één van je eerder gegenereerde herstelcodes in.
      </p>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {decodeURIComponent(error)}
        </p>
      )}

      <form method="POST" action="/api/2fa/recovery/verify" className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Herstelcode</label>
          <input
            name="recovery"
            required
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="xxxx-xxxx-xxxx"
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
    </main>
  );
}

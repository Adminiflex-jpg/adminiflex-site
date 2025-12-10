// app/admin/klanten/[customerNumber]/layout.tsx
import Link from "next/link";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const oldGreen = "#2F6B4F";

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      {/* De titel en navigatie staan nu in de page.tsx per klant */}
      <div className="mt-8">{children}</div>
    </main>
  );
}

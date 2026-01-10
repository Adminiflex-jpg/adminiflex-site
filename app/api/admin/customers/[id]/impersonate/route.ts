// app/api/admin/customers/[id]/impersonate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/auth";         // of jouw eigen admin-check
import { createPortalSession } from "@/lib/portalAuth";  // zelfde helper als bij portal-login

// Gebruik 'any' voor context om TypeScript-gedoe met Next 16 te vermijden
export async function GET(_req: NextRequest, context: any) {
  // 1) Haal het id uit de URL
  const { id } = context.params as { id: string };

  // 2) Check of de huidige sessie een admin is
  const adminUser = await verifyAdminSession(); // deze functie moet je al hebben in lib/auth
  if (!adminUser || adminUser.role !== "admin") {
    return NextResponse.redirect(new URL("/login?error=Geen%20toegang", _req.url));
  }

  // 3) Zoek de klant + bijbehorende portal user
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      portalUsers: {
        take: 1,
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!customer) {
    return NextResponse.redirect(
      new URL("/admin/klanten/overzicht?error=Klant%20niet%20gevonden", _req.url),
    );
  }

  const portalUser = customer.portalUsers[0];

  if (!portalUser) {
    return NextResponse.redirect(
      new URL(
        "/admin/klanten/overzicht?error=Geen%20portalgebruiker%20voor%20deze%20klant",
        _req.url,
      ),
    );
  }

  // 4) Bepaal tenantSlug (bij jou is dat het klantnummer, bv. "CUST-20254655")
  const tenantSlug = customer.number;

  // 5) Maak een portal-sessie aan alsof de klant zelf inlogt
  await createPortalSession({
    portalUserId: portalUser.id,
    tenantSlug,
  });

  // 6) Redirect naar de klantomgeving
  const redirectUrl = new URL(`/portal/${tenantSlug}/dashboard`, _req.url);
  return NextResponse.redirect(redirectUrl);
}

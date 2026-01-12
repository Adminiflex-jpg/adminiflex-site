// app/api/admin/customers/[id]/impersonate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ In Next 16 is context.params een Promise, dus eerst awaiten
  const { id } = await context.params;

  // 1. Controleer admin-sessie via de bestaande JWT-cookie "session"
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";

  let isAdmin = false;

  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        role?: string;
      };
      isAdmin = payload.role === "admin";
    }
  } catch {
    isAdmin = false;
  }

  if (!isAdmin) {
    // Geen (geldige) admin-sessie: terug naar login
    return NextResponse.redirect(
      new URL("/login?error=Geen%20toegang", req.url)
    );
  }

  // 2. Haal de klant op
  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    return NextResponse.redirect(
      new URL(
        "/admin/klanten/overzicht?error=Klant%20niet%20gevonden",
        req.url
      )
    );
  }

  // 3. Redirect naar de klantomgeving (klantdashboard)
  const tenantSlug = customer.number; // klantnummer als slug
  const target = new URL(`/portal/${tenantSlug}/dashboard`, req.url);

  return NextResponse.redirect(target);
}

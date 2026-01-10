// app/api/admin/customers/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, PlanCode } from "@prisma/client";

const prisma = new PrismaClient();

// In Next 16 is params een Promise
type RouteContext = {
  params: Promise<{ id: string }>;
};

// ---------------------------------------------------------
// GET /api/admin/customers/:id
// - Haalt één klant op met laatste contract en portal users
// ---------------------------------------------------------
export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        portalUsers: true,
        contracts: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Klant niet gevonden" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("[GET /api/admin/customers/:id] fout:", error);
    return NextResponse.json(
      { error: "Kon klant niet ophalen" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------
// PUT /api/admin/customers/:id
// - Update klantgegevens vanuit JSON body
// ---------------------------------------------------------
export async function PUT(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await req.json();

    const {
      companyName,
      contactName,
      address,
      postalCode,
      city,
      email,
      kvk,
      btw,
      plan,
      isActive,
      demoActive,
      demoExpiresAt,
    } = body as {
      companyName?: string;
      contactName?: string;
      address?: string;
      postalCode?: string;
      city?: string;
      email?: string;
      kvk?: string;
      btw?: string;
      plan?: PlanCode;
      isActive?: boolean;
      demoActive?: boolean;
      demoExpiresAt?: string | null;
    };

    const data: any = {};

    if (companyName !== undefined) data.companyName = companyName;
    if (contactName !== undefined) data.contactName = contactName;
    if (address !== undefined) data.address = address;
    if (postalCode !== undefined) data.postalCode = postalCode;
    if (city !== undefined) data.city = city;
    if (email !== undefined) data.email = email;
    if (kvk !== undefined) data.kvk = kvk;
    if (btw !== undefined) data.btw = btw;

    if (plan !== undefined) data.plan = plan as PlanCode;
    if (isActive !== undefined) data.isActive = Boolean(isActive);

    // Demo-status updaten
    if (demoActive !== undefined) {
      data.demoActive = Boolean(demoActive);
      if (demoActive) {
        // als geen datum meegegeven → vanaf nu + 30 dagen
        const expires =
          demoExpiresAt != null
            ? new Date(demoExpiresAt)
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        data.demoExpiresAt = expires;
      } else {
        data.demoExpiresAt = null;
      }
    }

    const updated = await prisma.customer.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PUT /api/admin/customers/:id] fout:", error);
    return NextResponse.json(
      { error: "Kon klant niet bijwerken" },
      { status: 500 }
    );
  }
}

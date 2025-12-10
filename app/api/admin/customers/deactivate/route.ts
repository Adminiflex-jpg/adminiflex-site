// app/api/admin/customers/deactivate/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const customerId = String(form.get("customerId") ?? "");
    const customerNumber = String(form.get("customerNumber") ?? "");

    if (!customerId) {
      return NextResponse.redirect(
        new URL(
          "/admin/klanten/contracten?error=Geen%20klantId",
          req.url,
        ),
      );
    }

    await prisma.customer.update({
      where: { id: customerId },
      data: { isActive: false },
    });

    const redirectUrl = customerNumber
      ? `/admin/klanten/${customerNumber}/contract`
      : "/admin/klanten/contracten";

    return NextResponse.redirect(new URL(redirectUrl, req.url));
  } catch (err) {
    console.error("Deactivate customer error", err);
    return NextResponse.redirect(
      new URL(
        "/admin/klanten/contracten?error=Kon%20omgeving%20niet%20stoppen",
        req.url,
      ),
    );
  }
}

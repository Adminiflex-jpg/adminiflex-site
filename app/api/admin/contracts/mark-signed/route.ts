// app/api/admin/contracts/mark-signed/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, ContractStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const contractId = String(form.get("contractId") ?? "");

    if (!contractId) {
      return NextResponse.redirect(
        new URL(
          "/admin/klanten/contracten?error=Geen%20contractId",
          req.url,
        ),
      );
    }

    const contract = await prisma.contract.update({
      where: { id: contractId },
      data: { status: ContractStatus.SIGNED },
      include: { customer: true },
    });

    if (contract.customerId) {
      await prisma.customer.update({
        where: { id: contract.customerId },
        data: { isActive: true },
      });
    }

    const customerNumber = contract.customer?.number ?? "";
    const redirectUrl = customerNumber
      ? `/admin/klanten/${customerNumber}/contract`
      : "/admin/klanten/contracten";

    return NextResponse.redirect(new URL(redirectUrl, req.url));
  } catch (err) {
    console.error("Mark signed error", err);
    return NextResponse.redirect(
      new URL(
        "/admin/klanten/contracten?error=Kon%20contract%20niet%20markeren",
        req.url,
      ),
    );
  }
}

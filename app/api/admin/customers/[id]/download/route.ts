// app/api/admin/contracts/[id]/download/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("ContractId ontbreekt", { status: 400 });
  }

  const contract = await prisma.contract.findUnique({
    where: { id },
    include: { customer: true },
  });

  if (!contract) {
    return new NextResponse("Contract niet gevonden", { status: 404 });
  }

  const customerNumber = contract.customer?.number ?? "onbekend";

  // We maken een simpele HTML-pagina die Word prima kan openen
  const innerHtml = contract.html ?? "";
  const docHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Contract ${customerNumber}</title>
</head>
<body>
${innerHtml}
</body>
</html>`;

  const fileName = `contract-${customerNumber}.doc`;

  return new NextResponse(docHtml, {
    status: 200,
    headers: {
      // ✅ Word herkent dit prima
      "Content-Type": "application/msword; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}

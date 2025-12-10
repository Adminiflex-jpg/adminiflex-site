// app/api/admin/customers/[id]/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Zorg dat we op de Node-runtime draaien (niet edge)
export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // ⬅️ Belangrijk: params is nu een Promise, dus eerst await
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Contract-id ontbreekt in de URL." },
      { status: 400 }
    );
  }

  try {
    const contract = await prisma.contract.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!contract) {
      return NextResponse.json(
        { error: "Contract niet gevonden." },
        { status: 404 }
      );
    }

    const companyName = contract.customer?.companyName ?? "contract";
    const safeName = companyName.replace(/[^\w\-]+/g, "_");

    const html =
      contract.html ||
      "<html><body><p>Geen contracttekst opgeslagen.</p></body></html>";

    // Download als HTML-bestand
    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${safeName}.html"`,
      },
    });
  } catch (error) {
    console.error("Fout bij contract-download:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het genereren van de download." },
      { status: 500 }
    );
  }
}

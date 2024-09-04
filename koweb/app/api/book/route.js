import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const book = await prisma.Book.findMany({
    where: {
      archive: false,
    },
  });

  return NextResponse.json(book);
}

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const Yazarlar = await prisma.Yazarlar.findMany();

  return NextResponse.json(Yazarlar);
}

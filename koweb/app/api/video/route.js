import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const video = await prisma.Video.findMany({
    where: {
      archive: false,
    },
  });

  return NextResponse.json(video);
}

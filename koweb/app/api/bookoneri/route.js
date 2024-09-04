import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  await prisma.Bookoneri.create({
    data: {
      name: data.name,
      kitap: data.kitap,
      yazar: data.yazar,
      yayinevi: data.yayinevi,
    },
  });

  return NextResponse.json({ message: "success" });
}

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await prisma.Book.update({
    where: {
      id: parseInt(id),
    },
    data: {
      onclick: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({ message: "success" });
}

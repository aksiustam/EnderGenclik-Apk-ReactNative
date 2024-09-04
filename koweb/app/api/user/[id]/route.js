import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  const user = await prisma.User.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      Book: true,
    },
  });

  return NextResponse.json(user);
}
export async function POST(req, { params }) {
  const { id } = params;
  const data = await req.json();

  const user = await prisma.User.update({
    where: { id: parseInt(id) },
    data: { Book: { connect: { id: data.bookid } } },
  });

  return NextResponse.json(user);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();

  const user = await prisma.User.update({
    where: { id: parseInt(id) },
    data: {
      name: data.name,
      bildirim: data.bildirim,
      sayfa: data.sayfa,
      kitap: data.kitap,
      activity: data.activity,
    },
  });

  return NextResponse.json(user);
}

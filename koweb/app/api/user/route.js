import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  let user = null;
  user = await prisma.User.findFirst({
    where: {
      deviceID: data?.deviceID,
    },
  });
  if (user) {
    return NextResponse.json(user);
  } else {
    user = await prisma.User.create({
      data: {
        name: data?.name,
        deviceID: data?.deviceID,
        expoToken: data?.expoToken || null,
        bildirim: data?.bildirim,
      },
    });
    return NextResponse.json(user);
  }
}

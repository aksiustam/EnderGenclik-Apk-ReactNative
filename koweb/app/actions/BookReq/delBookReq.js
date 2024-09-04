"use server";
import prisma from "@/lib/prismadb";

export default async function delBookReq(item) {
  try {
    await prisma.Bookoneri.delete({
      where: {
        id: item.id,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

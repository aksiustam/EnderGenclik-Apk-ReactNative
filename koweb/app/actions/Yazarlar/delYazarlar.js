"use server";
import prisma from "@/lib/prismadb";

export default async function delYazarlar(item) {
  try {
    await prisma.Yazarlar.delete({
      where: {
        id: item.id,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

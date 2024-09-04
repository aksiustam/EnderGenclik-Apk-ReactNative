"use server";
import prisma from "@/lib/prismadb";

export default async function getYazarOne(id) {
  try {
    const yazar = await prisma.Yazarlar.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (yazar) return yazar;
    else return null;
  } catch (error) {
    throw new Error(error);
  }
}

"use server";
import prisma from "@/lib/prismadb";

export default async function updateYazarlar(item) {
  try {
    await prisma.Yazarlar.update({
      where: {
        id: parseInt(item.id),
      },
      data: {
        name: item.name,
        tarih: item.tarih,
        text: item.text,
        text1: item.text1,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

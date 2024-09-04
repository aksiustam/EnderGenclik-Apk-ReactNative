"use server";
import prisma from "@/lib/prismadb";

export default async function setYazarlar(formData) {
  try {
    await prisma.Yazarlar.create({
      data: {
        name: formData.name,
        tarih: formData.tarih,
        text: formData.text,
        text1: formData.text1,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

"use server";
import prisma from "@/lib/prismadb";

export default async function getYazarlar() {
  try {
    const yazar = await prisma.Yazarlar.findMany();

    return yazar;
  } catch (error) {
    throw new Error(error);
  }
}

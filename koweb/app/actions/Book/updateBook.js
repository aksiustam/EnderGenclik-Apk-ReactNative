"use server";
import prisma from "@/lib/prismadb";

export default async function updateBook(item) {
  try {
    await prisma.book.update({
      where: {
        id: parseInt(item.id),
      },
      data: {
        name: item.name,
        yazar: item.yazar,
        yayinevi: item.yayin,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

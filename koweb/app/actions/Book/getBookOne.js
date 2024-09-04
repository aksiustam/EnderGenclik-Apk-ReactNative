"use server";
import prisma from "@/lib/prismadb";

export default async function getBookOne(id) {
  try {
    const book = await prisma.Book.findFirst({
      where: {
        id: parseInt(id),
        archive: false,
      },
    });

    if (book) return book;
    else return null;
  } catch (error) {
    throw new Error(error);
  }
}

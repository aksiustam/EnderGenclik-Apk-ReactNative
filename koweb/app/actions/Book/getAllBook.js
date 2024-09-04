"use server";
import prisma from "@/lib/prismadb";

export default async function getAllBook() {
  try {
    const book = await prisma.Book.findMany({
      where: {
        archive: false,
      },
    });

    return book;
  } catch (error) {
    throw new Error(error);
  }
}

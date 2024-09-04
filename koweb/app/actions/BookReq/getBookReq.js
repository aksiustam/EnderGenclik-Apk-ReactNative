"use server";
import prisma from "@/lib/prismadb";

export default async function getBookReq() {
  try {
    const books = await prisma.Bookoneri.findMany();

    return books;
  } catch (error) {
    throw new Error(error);
  }
}

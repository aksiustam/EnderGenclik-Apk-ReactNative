"use server";
import prisma from "@/lib/prismadb";

export default async function getAllVideo() {
  try {
    const video = await prisma.Video.findMany({
      where: {
        archive: false,
      },
    });

    return video;
  } catch (error) {
    throw new Error(error);
  }
}

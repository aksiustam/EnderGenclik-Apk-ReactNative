"use server";
import prisma from "@/lib/prismadb";

export default async function getVideoOne(id) {
  try {
    const video = await prisma.Video.findFirst({
      where: {
        id: parseInt(id),
        archive: false,
      },
    });

    return video;
  } catch (error) {
    throw new Error(error);
  }
}

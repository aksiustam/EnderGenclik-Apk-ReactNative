"use server";
import prisma from "@/lib/prismadb";

export default async function setVideo(formData) {
  try {
    await prisma.Video.create({
      data: {
        name: formData.name,
        videoid: formData.videoid,
        videourl: formData.videourl,
        short: formData.short,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

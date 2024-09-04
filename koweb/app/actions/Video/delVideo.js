"use server";
import prisma from "@/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function delVideo(item) {
  try {
    console.log(item);
    await cloudinary.uploader.destroy(item.videoid, { resource_type: "video" });
    await prisma.Video.delete({
      where: {
        id: item.id,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

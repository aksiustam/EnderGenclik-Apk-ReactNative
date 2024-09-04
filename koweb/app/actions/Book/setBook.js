"use server";
import prisma from "@/lib/prismadb";

export default async function setBook(formData) {
  try {
    await prisma.Book.create({
      data: {
        name: formData.name,
        yazar: formData.yazar,
        yayinevi: formData.yayin,
        imageid: formData.imageid,
        imageurl: formData.imageurl,
        epubid: formData.epubid,
        epuburl: formData.epuburl,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

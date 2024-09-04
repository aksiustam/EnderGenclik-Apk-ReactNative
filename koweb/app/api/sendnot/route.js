import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import admin from "firebase-admin";
import serviceAccount from "@/firebaseadmin.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export async function GET(req, res) {
  try {
    const user = await prisma.User.findMany();

    let token = user[0].expoToken;
    const payload = {
      notification: {
        title: "Kitap Günlüğü",
        body: `Kitap Okuma Vakti! ${user[0].bildirim.page} Sayfanız Hazır Hemen Okuyun`,
      },
      token,
    };

    await admin.messaging().send(payload);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

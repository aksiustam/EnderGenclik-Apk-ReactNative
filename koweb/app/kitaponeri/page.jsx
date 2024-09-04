import React from "react";
import KitapOneriClient from "./KitapOneriClient";
import Sidebar from "../components/Layout/Sidebar";
import { getCurrentUser } from "../actions/getCurrentUser";
import { redirect } from "next/navigation";
import getBookReq from "../actions/BookReq/getBookReq";

const page = async () => {
  const bookoneri = await getBookReq();
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <KitapOneriClient bookoneri={bookoneri} />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

import React from "react";
import YazarlarClient from "./YazarlarClient";
import Sidebar from "../components/Layout/Sidebar";
import { getCurrentUser } from "../actions/getCurrentUser";
import { redirect } from "next/navigation";
import getYazarlar from "../actions/Yazarlar/getYazarlar";

const page = async () => {
  const yazarlar = await getYazarlar();
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <YazarlarClient yazarlar={yazarlar} />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

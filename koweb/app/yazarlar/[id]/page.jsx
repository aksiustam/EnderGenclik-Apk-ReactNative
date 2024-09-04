import React from "react";
import YazarOneClient from "./YazarOneClient";

import Sidebar from "@/app/components/Layout/Sidebar";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

import getYazarOne from "../../actions/Yazarlar/getYazarOne";

const page = async ({ params }) => {
  const { id } = params;
  const yazar = await getYazarOne(id);

  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <YazarOneClient yazar={yazar} />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

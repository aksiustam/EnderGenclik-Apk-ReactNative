import React from "react";
import YazarlarAdd from "./YazarlarAdd";

import Sidebar from "@/app/components/Layout/Sidebar";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
const page = async () => {
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <YazarlarAdd />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

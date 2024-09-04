import React from "react";

import Sidebar from "@/app/components/Layout/Sidebar";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import AddVideoClient from "./AddVideoClient";
const page = async () => {
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <AddVideoClient />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

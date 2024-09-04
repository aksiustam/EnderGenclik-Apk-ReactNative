import React from "react";

import { redirect } from "next/navigation";
import AddBookClient from "./AddBookClient";
import Sidebar from "@/app/components/Layout/Sidebar";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
const page = async () => {
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <AddBookClient />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

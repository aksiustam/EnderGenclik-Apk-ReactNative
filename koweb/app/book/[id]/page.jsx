import React from "react";
import BookOneClient from "./BookOneClient";

import Sidebar from "@/app/components/Layout/Sidebar";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import getBookOne from "@/app/actions/Book/getBookOne";

const page = async ({ params }) => {
  const { id } = params;
  const book = await getBookOne(id);

  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <BookOneClient book={book} />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

import React from "react";
import BookClient from "./BookClient";
import getAllBook from "../actions/Book/getAllBook";
import Sidebar from "../components/Layout/Sidebar";
import { getCurrentUser } from "../actions/getCurrentUser";
import { redirect } from "next/navigation";

const page = async () => {
  const book = await getAllBook();
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <BookClient book={book} />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

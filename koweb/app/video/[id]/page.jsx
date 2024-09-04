import React from "react";
import VideoOneClient from "./VideoOneClient";

import Sidebar from "@/app/components/Layout/Sidebar";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import getVideoOne from "@/app/actions/Video/getVideoOne";

const page = async ({ params }) => {
  const { id } = params;
  const video = await getVideoOne(id);
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <VideoOneClient video={video} />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

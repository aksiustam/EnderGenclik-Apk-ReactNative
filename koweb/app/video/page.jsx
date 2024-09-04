import React from "react";
import VideoClient from "./VideoClient";
import getAllVideo from "../actions/Video/getAllVideo";
import Sidebar from "../components/Layout/Sidebar";
import { getCurrentUser } from "../actions/getCurrentUser";
import { redirect } from "next/navigation";
const page = async () => {
  const video = await getAllVideo();
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <VideoClient video={video} />
        </main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;

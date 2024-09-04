"use client";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const VideoOneClient = (props) => {
  const { video } = props;

  const router = useRouter();
  const videoDel = async (item) => {
    Swal.fire({
      title: item.name + " Adlı Video Silinecek!! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await delVideo(item);
        if (res === true) {
          await Swal.fire({
            icon: "success",
            title: "Başarıyla Silindi",
            showConfirmButton: false,
            timer: 1100,
          });
          router.push("/video");
        } else {
          Swal.fire({
            icon: "error",
            title: JSON.stringify(res.message),
          });
        }
      }
    });
  };
  return (
    <div className="flex-1 mt-4 ">
      <div className="flex items-center justify-center m-2 p-2 border bg-blue-gray-600 rounded-full text-white">
        Video Düzenle
      </div>
      <div className="flex flex-col items-center justify-center">
        <video width="600" controls className="w-60 object-contain mb-6">
          <source src={video?.videourl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div>
          <Button className="w-52" onClick={() => videoDel(video)}>
            Sil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoOneClient;

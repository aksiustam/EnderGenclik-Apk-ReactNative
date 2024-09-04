"use client";

import setVideo from "@/app/actions/Video/setVideo";
import { Button, Input } from "@material-tailwind/react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddVideoClient = () => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState(null);

  const [short, setShort] = useState(true);

  const router = useRouter();
  const addVideo = async () => {
    if (name === "" || videos === null) {
      await Swal.fire({
        icon: "error",
        title: "Boş Bırakmayın",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = {
        name: name,
        videoid: videos?.public_id || undefined,
        videourl: videos?.secure_url || undefined,
        short: short,
      };

      const res = await setVideo(formData);
      if (res === true) {
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Eklendi",
          showConfirmButton: false,
          timer: 1100,
        });
        setName("");
        setVideos(null);
        router.refresh();
      } else {
        Swal.fire({
          icon: "error",
          title: JSON.stringify(res.message),
        });
      }
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center m-2 p-2 border bg-blue-gray-600 rounded-full text-white">
        Video EKLE
      </div>

      <div className="flex flex-col items-center justify-start gap-3">
        <Input
          name="name"
          size="lg"
          label="Video Adı"
          className="rounded-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-3 items-center justify-center">
          <label>Video Dosyası.. :</label>

          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(result) => {
              setVideos(result?.info);
            }}
            uploadPreset="kolayokuma_video"
            options={{
              maxFiles: 1,
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                setVideos(null);
                open();
              }

              return (
                <Button
                  type="button"
                  className="inline-flex space-x-2 items-center bg-blue-600"
                  onClick={handleOnClick}
                >
                  Video Yükle
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>

        <div className="mb-2 w-full">
          <label htmlFor="Short" className="capitalize block text-[13px]">
            Kısa Video Mu?*
          </label>
          <select
            name="short"
            id="short"
            className="text-sm px-6 text-gray-900 w-48 h-[50px] bg-white border-2 border-black"
            onChange={(e) => {
              if (e.target.value === "true") setShort(true);
              else setShort(false);
            }}
          >
            <option value={true}>Evet</option>
            <option value={false}>Hayır</option>
          </select>
        </div>
        <div className="w-full h-full">
          <Button className="w-52" onClick={() => addVideo()}>
            EKLE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddVideoClient;

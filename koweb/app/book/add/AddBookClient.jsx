"use client";
import setBook from "@/app/actions/Book/setBook";
import { Button, Input } from "@material-tailwind/react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddBookClient = () => {
  const [name, setName] = useState("");
  const [yazar, setYazar] = useState("");
  const [yayin, setYayin] = useState("");
  const [image, setImage] = useState(null);
  const [books, setBooks] = useState(null);

  const router = useRouter();
  const addBook = async () => {
    if (name === "" || image === null || books === null) {
      await Swal.fire({
        icon: "error",
        title: "Boş Bırakmayın",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = {
        name: name,
        yazar: yazar,
        yayin: yayin,
        imageid: image?.public_id || undefined,
        imageurl: image?.secure_url || undefined,
        epubid: books?.public_id || undefined,
        epuburl: books?.secure_url || undefined,
      };

      const res = await setBook(formData);
      if (res === true) {
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Eklendi",
          showConfirmButton: false,
          timer: 1100,
        });
        setName("");
        setYazar("");
        setYayin("");
        setImage(null);
        setBooks(null);
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
        Kitap EKLE
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <Input
          name="name"
          size="lg"
          label="Kitap Adı"
          className="rounded-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="name"
          size="lg"
          label="Yazar Adı"
          className="rounded-full"
          value={yazar}
          onChange={(e) => setYazar(e.target.value)}
        />
        <Input
          name="name"
          size="lg"
          label="Yayınevi"
          className="rounded-full"
          value={yayin}
          onChange={(e) => setYayin(e.target.value)}
        />

        <div className="flex gap-3 items-center justify-center">
          <label>Kitap Resmi.. :</label>

          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(result) => {
              setImage(result?.info);
            }}
            uploadPreset="kolayokuma_img"
            options={{
              maxFiles: 1,
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                setImage(null);
                open();
              }

              return (
                <Button
                  type="button"
                  className="inline-flex space-x-2 items-center bg-blue-600"
                  onClick={handleOnClick}
                >
                  Kitap Resmi Yükle
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <label>Kitap Dosyası... :</label>

          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(result) => {
              setBooks(result?.info);
            }}
            uploadPreset="kolayokuma_book"
            options={{
              maxFiles: 1,
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                setBooks(null);
                open();
              }

              return (
                <Button
                  type="button"
                  className="inline-flex space-x-2 items-center bg-blue-600"
                  onClick={handleOnClick}
                >
                  Kitap Dosyası Yükle
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        <Button className="w-52" onClick={() => addBook()}>
          EKLE
        </Button>
      </div>
    </div>
  );
};

export default AddBookClient;

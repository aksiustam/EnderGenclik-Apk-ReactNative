"use client";

import { Button, Input } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import updateBook from "@/app/actions/Book/updateBook";

const BookOneClient = (props) => {
  const { book } = props;
  const [name, setName] = useState(book?.name);
  const [yazar, setYazar] = useState(book?.yazar);
  const [yayin, setYayin] = useState(book?.yayinevi);

  const router = useRouter();
  const upBook = async () => {
    if (name === "") {
      await Swal.fire({
        icon: "error",
        title: "Boş Bırakmayın",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = {
        id: book.id,
        name: name,
        yazar: yazar,
        yayin: yayin,
      };

      const res = await updateBook(formData);
      if (res === true) {
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Eklendi",
          showConfirmButton: false,
          timer: 1100,
        });

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
        Kitap Düzenle
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
        <Button className="w-52" onClick={() => upBook()}>
          Değiştir
        </Button>
      </div>
    </div>
  );
};

export default BookOneClient;

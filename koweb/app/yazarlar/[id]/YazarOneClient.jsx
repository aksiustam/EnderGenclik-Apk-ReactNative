"use client";

import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import updateYazarlar from "../../actions/Yazarlar/updateYazarlar";

const YazarOneClient = (props) => {
  const { yazar } = props;

  const [name, setName] = useState(yazar?.name);
  const [tarih, setTarih] = useState(yazar?.tarih);
  const [text, setText] = useState(yazar?.text);
  const [text1, setText1] = useState(yazar?.text1);

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
        id: yazar.id,
        name: name,
        tarih: tarih,
        text: text,
        text1: text1,
      };

      const res = await updateYazarlar(formData);
      if (res === true) {
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Eklendi",
          showConfirmButton: false,
          timer: 1100,
        });

        location.reload();
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
        Ünlü Kişiler Düzenle
      </div>

      <div className="flex flex-col items-center justify-center gap-3 w-96">
        <Input
          name="name"
          size="lg"
          label="Ad Soyad"
          className="rounded-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="tarih"
          size="lg"
          label="Yaşadığı Tarih"
          className="rounded-full"
          value={tarih}
          onChange={(e) => setTarih(e.target.value)}
        />
        <Textarea
          name="text"
          size="lg"
          label="Yazı Kısa"
          className="rounded-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Textarea
          name="text1"
          size="lg"
          label="Yazı Uzun"
          className="rounded-full"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <Button className="w-52" onClick={() => upBook()}>
          Değiştir
        </Button>
      </div>
    </div>
  );
};

export default YazarOneClient;

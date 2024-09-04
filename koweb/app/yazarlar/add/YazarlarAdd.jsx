"use client";

import { Button, Input, Textarea } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import setYazarlar from "../../actions/Yazarlar/setYazarlar";

const YazarlarAdd = () => {
  const [name, setName] = useState("");
  const [tarih, setTarih] = useState("");
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");

  const router = useRouter();
  const addYazar = async () => {
    if ((name === "", tarih === "", text === "", text1 === "")) {
      await Swal.fire({
        icon: "error",
        title: "Boş Bırakmayın",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = {
        name: name,
        tarih: tarih,
        text: text,
        text1: text1,
      };

      const res = await setYazarlar(formData);
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
        Ünlü Kişiler Ekle
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
        <Button className="w-52" onClick={() => addYazar()}>
          Ekle
        </Button>
      </div>
    </div>
  );
};

export default YazarlarAdd;

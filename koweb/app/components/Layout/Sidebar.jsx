"use client";
import Link from "next/link";
import React from "react";
import Logo from "@/public/Logo.png";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
const Sidebar = ({ children }) => {
  return (
    <>
      <aside
        className={` bg-light-green-900 fixed  z-50 my-4 ml-4 h-[calc(100vh-32px)] w-48 rounded-xl  `}
      >
        <Link href="/">
          <div className="flex flex-col items-center gap-2  py-4 px-8">
            <Image
              src={Logo}
              alt="LOGO"
              width={1000}
              height={1000}
              className="h-24 w-24 "
            />
            <div className={`border w-full  border-white/80 `} />
            <Typography variant="small" color="white">
              Hoşgeldiniz
            </Typography>
            <div className={`border w-full  border-white/80 `} />
          </div>
        </Link>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            <li>
              <Link href={`/`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75"
                  >
                    Anasayfa
                  </Typography>
                </Button>
              </Link>
            </li>
            <li>
              <Link href={`/book`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75"
                  >
                    Kitaplar
                  </Typography>
                </Button>
              </Link>
            </li>
            <li>
              <Link href={`/video`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75"
                  >
                    Videolar
                  </Typography>
                </Button>
              </Link>
            </li>
            <li>
              <Link href={`/yazarlar`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75 text-nowrap"
                  >
                    Önemli Kişiler
                  </Typography>
                </Button>
              </Link>
            </li>
            <li>
              <Link href={`/kitaponeri`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75 text-nowrap"
                  >
                    Kitap Önerileri
                  </Typography>
                </Button>
              </Link>
            </li>
            <li>
              <Link href={`/ayarlar`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75"
                  >
                    Ayarlar
                  </Typography>
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="ml-56 pt-6 flex flex-1 overflow-x-auto">{children}</div>
    </>
  );
};

export default Sidebar;

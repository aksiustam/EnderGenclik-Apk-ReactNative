import { Inter } from "next/font/google";
import "./globals.css";
import MaterialContext from "@/context/MaterialContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EnderGenclik Websitesi",
  description: "Ender Gençlik Web Sitesi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <MaterialContext>
          <div className="w-full h-full ">{children}</div>
        </MaterialContext>
      </body>
    </html>
  );
}

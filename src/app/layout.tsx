"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "tailwindcss/tailwind.css";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </RecoilRoot>
  );
}

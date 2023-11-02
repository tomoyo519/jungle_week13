"use client";

import { RecoilRoot, atom } from "recoil";

interface IUser {
  email: string;
  isLogin: boolean;
}
export const userState = atom<IUser>({
  key: "UserState",
  default: { email: "", isLogin: false },
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

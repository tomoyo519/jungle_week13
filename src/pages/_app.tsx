import "./globals.css";
import "tailwindcss/tailwind.css";
import { RecoilRoot, atom } from "recoil";
import type { AppProps } from "next/app";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
import { HydrationProvider, Client } from "react-hydration-provider";

interface IUser {
  email: string;
  isLogin: boolean;
}
export const userState = atom({
  key: "userState",
  default: { email: "", isLogin: false },

  effects_UNSTABLE: [persistAtom],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HydrationProvider>
      <Client>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </Client>
    </HydrationProvider>
  );
}

export default MyApp;

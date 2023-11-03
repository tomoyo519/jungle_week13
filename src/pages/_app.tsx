// import "../styles/globals.css";
import { RecoilRoot, atom } from "recoil";
// import RecoilizeDebugger from 'recoilize';

export const userState = atom<IUser>({
  key: "userState",
  default: { email: "", isLogin: false },
});
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      {/* <RecoilizeDebugger /> */}
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;

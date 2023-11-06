import { useRecoilState } from "recoil";
import "tailwindcss/tailwind.css";
import { userState } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const navigation = [
    { name: "게시글 작성하기", href: "/post" },
    { name: "게시글 확인하기", href: "/postList" },
  ];
  const [loginStatus, setLoginStatus] = useRecoilState(userState);
  const router = useRouter();
  function setLogout() {
    alert("로그아웃이 완료 되었어요!");
    router.push("/");
    setLoginStatus({ email: "", isLogin: false });
  }

  function checkNav(href: string) {
    if (!loginStatus.isLogin) {
      alert("로그인이 되어있지 않으면 글을 쓸 수 없어요! 로그인 해주세요 :)");
      router.push("/login");
    } else {
      router.push(`${href}`);
    }
  }
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>

        <div className="gap-x-2 flex lg:gap-x-12">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => checkNav(item.href)}
              className="text-md font-semibold leading-6 text-gray-900 hover:text-gray-500"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className=" flex flex-1 justify-end">
          {loginStatus.isLogin ? (
            <div className="flex items-center justify-center">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                어서오세요!
              </div>
              <div className="flex items-center justify-center ml-3">
                <button
                  onClick={() => setLogout()}
                  className="rounded-md bg-indigo-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  로그아웃하기 <span aria-hidden="true"></span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="hover:text-gray-500 text-sm font-semibold leading-6 text-gray-900"
            >
              로그인 하기 <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

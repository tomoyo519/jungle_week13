import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import "tailwindcss/tailwind.css";
import { userState } from "@/pages/_app";
import Link from "next/link";

export default function Navbar() {
  const navigation = [
    { name: "게시글 작성하기", href: "/post" },
    { name: "게시글 확인하기", href: "/postList" },
  ];
  const [loginStatus, setLoginStatus] = useRecoilState(userState);
  console.log("loginStatus", loginStatus);

  function setLogout() {
    alert("로그아웃이 완료 되었어요!");
    setLoginStatus({ email: "", isLogin: false });
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
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className=" flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className=" flex flex-1 justify-end">
          {loginStatus.isLogin ? (
            <div className="flex items-center justify-center">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                어서오세요, {loginStatus.email}님
              </div>
              <div className="flex items-center justify-center ml-3">
                <button
                  onClick={() => setLogout()}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  로그아웃하기 <span aria-hidden="true"></span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              로그인 하기 <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

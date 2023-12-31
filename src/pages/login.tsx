import Navbar from "@/components/navbar";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { userState } from "./_app";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function Login() {
  const [signupMode, setSignupMode] = useState<boolean>(false);
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useRecoilState(userState);

  function beforeSubmit() {
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const email = document.querySelector<HTMLInputElement>("#email")!.value;
    const password =
      document.querySelector<HTMLInputElement>("#password")!.value;

    if (signupMode) {
      const checkPassword =
        document.querySelector<HTMLInputElement>("#checkpassword")!.value;
      if (password != checkPassword) {
        alert("비밀번호가 동일하지 않습니다! 다시 입력해주세요.");
        document.querySelector<HTMLInputElement>("#password")!.value = "";
        document.querySelector<HTMLInputElement>("#checkpassword")!.value = "";
        return false;
      }
    }
    if (email.length <= 3) {
      alert("아이디는 3글자 이상으로 작성해주세요.");
      return false;
    }
    if (!passwordPattern.test(password)) {
      alert("비밀번호는 영문, 숫자 혼합 8글자 이상으로 작성 해주세요.");
      return false;
    }

    const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
    if (signupMode) {
      const res = axios
        .post(`${API_URL}/users`, {
          email: email,
          password: password,
        })
        .then((res) => {
          alert("회원가입이 완료 되었어요!");
          document.querySelector<HTMLInputElement>("#email")!.value = "";
          document.querySelector<HTMLInputElement>("#password")!.value = "";
          setSignupMode(false);
        })
        .catch((err) => {
          alert("회원가입이 완료 되었어요!");
          document.querySelector<HTMLInputElement>("#email")!.value = "";
          document.querySelector<HTMLInputElement>("#password")!.value = "";
          setSignupMode(false);
        });
    }
    if (!signupMode) {
      const res = axios
        .post(`${API_URL}/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          setLoginStatus({ email: email, isLogin: true });
          alert("로그인이 완료 되었습니다.");
          router.push("/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <>
      <div className="min-h-screen bg-white ">
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Navbar />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm pt-14 bg-gray-100 p-10 mb-10 rounded-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    이메일
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="3글자 이상 입력해주세요."
                      className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      비밀번호
                    </label>
                    <div className="text-sm"></div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="영문, 숫자 포함 8글자 이상 입력해주세요."
                      className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {signupMode ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        비밀번호 확인
                      </label>
                      <div className="text-sm"></div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="checkpassword"
                        name="checkpassword"
                        type="password"
                        required
                        placeholder="영문, 숫자 포함 8글자 이상 입력해주세요."
                        className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {signupMode ? (
                  <>
                    {" "}
                    <div>
                      <button
                        onClick={() => beforeSubmit()}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        회원가입 하기
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <button
                      onClick={() => beforeSubmit()}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      로그인 하기
                    </button>
                    <p className="mt-10 text-center text-sm text-gray-500">
                      회원이 아니신가요?{" "}
                    </p>
                    <button
                      className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setSignupMode(true)}
                    >
                      회원가입 하러 가기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

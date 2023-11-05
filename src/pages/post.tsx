import { Tab } from "@headlessui/react";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { useRecoilState } from "recoil";
import { userState } from "./_app";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Post() {
  const [title, setTitle] = useState<string | undefined>();
  const [context, setContext] = useState<string | undefined>();
  const [loginStatus, setLoginStatus] = useRecoilState(userState);

  async function newPost() {
    if (title && title.length < 10 && context) {
      alert("제목은 10글자 이상 작성해야 합니다.");
      return false;
    }
    if (title && context && title.length >= 10 && context.length > 0) {
      const res = await axios
        .post("http://localhost:4000/post", {
          email: loginStatus.email,
          title: title,
          context: context,
        })
        .then((res) => {
          alert("새 게시글이 등록 되었어요!");
          document.querySelector<HTMLInputElement>("#comment")!.value = "";
          document.querySelector<HTMLInputElement>("#title")!.value = "";
        })
        .catch((err) => {
          alert(err.data);
        });
    }
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-2lg bg-white min-h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <Navbar />
      </div>
      <div className=" mr-10 ml-10 flex">
        <div className="w-full p-10 rounded-2xl bg-gray-100">
          <Tab.Group>
            {({ selectedIndex }) => (
              <>
                <Tab.List className="flex items-center">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                        "rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
                      )
                    }
                  >
                    게시글 작성
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                        "ml-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
                      )
                    }
                  >
                    미리보기
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                    <label htmlFor="comment" className="sr-only">
                      Comment
                    </label>
                    <div>
                      <textarea
                        required
                        rows={1}
                        name="title"
                        id="title"
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="10글자 이상 제목을 작성해주세요."
                        defaultValue={""}
                        onChange={(e) => setTitle(e.target.value)}
                      />

                      <div className="mb-t mt-5"></div>
                      <textarea
                        required
                        rows={19}
                        name="comment"
                        id="comment"
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="내용을 작성해주세요."
                        defaultValue={""}
                        onChange={(e) => setContext(e.target.value)}
                      />
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                    <div className="border-b">
                      <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                        {title}
                      </div>
                      <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                        {context}
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </>
            )}
          </Tab.Group>
          <div className="mt-2 flex justify-end">
            {context && context.length > 0 && title && title.length > 0 ? (
              <button
                //   type="submit"
                onClick={() => newPost()}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                게시글 작성하기
              </button>
            ) : (
              <button
                disabled
                className="inline-flex items-center rounded-md bg-indigo-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                게시글 작성하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

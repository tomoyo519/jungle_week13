import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface IPost {
  id: number;
  title: string;
  context: string;
}
export default function Sample() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<IPost>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContext, setEditedContext] = useState<string>("");

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const res = axios
      .get(`${API_URL}/post`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setPost(res.data[0]);
          setEditedTitle(res.data[0].title);
          setEditedContext(res.data[0].context);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, [id]);

  function deletePost() {
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const res = axios
      .delete(`${API_URL}/post/${id}`)
      .then((res) => {
        alert("삭제가 완료 되었어요!");
        router.push("/postList");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function editPost() {
    if (editedTitle.length < 10 && editedContext.length > 0) {
      alert("제목은 열글자 이상 작성해주세요");
    }
    if (editedContext.length <= 0) {
      alert("내용을 입력해주세요.");
    }
    if (editedContext.length <= 0 && editedTitle.length < 10) {
      alert("제목은 열 자자 이상, 내용은 한 글자 이상 작성 해주세요.");
    }
    if (post && editedContext == post.title && editedTitle == post.title) {
      console.log(editedContext, post.title, editedTitle, post.title);
      alert("변경 내용이 없어요!");
      return;
    }
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const res = axios
      .put(`${API_URL}/post/${id}`, {
        title: editedTitle,
        context: editedContext,
      })
      .then((res) => {
        alert("수정이 완료 되었어요!");
        router.push("/postList");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-2lg bg-white min-h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Navbar />
      </div>

      <div className="mx-auto mr-10 ml-10  p-10 rounded-2xl bg-gray-100 mb-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 ">
          <div className="sm:col-span-2 ">
            {post && (
              <div>
                <div className="-m-0.5 rounded-lg p-0.5  pb-5">
                  <div className="">
                    {isEditMode ? (
                      <>
                        <textarea
                          required
                          rows={1}
                          name="title"
                          id="title"
                          className=" p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="10글자 이상 제목을 작성해주세요."
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <div className="mb-t mt-5"></div>
                        <textarea
                          required
                          rows={19}
                          name="comment"
                          id="comment"
                          className="p-1 min-h-[440px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="내용을 작성해주세요."
                          value={editedContext}
                          onChange={(e) => setEditedContext(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <div className="mx-px mt-px px-3 pb-12 pt-2 text-2xl font-semibold leading-7 text-gray-900">
                          {post.title}
                        </div>

                        <div className="mx-px mt-px px-3 pb-12 pt-2 text-lg leading-5 text-gray-800 min-h-[440px]">
                          {post.context}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full">
          {isEditMode ? (
            <div className=" w-full justify-end flex  ">
              <div className="m-1">
                <button
                  onClick={() => editPost()}
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className=" w-full justify-end flex ">
              <div className="m-1">
                <button
                  onClick={() => setIsEditMode(true)}
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              </div>

              <div className="m-1">
                <button
                  onClick={() => deletePost()}
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className=" w-5 h-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

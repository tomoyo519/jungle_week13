import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/app/navbar";
const name = () => {
    const router = useRouter();
  console.log(router);
  return (
 <div className="sm:mx-auto sm:w-full sm:max-w-lg">
           <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <Navbar />
        <div className="pt-14">
          
                       <label htmlFor="comment" className="sr-only">
                  Comment
                </label>
                <div>
                    <textarea
                    required
                    rows={1}
                    name="title"
                    id="title"
                    className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="10글자 이상 제목을 작성해주세요."
                    defaultValue={''}
                    onChange={(e)=>setTitle(e.target.value)}
                  />
                    <div className='mb-t mt-5'></div>
                  <textarea
                    required
                    rows={5}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="내용을 작성해주세요."
                    defaultValue={''}
                    onChange={(e)=>setContext(e.target.value)}
                  />
                  </div>
        </div>
        </div>
        </div>
    
  );
};

export default name;
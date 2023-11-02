import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import "tailwindcss/tailwind.css"
import Navbar from '@/app/navbar'
export default function PostList() {
const [posts, setPosts] = useState<IPost>()
const router = useRouter()
const { id } = router.query;

interface IPost{
    id: number,
    title:string,
    context:string
}

useEffect(()=>{
    axios.get('http://localhost:4000/post').then((res)=>{
    setPosts(res.data)
    })
}, [])

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-2lg pt-14" >
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <Navbar />
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      { posts && posts.map((post:IPost) => (
        <li key={post.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{post.title}</h3>
               
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{post.context}</p>
            </div>
            
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
           <div className="flex w-0 flex-1 relative -mr-px items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900" >
            <Link href={{pathname: '/post/[id]', query:{id:post.id}}} className="flex items-center justify-center">
               <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg></div>
                  <div>크게 보실래요?</div>
              
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
    </div>
  )
}

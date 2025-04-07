//import { Button } from "@/components/ui/button"
//import { Chrome } from "lucide-react"
//import Features from "@/components/features"
//import Hero from "@/components/hero"
//import FAQ from "@/components/faq"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import {Form} from "@/components/Form"

export const runtime = 'edge'

export default async function Home({
  params
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(params.lang)
  const tempPosts = dict.blog.posts.slice(0, 16);  // 取前 8 个元素
  const posts = tempPosts.sort((a, b) => b.id - a.id);  // 按 `id` 降序排序

  const classicPosts=dict.blog.postsClassic.slice(0, 16).sort((a, b) => b.id - a.id);

  return (
    <main className="flex flex-col items-center w-full">

        <div className="max-w-6xl w-full mx-auto text-center mt-8">
            <h1 className="md:text-4xl text-3xl font-extrabold">{dict.common.brand}</h1>            
            <p className="mt-6"></p>
            
                <Form params={{ name: "", lang: params.lang }}/> 

        </div>

      <div className="container py-10 px-4">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">{dict.home.nesGame.title}</h2>
            <a href={`/${params.lang}/${dict.home.nesGame.url}`} className="text-sm text-blue-500 hover:underline">{dict.home.nesGame.more} &gt;</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {posts.map(post => (
              <a href={`/${params.lang}/game/${post.slug}`}>
                <div className="text-center">
                  <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
                    <img src={post.img} alt={post.title} className="object-cover w-full h-full"/>
                  </div>
                  <p className="mt-2 text-sm">{post.title}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6 mt-8">
            <h2 className="text-3xl font-bold">{dict.home.classicGame.title}</h2>
            <a href='#' className="text-sm text-blue-500 hover:underline">{dict.home.classicGame.more} &gt;</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {classicPosts.map(post => (
              <a href={`/${params.lang}/game/${post.slug}`}>
                <div className="text-center">
                  <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
                    <img src={post.img} alt={post.title} className="object-cover w-full h-full"/>
                  </div>
                  <p className="mt-2 text-sm">{post.title}</p>
                </div>
              </a>
            ))}
          </div>
          
      </div>

      
    </main>
  )
}

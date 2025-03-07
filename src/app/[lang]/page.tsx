//import { Button } from "@/components/ui/button"
//import { Chrome } from "lucide-react"
//import Features from "@/components/features"
//import Hero from "@/components/hero"
//import FAQ from "@/components/faq"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

export const runtime = 'edge'

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const tempPosts = dict.blog.posts
  const posts = tempPosts.sort((a, b) => b.id - a.id);  // 按 `id` 降序排序

  return (
    <main className="flex flex-col items-center w-full">

      <div className="container py-10 px-4">

          <div className="flex justify-center mt-6">
              <section className="">
                <a target="_blank" className="container flex  px-4 bg-blue-500 text-white text-center p-2 rounded-md font-medium  text-xl gap-1 items-center w-full" href="https://docs.qq.com/doc/DZXpxZmxLSm9xY2FP">{dict.home.hero.title}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-external-link ">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </a>
              </section>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">{dict.home.game.title}</h2>
            <a href="#" className="text-sm text-blue-500 hover:underline">{dict.home.game.more} &gt;</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {posts.map(post => (
              <a href={`/${lang}/game/${post.slug}`}>
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

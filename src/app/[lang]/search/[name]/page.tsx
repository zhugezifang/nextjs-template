//import { Button } from "@/components/ui/button"
//import { Chrome } from "lucide-react"
//import Features from "@/components/features"
//import Hero from "@/components/hero"
//import FAQ from "@/components/faq"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import {Form} from "@/components/Form"
import {ResultCard} from "@/components/ResultCard"

export const runtime = 'edge'

export default async function Search({
  params
}: {
  params: { name:string, lang: Locale }
}) {
  const dict = await getDictionary(params.lang)
  const gameName= decodeURIComponent(params.name);
  console.log(gameName);
  const tempPosts = dict.blog.posts;  // 取前 8 个元素
  const posts = [];  // 按 `id` 降序排序
  for (let index = 0; index < tempPosts.length; index++) {
    const element = tempPosts[index];
    if(element.title.includes(gameName)){
      posts.push(element);
    }
  }

  const classicPosts = dict.blog.postsClassic;

  for (let index = 0; index < classicPosts.length; index++) {
    const element = classicPosts[index];
    if(element.title.includes(gameName)){
      posts.push(element);
    }
  }
  console.log(posts);

  return (
    <main className="flex flex-col items-center w-full">

        <div className="max-w-6xl w-full mx-auto text-center mt-8">
            <h1 className="md:text-4xl text-3xl font-extrabold">{dict.common.brand}</h1>            
            <p className="mt-6"></p>
            
            <Form params={params}/> 

        </div>

        <ResultCard params={{ posts, lang: params.lang }}/>

      
    </main>
  )
}

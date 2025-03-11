import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getPost } from "@/lib/getPost"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import { ScrollToTop } from "@/components/scroll-to-top"
import {Game} from  "@/components/game"

export const runtime = 'edge'

export default async function BlogPost({ params }: { params: { slug: string, lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  // Bug 修复：显式声明 result 数组的类型
  const result: {id:number,title:string,description:string;img:string;date:string;readTime:string;slug:string; }[] = [];
  dict.blog.posts.forEach((menu) => {
    if (menu.slug === params.slug) {
      return;
    } else {
      result.push(menu);
    }
  });

  // 从result里面随机取三个
  const randomThree = new Set();
  while (randomThree.size < 8) {
    const randomIndex = Math.floor(Math.random() * result.length);
    randomThree.add(result[randomIndex]);
  }

  // 将 Set 转换为数组
  const randomThreeArray:any = Array.from(randomThree);

  const post = await getPost(params.slug, params.lang) as unknown as { 
    title: string; 
    date: string; 
    author: string; 
    readTime: string; 
    contentHtml: string; 
    url: string;
  }

  return (
    <main className="container">

      <div className="py-2">

          <h1 className="mb-4 text-center text-3xl font-bold">{post.title}</h1>
          <Game url={post.url}></Game>
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold">{params.lang === 'en' ? 'Other Games' : '相关游戏'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {randomThreeArray.map((post: {id:number,title:string,description:string;img:string;date:string;readTime:string;slug:string; }) => (
              <a href={`/${params.lang}/game/${post.slug}`}>
                <div className="text-center">
                  <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
                    <img src={`/${post.img}`} alt={post.title} className="object-cover w-full h-full"/>
                  </div>
                  <p className="mt-2 text-sm">{post.title}</p>
                </div>
              </a>
            ))}
          </div>
          
      </div>

      <article className="prose prose-gray dark:prose-invert mx-auto">
        

        

        <div className="py-4 mx-auto max-w-screen-xl sm:py-6">
          <script async data-cfasync="false" src="//dustinga.com/d1472120778daf83cc623354618f95b3/invoke.js"></script>
          <div id="container-d1472120778daf83cc623354618f95b3"></div>
        </div>
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      
      </article>

      

      <ScrollToTop />
    </main>
  )
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string, lang: Locale } 
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const post = await getPost(params.slug, params.lang) as unknown as { 
    title: string
    description?: string
    author: string
    date: string
  }
  const url = process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'

  return {
    title: post.title,
    description: post.description || dict.blog.description,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      locale: params.lang,
      url: `${url}/${params.lang}/game/${params.slug}`,
      title: post.title,
      description: post.description || dict.blog.description,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || dict.blog.description,
    },
    alternates: {
      canonical: `${url}/${params.lang}/game/${params.slug}`,
      languages: {
        'en': `${url}/en/game/${params.slug}`,
        'zh': `${url}/zh/game/${params.slug}`,
      },
    },
  }
}

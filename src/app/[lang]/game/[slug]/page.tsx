import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getPost } from "@/lib/getPost"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import { ScrollToTop } from "@/components/scroll-to-top"

export const runtime = 'edge'

export default async function BlogPost({ params }: { params: { slug: string, lang: Locale } }) {
  const dict = await getDictionary(params.lang)
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

     <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', () => {
                  const button = document.getElementById('myButton');
                  button.addEventListener('click', () => {
                    document.getElementById("game").requestFullscreen();
                  });
                });
              `,
            }}
      />

      <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden relative p-6">
                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <button id="myButton" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" title="Fullscreen">Fullscreen</button>
                      </div>
                      <iframe id="game" src={post.url}
                      style={{border:'10px solid #fff', top: '0px', left: '0px',width: '100%', height: '500px'}} loading="lazy"
                      ></iframe>
      </div>

      

      <article className="prose prose-gray dark:prose-invert mx-auto py-4">
        <h1 className="mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-500 mb-8">
          <span>{post.date}</span>
          <span className="mx-2">·</span>
          <span>{post.author}</span>
          <span className="mx-2">·</span>
          <span>{post.readTime}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      <Link href={`/${params.lang}/game`}>
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {dict.blog.backToList}
        </Button>
      </Link>
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
        'en-US': `${url}/en-US/game/${params.slug}`,
        'zh-CN': `${url}/zh-CN/game/${params.slug}`,
      },
    },
  }
}

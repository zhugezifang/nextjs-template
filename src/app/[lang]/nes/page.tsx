import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'

export const runtime = 'edge'

export default async function NES({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const tempPosts = dict.blog.posts;  // 取前 8 个元素
  const posts = tempPosts.sort((a, b) => b.id - a.id);  // 按 `id` 降序排序

  return (
    <main className="flex flex-col items-center w-full">

      <div className="max-w-4xl w-full mx-auto text-center py-4">
          <h1 className="text-4xl font-bold mb-4">{dict.home.nesGame.longTitle}</h1>
          <p className="py-4">
          {dict.home.nesGame.desc}
          </p>
      </div>

      <div className="container py-10 px-4">

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {posts.map(post => (
              <a href={`/${lang}/game/${post.slug}`}>
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

      
    </main>
  )
}


export async function generateMetadata({ 
  params: { lang } 
}: { 
  params: { lang: Locale } 
}): Promise<Metadata> {
  const dict = await getDictionary(lang)
  const url = process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'

  return {
    title: dict.home.nesGame.longTitle,
    description: dict.home.nesGame.desc,
    alternates: {
      canonical: `${url}/${lang}/nes`,
      languages: {
        'en': `${url}/en/nes`,
        'zh': `${url}/zh/nes`,
      },
    },
    openGraph: {
      title: dict.home.nesGame.longTitle,
      description: dict.home.nesGame.desc,
      url: `${url}/${lang}/game`,
    }
  }
}


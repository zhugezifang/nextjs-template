import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"
import Features from "@/components/features"
import Hero from "@/components/hero"
import FAQ from "@/components/faq"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <main className="flex flex-col items-center w-full">
      

      <div className="max-w-6xl mx-auto py-10 px-4">
    
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">热门FC</h1>
      <a href="#" className="text-sm text-blue-500 hover:underline">更多 &gt;</a>
    </div>
    
    
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
      
      <div className="text-center">
        <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
          <img src="game1.png" alt="魂斗罗" className="object-cover w-full h-full"/>
        </div>
        <p className="mt-2 text-sm text-gray-800">魂斗罗</p>
      </div>
      
      <div className="text-center">
        <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
          <img src="game2.png" alt="超级马里奥" className="object-cover w-full h-full"/>
        </div>
        <p className="mt-2 text-sm text-gray-800">超级马里奥</p>
      </div>

      <div className="text-center">
        <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
          <img src="game3.png" alt="激龟快打" className="object-cover w-full h-full"/>
        </div>
        <p className="mt-2 text-sm text-gray-800">激龟快打</p>
      </div>

      <div className="text-center">
        <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
          <img src="game4.png" alt="雪人兄弟" className="object-cover w-full h-full"/>
        </div>
        <p className="mt-2 text-sm text-gray-800">雪人兄弟</p>
      </div>

      <div className="text-center">
        <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
          <img src="game5.png" alt="魂斗罗力量" className="object-cover w-full h-full"/>
        </div>
        <p className="mt-2 text-sm text-gray-800">魂斗罗力量</p>
      </div>

      <div className="text-center">
        <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
          <img src="game6.png" alt="坦克大战" className="object-cover w-full h-full"/>
        </div>
        <p className="mt-2 text-sm text-gray-800">坦克大战</p>
      </div>

      <div className="text-center">
        <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
          <img src="game7.png" alt="冒险岛" className="object-cover w-full h-full"/>
        </div>
        <p className="mt-2 text-sm text-gray-800">冒险岛</p>
      </div>

      <div className="text-center">
        <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
          <img src="game8.png" alt="热血格斗" className="object-cover w-full h-full"/>
        </div>
        <p className="mt-2 text-sm text-gray-800">热血格斗</p>
      </div>
    </div>
  </div>

      <Hero lang={lang} />
      <Features lang={lang} />
      <FAQ lang={lang} />
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {dict.home.cta.title}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {dict.home.cta.description}
            </p>
            <Button size="lg" className="mt-4">
              <Chrome className="mr-2 h-5 w-5" />
              {dict.home.cta.button}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client";
import type { Locale } from '@/i18n/config';
import React from 'react';

export function ResultCard({ params }: { params: {posts:{ id: number; title: string; description: string; img: string; date: string; readTime: string; slug: string; }[], lang: Locale } }) {
  const lang = params.lang as string;

  return (

    <div className="container py-10 px-4">
        {params.posts&&<>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
                {params.posts.map((post: { id: number; title: string; description: string; img: string; date: string; readTime: string; slug: string; }) => (
                <a href={`/${params.lang}/game/${post.slug}`}>
                    <div className="text-center">
                    <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden">
                        <img src={`/${post.img}`} alt={`${post.title}`} className="object-cover w-full h-full"/>
                    </div>
                    <p className="mt-2 text-sm">{post.title}</p>
                    </div>
                </a>
                ))}
            </div>
        </>}  
    </div>

  );
}
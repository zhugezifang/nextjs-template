"use client";
import type { Locale } from '@/i18n/config';
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from'react'

export function Form({ params }: { params: { name:string, lang: Locale } }) {
  const router = useRouter();
  const lang = params.lang as string;
  const [name, setInputValue] = useState('');
  
  useEffect(() => {
    // 在组件加载时立即执行请求
    setInputValue(decodeURIComponent(params.name));
  }, []); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      router.push(`/search/${name}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : '请求失败');
    } finally {
    }
  };

  return (

    <div className="flex justify-center items-center">
        <div className="max-w-md w-full rounded-lg shadow-md p-6">
            <div className="relative">
                <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="请输入游戏名称..." 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                <button onClick={handleSubmit} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                </button>
            </div>
        </div>
    </div>
  );
}
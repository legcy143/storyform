"use client"
import { Button } from '@heroui/react'
import React, { Suspense } from 'react'
import usePagging from './_store/usePagging';
import { StoryFormPages } from './_pages/StoryFormPages';

export default function Home() {
  const currentPage = usePagging((state) => state.currentPage);

  if (!currentPage) {
    return <div>Loading...</div>
  }

  const Page = StoryFormPages[currentPage as keyof typeof StoryFormPages];

  return <Suspense fallback={<div></div>}>
    <section className='w-full max-w-[40rem] mx-auto '>
      <Page />
    </section>
  </Suspense>

}

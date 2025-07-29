import usePagging from '@/app/_store/usePagging'
import ThemeButton from '@/components/ui/ThemeButton'
import { Button } from '@heroui/react'
import React from 'react'

export default function Landing() {
  const setCurrentPage = usePagging((state) => state.setCurrentPage)
  return (
    <div className='flex flex-col items-center  text-center animate-appearance-in'>
      <h1 className='text-primary text-5xl lg:text-7xl font-bold'>StoryForm AI Portraits</h1>
      <p className='opacity-60 text-xl p-3'>Create a fun story, take a selfie, and receive a unique AI Portrait.</p>
      <>
        <ThemeButton className='mt-5' onPress={() => setCurrentPage("paragraphForm")}>Start your Story</ThemeButton>
      </>
    </div>
  )
}

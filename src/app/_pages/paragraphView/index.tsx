import usePagging from '@/app/_store/usePagging';
import ThemeButton from '@/components/ui/ThemeButton';
import { Divider } from '@heroui/react';
import React from 'react'

export default function ParagraphView() {
  const setCurrentPage = usePagging(s => s.setCurrentPage)

  const handleCreateAnother = () => {
    setCurrentPage('paragraphForm')
  }

  const handleContinue = () => {
    setCurrentPage('cameraInstruction')
  }

  return (
    <section className='animate-appearance-in border border-gray-700/50 rounded-2xl p-5 bg-black/50 backdrop-blur-sm  flex flex-col gap-7'>
      <section className='bg-gray-800 p-5 rounded-xl flex flex-col gap-5'>
        <h1 className='text-center text-3xl md:text-4xl font-semibold text-primary' >The Big Reveal</h1>
        <Divider className='bg-gray-600/50 h-[1.5px] mb-5' />
        <div className='flex flex-col gap-3 text-xl font-semibold'>
          <p>word goes here</p>
          <p>word goes here</p>
          <p>The crowd went wild</p>
        </div>
      </section>
      <div className='w-fit mx-auto space-x-5'>
        <ThemeButton onPress={handleCreateAnother} variant='bordered'>Create Another story</ThemeButton>
        <ThemeButton onPress={handleContinue}>Continue</ThemeButton>
      </div>

    </section>
  )
}

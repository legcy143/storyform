import ThemeButton from '@/components/ui/ThemeButton'
import React from 'react'
import { LuCrosshair } from 'react-icons/lu'

export default function Finish() {
  return (
    <section className='animate-appearance-in border border-gray-400/50 rounded-2xl p-5 bg-gray-500/50 backdrop-blur-sm  flex flex-col items-center justify-center gap-1 m-auto text-center' >
      <img src="/loading.gif" className='size-[10rem]' alt="" />
      <h1 className='text-2xl md:text-3xl font-bold'>Ai Magic At work</h1>
      <p>Your portraits will be delivered soon on your email</p>
      <ThemeButton className='mt-5'><LuCrosshair /> Close</ThemeButton>
    </section>
  )
}

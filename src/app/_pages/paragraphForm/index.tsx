"use client"
import usePagging from '@/app/_store/usePagging'
import ThemeButton from '@/components/ui/ThemeButton'
import { Divider, input } from '@heroui/react'
import React, { useState } from 'react'

export default function ParagraphForm() {
  const setCurrentPage = usePagging(s => s.setCurrentPage)
  const [word, setWord] = useState("At %confrence=% , %Alex=% , a %Role=% at %company=% , unveiled their latest concept: %invention=% .")
  const handleOnChange = (key: string, value: string) => {
    let newWord = word.replace(key, `${key}=${value}`)
    setWord(newWord)
  }

  const handleContinue = () => {
    setCurrentPage('paragraphView')
  }

  return (
    <section className='animate-appearance-in border border-gray-700/50 rounded-2xl p-5 bg-black/50 backdrop-blur-sm  flex flex-col gap-7'>
      <h1 className='text-center text-3xl md:text-4xl font-semibold' >The Big Reveal</h1>
      <Divider className='bg-gray-600/50 h-[1.5px] mb-5'/>
      <div className='flex flex-row flex-wrap gap-2 capitalize font-semibold text-center transition-all text-xl'>
        {
          word?.split(" ")?.map((e, i) => {
            if (e.startsWith("%")) {
              const inputWord = e.replaceAll("%", "")?.split("=")
              const placeholder = inputWord?.[0] ?? "";
              const value = inputWord?.[1] ?? "";
              console.log("place hodler ", placeholder, "input ", value, inputWord)
              return <input
                key={i}
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleOnChange(placeholder, e.target.value)}
                className='field-sizing-content min-w-[5rem] max-w-full outline-none border-b border-primary text-center text-primary placeholder:text-gray-400 px-1 transition-all'
              />
            }
            return <p key={i} className='transition-all'>
              {e}
            </p>
          })
        }
      </div>

      <ThemeButton className='w-fit mx-auto' onPress={handleContinue}>Continue</ThemeButton>

    </section>
  )
}

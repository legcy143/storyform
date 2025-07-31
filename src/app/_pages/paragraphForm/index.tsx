"use client"
import usePagging from '@/app/_store/usePagging'
import { useStoryForm } from '@/app/_store/useStoryForm'
import ThemeButton from '@/components/ui/ThemeButton'
import { Divider, input } from '@heroui/react'
import React, { useState } from 'react'

export default function ParagraphForm() {
  const setCurrentPage = usePagging(s => s.setCurrentPage)
  // const [word, setWord] = useState("At %l=conference,v=% , %l=Alex,v=% , a %l=Role,v=% at %l=company,v=% , unveiled their latest concept: %l=invention,v=% .")

  const word = useStoryForm(s => s.word)
  const setWord = useStoryForm(s => s.setWord)
  const parseWord = useStoryForm(s => s.parseWord)

  const handleOnChange = (key: string, value: string) => {
    value = value.replaceAll(" ", "_space_")
    let newWord = word.replace(key, `${key},v=${value}`)
    setWord(newWord)
  }

  const formRef = React.useRef<HTMLFormElement>(null)
  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage("paragraphView")
  }


  return (
    <form ref={formRef} onSubmit={handleContinue} className='animate-appearance-in border border-gray-700/50 rounded-2xl p-5 bg-black/50 backdrop-blur-sm  flex flex-col gap-7'>
      <h1 className='text-center text-3xl md:text-4xl font-semibold' >The Big Reveal</h1>
      <Divider className='bg-gray-600/50 h-[1.5px] mb-5' />
      <div className='flex flex-row flex-wrap gap-2 capitalize font-semibold text-center transition-all text-xl'>
        {
          word?.split(" ")?.map((e, i) => {
            if (e.startsWith("%")) {
              const inputWord = e.replaceAll("%", "")?.split(",")
              const placeholder = inputWord?.[0].replace("l=", "") ?? "";
              const value = inputWord?.[1].replace("v=", "") ?? "";
              return <input
                key={i}
                placeholder={placeholder.replace("_", " ")}
                value={value.replaceAll("_space_", " ")}
                required
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
      <ThemeButton type='submit' className='w-fit mx-auto'>Continue</ThemeButton>
    </form>
  )
}

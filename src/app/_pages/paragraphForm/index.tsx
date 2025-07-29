import ThemeButton from '@/components/ui/ThemeButton'
import { Divider } from '@heroui/react'
import React from 'react'

export default function ParagraphForm() {
  const word = "At %confrence% , %Alex% , a %Role% at %company% , unveiled their latest concept: %invention% ."


  return (
    <section className='animate-appearance-in border border-gray-700/50 rounded-2xl p-5 bg-black/50 backdrop-blur-sm'>
      <h1 className='text-center text-2xl md:text-3xl font-semibold' >The Big Reveal</h1>
      <Divider />
      <div className='flex flex-row flex-wrap gap-2 capitalize font-semibold text-center transition-all'>
        {
          word?.split(" ")?.map((e, i) => {
            console.log("e => ", e)
            if (e.startsWith("%")) {
              return <input
                key={i}
                placeholder={e.replaceAll("%", "")}
                className='field-sizing-content min-w-[5rem] max-w-full outline-none border-b border-primary text-center text-primary placeholder:text-gray-400 px-1 transition-all'
              />
            }
            return <p key={i} className='transition-all'>
              {e}
            </p>
          })
        }
      </div>

      <ThemeButton>Continue</ThemeButton>

    </section>
  )
}

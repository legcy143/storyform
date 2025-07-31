import usePagging from '@/app/_store/usePagging';
import ThemeButton from '@/components/ui/ThemeButton';
import React from 'react'
import { LuCamera, LuCheck, LuCross } from 'react-icons/lu';
import { MdOutlineKeyboardArrowLeft, MdOutlineRefresh } from 'react-icons/md';
import NotSupportErrorMessage from './_components/NotSupportErrorMessage';
import { useStoryForm } from '@/app/_store/useStoryForm';

export default function Camera() {
  const setCurrentPage = usePagging(state => state.setCurrentPage);
  const resetWord = useStoryForm(s => s.resetWord);
  
  const GoPrevious = () => {
    resetWord()
    setCurrentPage("paragraphForm")
  }

  const handleContinue = () => {
    setCurrentPage("camera")
  }

  const handleRetry = () => {
    // hold up retry logic here
  }


  return (
    <section className='animate-appearance-in border border-gray-400/50 rounded-2xl p-5 bg-gray-500/50 backdrop-blur-sm  flex flex-col gap-7 m-auto'>

      <div>
        <NotSupportErrorMessage />
      </div>



      <div className='flex flex-row gap-5 items-center justify-center'>
        <ThemeButton isIconOnly>
          <MdOutlineRefresh />
        </ThemeButton>
        <ThemeButton isIconOnly>
          <LuCheck />
        </ThemeButton>
      </div>
      <div className='flex flex-row gap-5 items-center justify-center'>
        <ThemeButton isIconOnly>
          <LuCamera />
        </ThemeButton>
      </div>

      <div className='flex flex-row justify-between items-center'>
        <ThemeButton isIconOnly={true} onPress={GoPrevious}>
          <MdOutlineKeyboardArrowLeft className='size-7' />
        </ThemeButton>
        {/* <ThemeButton onPress={handleNext}>Next</ThemeButton> */}
      </div>
    </section>
  )
}

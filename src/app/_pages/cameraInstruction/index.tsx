import ThemeButton from '@/components/ui/ThemeButton'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import React from 'react'
import { LuCircleCheck, LuCircleX, LuInfo } from 'react-icons/lu';
import usePagging from '@/app/_store/usePagging';
import { useStoryForm } from '@/app/_store/useStoryForm';
import Img from '@/components/ui/Img';

export default function CameraInstruction() {
  const setCurrentPage = usePagging(state => state.setCurrentPage);
  const resetWord = useStoryForm(s => s.resetWord); 
  const GoPrevious = () => {
    resetWord()
    setCurrentPage("paragraphForm")
  }

  const handleNext = () => {
    setCurrentPage("disclaimer")
  }
  return (
    <section className='animate-appearance-in border border-gray-400/50 rounded-2xl p-5 bg-gray-500/50 backdrop-blur-sm  flex flex-col gap-7 w-fit m-auto'>
      <h1 className='text-center text-xl md:text-3xl font-bold'>Take a clear , well-lit photo of yourself</h1>
      <div className='flex flex-col md:flex-row gap-5 items-center justify-center'>
        <Img
          className='w-full max-w-[15rem] rounded-lg'
          src="https://gkh-images.s3.amazonaws.com/ca9c9462-c591-426e-86dd-578d4ca7cd62_alex-suprun-ZHvM3XIOHoE-unsplash.jpg" alt="" />
        <div className='text-lg md:text-xl font-normal flex flex-col gap-3 md:gap-5 justify-between '>
          <h1 className='flex items-center gap-2'> <LuCircleCheck className='text-green-500' /> Good Lighting and Quality </h1>
          <h1 className='flex items-center gap-2'> <LuCircleCheck className='text-green-500' /> Center your face in the frame </h1>
          <h1 className='flex items-center gap-2'> <LuCircleX className='text-red-500' /> No Accesosories or other people </h1>
          <h1 className='flex items-center gap-2'> <LuInfo className='text-yellow-500' /> Ai ins't perfect. not quite right ? <br />Give it another go  </h1>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <ThemeButton isIconOnly={true} onPress={GoPrevious}>
          <MdOutlineKeyboardArrowLeft className='size-7' />
        </ThemeButton>
        <ThemeButton onPress={handleNext}>Next</ThemeButton>
      </div>
    </section>
  )
}

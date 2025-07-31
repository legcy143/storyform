import usePagging from '@/app/_store/usePagging';
import { useStoryForm } from '@/app/_store/useStoryForm';
import ThemeButton from '@/components/ui/ThemeButton';
import { Input } from '@heroui/react';
import React from 'react'
import { BsStars } from 'react-icons/bs';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

export default function InformationForm() {
  const setCurrentPage = usePagging(state => state.setCurrentPage);
  const setEmail = useStoryForm(s => s.setEmail)
  const email = useStoryForm(s => s.payload.email)
  const createStoryForm = useStoryForm(s => s.createStoryForm)
  const isCreateLoading = useStoryForm(s => s.isCreateLoading)

  const GoPrevious = () => {
    setCurrentPage("camera")
  }

  const handleNext = async () => {
    let res = await createStoryForm();
    if (res)
      setCurrentPage("submitted")
  }
  return (
    <section className='animate-appearance-in border border-gray-400/50 rounded-2xl p-5 bg-gray-500/50 backdrop-blur-sm  flex flex-col gap-7 m-auto'>
      <h1 className='text-center text-2xl md:text-3xl font-bold'>Information</h1>
      <div className='flex flex-col gap-5 '>
        {/* <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-semibold'>Name</label>
          <input type="text" placeholder='john doe' className='border rounded-full p-3 px-4' />
        </div> */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-semibold'>Email</label>
          <input
            value={email.replace("_", " ")}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder='john.doe@example.com'
            className='border rounded-full p-3 px-4' />
        </div>
      </div>

      <div className='flex flex-row justify-between items-center'>
        <ThemeButton isIconOnly={true} onPress={GoPrevious} isDisabled={isCreateLoading}>
          <MdOutlineKeyboardArrowLeft className='size-7' />
        </ThemeButton>
        <ThemeButton
          isDisabled={!email.includes("@") || !email.includes(".")}
          isLoading={isCreateLoading}
          onPress={handleNext}> <BsStars /> submit</ThemeButton>
      </div>
    </section>
  )
}

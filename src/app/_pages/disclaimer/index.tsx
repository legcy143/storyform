"use client"
import usePagging from '@/app/_store/usePagging';
import { useStoryForm } from '@/app/_store/useStoryForm';
import ThemeButton from '@/components/ui/ThemeButton';
import { Checkbox } from '@heroui/react';
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

export default function Disclaimer() {
  const setCurrentPage = usePagging(state => state.setCurrentPage);
  const resetWord = useStoryForm(s => s.resetWord);
  const [isAgreed, setIsAgreed] = useState(false)
  const GoPrevious = () => {
    resetWord()
    setCurrentPage("paragraphForm")
  }

  const handleNext = () => {
    if (!isAgreed) {
      alert("Please agree to the terms and conditions before proceeding.")
      return;
    }
    setCurrentPage("camera")
  }
  return (
    <section className='animate-appearance-in border border-gray-400/50 rounded-2xl p-5 bg-gray-500/50 backdrop-blur-sm  flex flex-col gap-7 m-auto'>
      <h1 className='text-center text-2xl md:text-3xl font-bold'>Disclaimer</h1>
      <div className='flex flex-col gap-5 '>
        <p>
          By engaging with this photo experience, you acknowledge that the event organizer and software creators are not liable for any dissatisfaction or issues arising from your use of this service. By proceeding, you agree to the following:
        </p>
        <li>
          <b>Image Capture</b>: Your image will be captured for this experience.
        </li>
        <li>
          <b>AI Manipulation</b>: AI may alter your image, with possible inaccuracies.
        </li>
        <li>
          <b>Gallery Display</b>: Your image might be featured in a public event gallery or slideshow.
        </li>
        <li>
          <b>Marketing Use</b>: Your photo could be used for promotional purposes by the event organizers.
        </li>
        <li>
          <b>Liability</b>: By using this service, you waive any claims against the event organizer and software creators regarding your image and the service's performance.
        </li>
      </div>
      <div>
        <Checkbox checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)}>
          <span className='text-white font-bold capitalize'> I agree to the terms and conditions <b className='text-red-500'>*</b> </span>
        </Checkbox>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <ThemeButton isIconOnly={true} onPress={GoPrevious}>
          <MdOutlineKeyboardArrowLeft className='size-7' />
        </ThemeButton>
        <ThemeButton disabled={!isAgreed} onPress={handleNext}>Next</ThemeButton>
      </div>
    </section>
  )
}

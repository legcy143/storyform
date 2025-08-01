"use client"
import HorizontalGallerySliderAnimation from '@/components/animations/HorizontalImageSlider'
import React, { useEffect } from 'react'
import { useStoryForm } from '../_store/useStoryForm'
import { s } from 'framer-motion/client'
import { Spinner } from '@heroui/react'

export default function page() {
    const portraits = useStoryForm(s => s.portraits)
    const fetchPortraits = useStoryForm(s => s.fetchPortraits)
    const portraitFetchError = useStoryForm(s => s.portraitFetchError)

    useEffect(() => {
        if (!portraits) {
            fetchPortraits()
        }
    }, [portraits])

    if (!portraits) {
        return <>
            <Spinner />
        </>
    }

    if (portraitFetchError) {
        <>
            <p>Error fetching portraits</p>
        </>
    }


    return (
        <section className='w-full h-fit'>
            <HorizontalGallerySliderAnimation data={portraits} />
        </section>
    )
}

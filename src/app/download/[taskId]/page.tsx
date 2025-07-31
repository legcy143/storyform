"use client"
import { useStoryForm } from '@/app/_store/useStoryForm';
import Img from '@/components/ui/Img';
import { Button, Spinner } from '@heroui/react';
import { useParams } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { LuDownload } from 'react-icons/lu';

export default function page() {
    const taskId = useParams().taskId as string;
    const fetchPortrait = useStoryForm(s => s.fetchPortrait);
    const portrait = useStoryForm(s => s.portrait);
    const portraitFetchError = useStoryForm(s => s.portraitFetchError);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!portrait && !portraitFetchError) {
            fetchPortrait(taskId)
        }
    }, [])

 const handleDownload = async () => {
    setIsLoading(true);
    try {
        if (!portrait?.resultImage) {
            setIsLoading(false);
            return;
        }

        const response = await fetch(portrait.resultImage, { mode: 'cors' });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `portrait_${taskId}.png`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Download failed:', err);
    } finally {
        setIsLoading(false);
    }
};



    if (!portrait) {
        return (
            <div className='w-full flex'>
                <Spinner className='m-auto' />
            </div>
        )
    }

    if (portraitFetchError) {
        return (
            <section className='animate-appearance-in border border-gray-400/50 rounded-2xl p-5 bg-gray-500/50 backdrop-blur-sm  flex flex-col gap-7 m-auto'>
                {portraitFetchError}
            </section>
        )
    }

    return (
        <section className='animate-appearance-in border border-gray-400/50 rounded-2xl p-5 bg-gray-500/50 backdrop-blur-sm w-fit  flex flex-col gap-7 m-auto'>
            <Img src={portrait.resultImage} alt="result" className='max-h-[20rem] object-contain rounded-xl bg-red-500 w-fit' />
            <div className='flex items-center justify-center gap-1'>
                <Button onPress={handleDownload} isLoading={isLoading}><LuDownload /> Download</Button>
            </div>
        </section>
    )
}

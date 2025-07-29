import React from 'react'

export default function Provider({ children }: { children: React.ReactNode }) {

    return (
        <main className='flex flex-col items-center justify-between p-5 h-[100dvh] w-screen bg-black text-gray-200 relative overflow-hidden'>
            <div className='bg-primary absolute -top-[5rem] -left-[5rem] size-[23rem] blur-[15rem]' />
            <div className='bg-primary absolute -bottom-[5rem] -right-[5rem] size-[23rem] blur-[15rem]' />
            <h1 className='text-2xl font-bold'>Story Form</h1>
            <section className='w-full max-w-[40rem] mx-auto '>
                {children}
            </section>
            <footer className='mt-8 text-sm text-gray-500'>
                © {new Date().getFullYear()}Quenth All rights reserved.
            </footer>
        </main>
    )
}

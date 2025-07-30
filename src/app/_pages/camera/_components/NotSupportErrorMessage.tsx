import React from 'react'

export default function NotSupportErrorMessage() {
    return (
        <div className='text-center text-lg flex flex-col gap-3'>
            <p className='font-semibold text-2xl'>Your device is not supported for this feature.</p>
            <p>
                Sorry , looking like your device is not supported or may be your web camera not working . Please try again with a different device or check your browser settings and permissions.
            </p>
        </div>
    )
}

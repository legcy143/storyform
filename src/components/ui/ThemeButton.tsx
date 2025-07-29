import { Button, ButtonProps, cn } from '@heroui/react'
import React from 'react'

export default function ThemeButton({ children, className, ...props }: { children: React.ReactNode, className?: string } & ButtonProps) {
  return (
    <Button color='primary' {...props} className={cn("text-md md:text-lg p-7 md:p-9  py-5 md:py-6 rounded-full font-semibold",className)} >
      {children}
    </Button>
  )
}

import { Button, ButtonProps, cn } from '@heroui/react'
import React from 'react'

export default function ThemeButton({ children, className, ...props }: { children: React.ReactNode, className?: string } & ButtonProps) {
  return (
    <Button color='primary' {...props} className={cn( "text-xl  p-10 py-7 rounded-full font-semibold",className)} >
      {children}
    </Button>
  )
}

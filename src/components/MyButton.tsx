'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
    title : string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function MyButton({title, onClick}:Props)
{

    return(
        <Button 
            className="mt-4 bg-slate-300 hover:bg-slate-400 text-black mr-2" 
            onClick={onClick}>
                {title}
        </Button>
    )
}
        
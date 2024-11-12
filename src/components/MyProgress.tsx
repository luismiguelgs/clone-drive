'use client'
import { Progress } from "@/components/ui/progress"

export default function MyProgress(props:{progress:number}) 
{
    return (
        <Progress 
            value={props.progress} 
            className="w-full bg-slate-400 mt-5" 
        />
    )
}

'use client'
import { getFiles } from '@/services/files.service'
import { Folder } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ShowFiles(props:{parentId:string, userEmail:string}) 
{
    const [files, setFiles] = React.useState<any[]>([])
    
    
    React.useEffect(() => {
        getFiles(setFiles, props.parentId, props.userEmail)
    },[])

    const openFile = (fileLink:string) => {
        window.open(fileLink)
    }
    
    return (
        <div className="grid grid-cols-4 gap-2">
            {
                files.map((file, index) => (
                    <div className='flex flex-col items-center bg-slate-600 rounded-sm cursor-pointer p-2' key={index}>
                        {
                            file.isFolder ? (
                                <Link className="flex flex-col items-center justify-center h-full" href={`/dashboard/${file.id}`}>
                                    <Folder size={66} className="text-white" />
                                    <p className="text-white mt-2 text-center">{file.folderName}</p>
                                </Link>
                            ): (
                                <>
                                    <Image 
                                        src={file.imageLink} 
                                        alt={file.id} 
                                        width={180} 
                                        height={180} 
                                        className='object-contain p-2' 
                                        onClick={()=>openFile(file.imageLink)}
                                    />
                                    <p className='text-white mt-2'>{file.name}</p>
                                </>
                            )
                        }
                       
                    </div>
                ))
            }
        </div>
    )
}

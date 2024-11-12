'use client'
import React from 'react'
import MyButton from './MyButton'
import { Input } from './ui/input';
import fileUpload from '@/services/fileupload.service';
import MyProgress from './MyProgress';
import { addFolder } from '@/services/files.service';
import { useSession } from 'next-auth/react';

export default function UploadFiles(props:{parentId:string}) 
{
    const {data} = useSession()
    const [progress, setProgress] = React.useState(0)
    const [isFileVisible, setFileVisible] = React.useState(false)
    const [isFolderVisible, setFolderVisible] = React.useState(false)
    const [folderName, setFolderName] = React.useState('')

    const uploadFile = (e:React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files?.[0]
        fileUpload(files, setProgress, props.parentId, data?.user?.email as string)
        
    }
    const createFolder = () => {
        let payload = {
            folderName: folderName,
            isFolder : true,
            fileList: [],
            parentId: props.parentId || '',
            userEmail: data?.user?.email
        }
        console.log(payload);
        
        addFolder(payload)
    }

    return (
        <div>
            <MyButton title='Upload a File' onClick={()=> {
                setFileVisible(!isFileVisible)
                setFolderVisible(false)
            }}/>
            {
                isFileVisible && 
                <Input id="picture" type="file" onChange={(e) => uploadFile(e)} /> 
            }
            <MyProgress progress={progress}/>
            <MyButton title='Add Folder' onClick={()=> {
                setFolderVisible(!isFolderVisible)
                setFileVisible(false)
            }} />
            {
                isFolderVisible && 
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type='text' placeholder='Folder Name' className='mt-2 bg-slate-700 text-white' value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
                    <MyButton title='Create' onClick={createFolder} />
                </div>
            }
        </div>
    )
}

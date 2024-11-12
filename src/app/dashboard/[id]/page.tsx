import ShowFiles from '@/components/ShowFiles';
import UploadFiles from '@/components/UploadFiles';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'

export default async function FolderPage(params: { params: { id: string } }) 
{
    const {id} = params.params;
    const session = await getServerSession()

    return (
        <section className="h-[calc(100vh-7rem)] flex justify-center items-center p-2">
            <div className="flex w-full max-w-6xl space-x-8">
                <div className="w-1/4">
                    <h5 className="text-white text-2xl">Folder {id}</h5>
                    <UploadFiles parentId={id} />
                    <Link href='/dashboard' className="text-white text-2xl">Back</Link>
                </div>
                <div className='w-3/4'>
                {
                    session?.user?.email && (<ShowFiles parentId={id} userEmail={session.user.email}/>)
                }
                </div>
            </div>
        </section>
    )
}

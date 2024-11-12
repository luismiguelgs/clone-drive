'use client'
import ButtonSignOut from '@/components/ButtonSignOut'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function ProfilePage() 
{
    const {data, status, update} = useSession()

    if (status === 'loading') return <div>Loading...</div>

    return (
        <div>
            <h1 className="text-white text-5xl">Profile</h1>
            <h2>Bienvenido, {data?.user?.name}</h2>
            <Image src={data?.user?.image as string} alt={data?.user?.name as string} width={200} height={200} className='rounded-full'/>
            <ButtonSignOut />
        </div>
    )
}

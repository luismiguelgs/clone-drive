import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Navbar() 
{
    const session = await getServerSession(authOptions)
    return (
        <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      		<h1 className="text-xl font-bold">NextAuth</h1>

			<ul className="flex gap-x-2">
				{!session?.user ? (
				<>
					<li>
					<Link href="/">Home</Link>
					</li>
					<li>
					<Link href="/auth/login">Login</Link>
					</li>
					<li>
					<Link href="/auth/register">Register</Link>
					</li>
				</>
				) : (
				<>
					<li>
					<Link href="/dashboard">Dashboard</Link>
					</li>
					<li>
					<Link href="/api/auth/signout">Logout</Link>
					</li>
					<li>
						<Image src={session.user?.image as string} alt="Avatar del usuario" className="w-10 h-10 rounded-full mr-1" width={80} height={80}/>
					</li>
				</>
				)}
			</ul>
	 
    </nav>
    )
}

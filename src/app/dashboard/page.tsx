import ButtonSignOut from '@/components/ButtonSignOut'
import ShowFiles from '@/components/ShowFiles'
import UploadFiles from '@/components/UploadFiles'
import { getServerSession } from 'next-auth'

export default async function DashboardPage() 
{
    const session = await getServerSession()
    
    return (
        <section className="h-[calc(100vh-7rem)] flex justify-center items-center p-2">
            <div className="flex w-full max-w-6xl space-x-8">
                <div className="w-1/4">
                    <h1 className="text-white text-5xl">Dashboard</h1>
                    <h2 className="text-white text-2xl">Bienvenido, {session?.user?.name}</h2>
                    <UploadFiles parentId='' />
                    <ButtonSignOut />
                </div>
                <div className='w-3/4'>
                {
                    session?.user?.email && (<ShowFiles parentId='' userEmail={session?.user?.email as string}/>)
                }
                </div>
            </div>
        </section>
    )
}

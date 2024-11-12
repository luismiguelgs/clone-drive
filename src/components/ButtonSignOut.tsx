'use client'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'



export default function ButtonSignOut() {
  return (
    <div>
        <Button 
            className="mt-4 bg-slate-300 hover:bg-slate-400 text-black" 
            onClick={()=>signOut()}>
                Logout<LogOut />
        </Button>
    </div>
  )
}

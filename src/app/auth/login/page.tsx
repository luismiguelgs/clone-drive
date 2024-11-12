'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() 
{
    const router = useRouter()
    const [error, setError] = React.useState<string|null>(null)
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = handleSubmit(async(data) => {
        const res = await signIn('credentials', {
            email: data.email, 
            password: data.password,
            redirect: false 
        });
        console.log(res);
        if(res?.error) {
            setError(res.error)
        }else{
            router.push('/dashboard')
            router.refresh()
        }
    })

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center flex-col">
            <form action={''} className="w-1/4" onSubmit={onSubmit}>
                {
                    error && (
                        <p className='bg-red-500 text-white text-lg p-2'>{error}</p>
                    )
                }
                <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
                <Label htmlFor="email" className='text-slate-500 mb-2 block text-sm'>Email</Label>
                <Input type="email" id='email' {...register('email', {required: true, })} className='bg-slate-900 text-slate-300 w-full mb-2'/>
                {errors.email && <span className='text-red-500'>Email is required</span>}
                <Label htmlFor="password" className='text-slate-500 mb-2 block text-sm'>Password</Label>
                <Input type="password" id='password' {...register('password', {required: true, })} className='bg-slate-900 text-slate-300 w-full mb-2'/>
                {errors.password && <span className='text-red-500'>Password is required</span>}
                <Button variant={"outline"}  type="submit" className='bg-slate-900 text-slate-300 w-full mt-4'>Login</Button>
                
            </form>
                <Button 
                    variant={"outline"}  
                    onClick={async() => {
                            const result = await signIn('github',{
                                callbackUrl: '/dashboard',
                                redirect: false
                            })
                            console.log(result);
                        }
                    }
                    className='bg-slate-900 text-slate-300 mt-4'>
                    GitHub
                </Button>
        </div>
    )
}

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import { Link } from 'react-router-dom'
import {
    Code,
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
} from "lucide-react"
import { z } from "zod";

const SingupSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be atleast of characters"),
    name: z.string().min(3, "Name must be atleast 3 characters")

})




const SingUpPage = () => {

    const [showPassword, setPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { error },
    } = useForm({
        resolver: zodResolver(SingupSchema)
    })

    const onSubmit = async (data) => {
        console.log(data);

    }

    return (
        <div className='h-screen grid lg:grid-cols-2'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    {/* {logo} */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <Code className='w-6 h-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
                            <p className='text-base-content/60'>Sing in to your account</p>
                        </div>
                    </div>

                    {/* {form} */}

                    <form onSubmit={handleSubmit(onsubmit)} className='space-y-6'>

                        {/* {name} */}
                        <div className='form-control'>

                        </div>
                    </form>



                </div>

            </div>
        </div>
    )
}

export default SingUpPage
'use client'
import React, { useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import { ButtonAntd, FormAntd, MessageAntd } from '../Antd'
import LoginFormFields from '../FormFields/LoginFormFields'
import Spinner from '../UIComponents/Spinner'
import { AiOutlineUser } from 'react-icons/ai'
import { MessageService } from '@/util/MessageService'
import { Login } from '@/service/Auth'
import { useRouter } from 'next/navigation'
import { authCtx } from '@/context/AuthCtx'

type Props = {}

export default function LoginFormController({ }: Props) {
    const[loading,setLoaing]=useState<boolean>(false);
    const {LoginFn} = authCtx()


    const submit = (values:any)=>{
        LoginFn(values)
    }


    return (
        <div className='absolute top-[50%] bg-white left-[50%] translate-x-[-50%] translate-y-[-50%] w-full md:w-2/5 p-10 rounded-lg min-h-[200px] shadow-lg flex justify-center flex-col items-center'>

            <FormAntd className='w-2/3 flex flex-col items-center' onFinish={submit}>

                <AiOutlineUser className='text-4xl text-center text-slate-600' />
                <p className='text-center text-slate-600 text-2xl my-4'>Login to Your Account</p>

                <LoginFormFields />
                <ButtonAntd type='primary' htmlType='submit' className='m-auto bg-blue-600 flex justify-center gap-2 items-center my-4'>
                    <Spinner loading={loading} />
                    <AiOutlineLogin />
                    <span>Login</span>
                </ButtonAntd>
            </FormAntd>
        </div>

    )
}
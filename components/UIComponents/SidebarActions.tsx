'use client'
import { authCtx } from '@/context/AuthCtx'
import Link from 'next/link'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { BsPlusLg } from 'react-icons/bs'
import { ButtonAntd, PopconfirmAntd } from '../Antd'

type Props = {}

export default function SidebarActions({ }: Props) {
    const {LogoutFn} = authCtx();
    return (
        <>
            <Link href='/application/add' prefetch={false}>
                <ButtonAntd type='primary' className='w-full flex items-center gap-1 bg-sky-500'> <BsPlusLg /> Add new application</ButtonAntd>
            </Link>
            <div>
            <PopconfirmAntd placement="top" title='Do you want to Logout?' onConfirm={LogoutFn} okButtonProps={{ className: ' bg-black' }} okText='Logout'>
                <ButtonAntd type='primary' className='w-full flex items-center gap-1 bg-rose-500' > <AiOutlineLogout /> Logout</ButtonAntd>
            </PopconfirmAntd>
            </div>
        </>
    )
}
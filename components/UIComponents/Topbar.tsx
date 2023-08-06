import { authCtx } from '@/context/AuthCtx'
import { USER_TYPE } from '@/types/type.user'
import Link from 'next/link'
import React from 'react'
import { AiFillHome, AiOutlineLogout, AiOutlineMenuUnfold } from 'react-icons/ai'
import { LuDatabaseBackup } from 'react-icons/lu'
import { PopconfirmAntd } from '../Antd'

export default function Topbar({ open, setOpen, user }: { open?: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, user: USER_TYPE }) {
  const { LogoutFn } = authCtx()
  return (
    <div className={`w-fill h-14 bg-white shadow-md  border flex items-center px-4 justify-between`}>

      <div className='flex items-center gap-10'>
        <AiOutlineMenuUnfold className={`text-2xl cursor-pointer ${open && 'rotate-180'}`} onClick={() => setOpen(!open)} />

        <Link href='/' prefetch={false} className='text-xl flex items-center gap-1 cursor-pointer'>
          <AiFillHome />
        </Link>
      </div>

      <div className='flex items-center gap-4'>
        <Link href='/backup' prefetch={false} className='text-xl flex items-center gap-1 cursor-pointer'>
          <LuDatabaseBackup /> Backup
        </Link>

        <PopconfirmAntd placement="top" title='Do you want to Logout?' onConfirm={LogoutFn} okButtonProps={{ className: ' bg-black' }} okText='Logout'>
          <div className='flex items-center gap-1 cursor-pointer'>
            <AiOutlineLogout className='text-xl' /> <span>{user?.name}</span>
          </div>
        </PopconfirmAntd>
      </div>



    </div>
  )
}
